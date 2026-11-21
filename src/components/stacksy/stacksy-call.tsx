'use client';

// The live voice call with Stacksy (ElevenLabs agent over WebRTC). Loaded only after the first tap.
// It has no UI of its own: it reports the call phase to the floating button in stacksy.tsx.
import {useRouter} from 'next/navigation';
import {useEffect, useRef, type RefObject} from 'react';
import {ConversationProvider, useConversation} from '@elevenlabs/react';
import type {SessionState} from '@/lib/auth-client';
import {AREA_PRODUCT, cleanTitle, resolveNavigation} from '@/lib/stacksy-pages';
import type {BoardAction} from '@/lib/stacksy-board';
import type {CallPhase, Notice} from './stacksy';

interface Props {
  wanted: boolean;
  muted: boolean;
  session: SessionState;
  pathname: string;
  levelRef: RefObject<HTMLDivElement | null>;
  onPhase: (phase: CallPhase) => void;
  onNotice: (notice: Notice) => void;
  onBoard: (action: BoardAction) => void;
  /** Goes up by one each time the student closes the blackboard. */
  boardClosedBy: number;
}

const SUBJECT_NAMES: Record<string, string> = {mathematics: 'Maths', science: 'Science', 'social-science': 'Social Science'};

function owned(session: SessionState): string[] | null {
  if (session.status !== 'signed-in') return null;
  return session.admin ? Object.values(AREA_PRODUCT) : session.entitlements;
}

function unlockedText(list: string[] | null): string {
  const names = (list ?? []).flatMap(p => p === 'core-collection' ? Object.values(SUBJECT_NAMES) : SUBJECT_NAMES[p] ?? []);
  return names.length ? [...new Set(names)].join(', ') : 'only the free first chapter of each subject';
}

/** Asks the Worker for a one-call token. The ElevenLabs key never reaches the browser. */
async function requestToken(): Promise<{token: string} | {notice: Notice}> {
  try {
    const response = await fetch('/api/stacksy/voice', {method: 'POST', credentials: 'same-origin', headers: {'content-type': 'application/json'}, body: '{}'});
    const data = await response.json().catch(() => ({})) as {token?: string; code?: string; message?: string};
    if (response.ok && data.token) return {token: data.token};
    return {notice: {text: data.message ?? 'Stacksy is resting right now. Please try again a little later.', signIn: data.code === 'guest_limit'}};
  } catch {
    return {notice: {text: "Stacksy couldn't connect. Check your internet and tap again."}};
  }
}

/** Asks for the microphone first, so a blocked mic does not use up one of today's calls. */
async function microphoneReady(): Promise<Notice | null> {
  if (!navigator.mediaDevices?.getUserMedia) return {text: 'Talking to Stacksy needs a microphone and a secure (https) page.'};
  try {
    const stream = await navigator.mediaDevices.getUserMedia({audio: true});
    stream.getTracks().forEach(track => track.stop());
    return null;
  } catch {
    return {text: 'Stacksy needs your microphone. Allow it in your browser (the icon next to the address bar), then tap me again.'};
  }
}

function Call({wanted, muted, session, pathname, levelRef, onPhase, onNotice, onBoard, boardClosedBy}: Props) {
  const router = useRouter();
  // Fresh values for callbacks that the voice SDK keeps hold of.
  const live = useRef({session, pathname, router, onPhase, onNotice, onBoard});
  live.current = {session, pathname, router, onPhase, onNotice, onBoard};
  const startedRef = useRef(false);

  const conversation = useConversation({
    micMuted: muted,
    onDisconnect: () => {
      startedRef.current = false;
      live.current.onPhase('idle');
    },
    onError: (message: string) => {
      console.warn('stacksy_voice_error', message);
      live.current.onNotice({text: "Stacksy's line dropped. Tap me to call again."});
    },
  });
  const {status, isSpeaking} = conversation;
  const api = useRef(conversation);
  api.current = conversation;

  // Start or end the call when the student taps Stacksy.
  useEffect(() => {
    if (wanted && !startedRef.current) {
      startedRef.current = true;
      (async () => {
        const micProblem = await microphoneReady();
        if (micProblem) {startedRef.current = false; live.current.onNotice(micProblem); live.current.onPhase('idle'); return;}
        const result = await requestToken();
        if ('notice' in result) {startedRef.current = false; live.current.onNotice(result.notice); live.current.onPhase('idle'); return;}
        const {session: s, pathname: path} = live.current;
        api.current.startSession({
          conversationToken: result.token,
          connectionType: 'webrtc',
          dynamicVariables: {
            page_title: cleanTitle(document.title),
            page_path: path,
            signed_in: s.status === 'signed-in' ? 'yes' : 'no',
            unlocked: unlockedText(owned(s)),
          },
          clientTools: {
            navigate_to_page: async (parameters: {path?: unknown}) => {
              const target = resolveNavigation(parameters.path, owned(live.current.session));
              if (!target.ok) return target.message;
              if (target.path === live.current.pathname || target.path === `${live.current.pathname}/`) return 'The student is already on that page.';
              live.current.router.push(target.path);
              return `Opened ${target.path}. The call is still going; tell the student it is open.`;
            },
            // The blackboard: Stacksy writes one short line per step, just before he says it.
            blackboard_open: async (parameters: {title?: unknown}) => {
              live.current.onBoard({type: 'open', title: parameters.title});
              return 'The blackboard is open and clean. Write the first step with blackboard_write.';
            },
            blackboard_write: async (parameters: {text?: unknown; style?: unknown; diagram?: unknown; labels?: unknown}) => {
              live.current.onBoard({type: 'write', text: parameters.text, style: parameters.style, diagram: parameters.diagram, labels: parameters.labels});
              return 'Written on the board.';
            },
            blackboard_close: async () => {
              live.current.onBoard({type: 'close'});
              return 'The blackboard is closed.';
            },
          },
        });
      })();
    } else if (!wanted && startedRef.current) {
      startedRef.current = false;
      api.current.endSession();
      live.current.onPhase('idle');
    }
  }, [wanted]);

  // Tell the parent which state the call is in.
  useEffect(() => {
    if (status === 'connected') onPhase(isSpeaking ? 'speaking' : 'listening');
    else if (status === 'connecting') onPhase('starting');
    else if (status === 'error' && startedRef.current) {startedRef.current = false; onPhase('idle');}
  }, [status, isSpeaking, onPhase]);

  // Tell Stacksy when the page changes (by the student or by Stacksy), so help matches the screen.
  useEffect(() => {
    if (status !== 'connected') return;
    const t = window.setTimeout(() => {
      api.current.sendContextualUpdate(`The student is now on the page "${cleanTitle(document.title)}" (${pathname}).`);
    }, 600);
    return () => window.clearTimeout(t);
  }, [pathname, status]);

  // The student closed the blackboard themselves.
  useEffect(() => {
    if (boardClosedBy === 0 || api.current.status !== 'connected') return;
    api.current.sendContextualUpdate('The student closed the blackboard. Do not reopen it unless they ask for another explanation.');
  }, [boardClosedBy]);

  // The halo behind Stacksy follows whoever is talking.
  useEffect(() => {
    if (status !== 'connected') {levelRef.current?.style.setProperty('--level', '0'); return;}
    let frame = 0;
    const tick = () => {
      const c = api.current;
      const level = Math.min(1, (c.isSpeaking ? c.getOutputVolume() : c.getInputVolume()) * 1.6);
      levelRef.current?.style.setProperty('--level', level.toFixed(3));
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [status, levelRef]);

  // Hang up cleanly if the tab is closed.
  useEffect(() => () => {if (startedRef.current) api.current.endSession();}, []);

  return null;
}

export default function StacksyCall(props: Props) {
  return <ConversationProvider><Call {...props}/></ConversationProvider>;
}
