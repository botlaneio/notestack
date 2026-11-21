'use client';

import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {lazy, Suspense, useCallback, useEffect, useRef, useState} from 'react';
import {Mic, MicOff, PhoneOff} from 'lucide-react';
import {chapterPath, useSession} from '@/lib/auth-client';
import {StacksyFace, type StacksyMood} from './stacksy-face';
import styles from './stacksy.module.css';

/** The voice SDK is large, so it only loads the first time a student taps Stacksy. */
const StacksyCall = lazy(() => import('./stacksy-call'));

export type CallPhase = 'idle' | 'starting' | 'listening' | 'speaking';
export interface Notice {text: string; signIn?: boolean}

const NUDGE_KEY = 'notestack:stacksy:nudged';
/** Pages where the floating button would get in the way (a call already running stays visible). */
const HIDDEN_ON = ['/admin', '/checkout'];

const MOODS: Record<CallPhase, StacksyMood> = {idle: 'hello', starting: 'thinking', listening: 'hello', speaking: 'happy'};

/**
 * Stacksy, the voice study buddy: one floating button. Tap it and talk; tap it again to hang up.
 * It lives in the root layout, so the call keeps going while Stacksy (or the student) moves between pages.
 */
export function Stacksy() {
  const pathname = usePathname() ?? '/';
  const session = useSession();
  const [loaded, setLoaded] = useState(false);
  const [wanted, setWanted] = useState(false);
  const [phase, setPhase] = useState<CallPhase>('idle');
  const [muted, setMuted] = useState(false);
  const [notice, setNotice] = useState<Notice | null>(null);
  const [nudge, setNudge] = useState(false);
  const [greeted, setGreeted] = useState(false);
  const levelRef = useRef<HTMLDivElement>(null);

  const inCall = phase !== 'idle' || wanted;
  const hidden = HIDDEN_ON.some(p => pathname.startsWith(p)) && !inCall;
  const onLesson = Boolean(chapterPath(pathname));

  // Wave hello for the first few seconds of each visit.
  useEffect(() => {
    const t = window.setTimeout(() => setGreeted(true), 5200);
    return () => window.clearTimeout(t);
  }, []);

  // "Stuck? Talk to me" once per visit, after some time on a lesson page.
  useEffect(() => {
    setNudge(false);
    if (!onLesson || inCall) return;
    try {if (sessionStorage.getItem(NUDGE_KEY)) return;} catch {return;}
    const t = window.setTimeout(() => {
      setNudge(true);
      try {sessionStorage.setItem(NUDGE_KEY, '1');} catch {/* private mode */}
    }, 45_000);
    return () => window.clearTimeout(t);
  }, [onLesson, inCall, pathname]);

  // A notice (limit reached, microphone blocked) fades after a while.
  useEffect(() => {
    if (!notice) return;
    const t = window.setTimeout(() => setNotice(null), 12_000);
    return () => window.clearTimeout(t);
  }, [notice]);

  const toggleCall = useCallback(() => {
    setNudge(false);
    setNotice(null);
    if (inCall) {setWanted(false); return;}
    setMuted(false);
    setLoaded(true);
    setWanted(true);
    setPhase('starting');
  }, [inCall]);

  const onPhase = useCallback((next: CallPhase) => {
    setPhase(next);
    if (next === 'idle') setWanted(false);
  }, []);

  if (hidden) return null;

  const status = phase === 'starting' ? 'Calling Stacksy…'
    : phase === 'speaking' ? 'Stacksy is talking'
    : phase === 'listening' ? (muted ? "You're muted" : 'Listening… just talk')
    : null;
  const label = inCall ? 'Hang up on Stacksy' : 'Talk to Stacksy, your study buddy';

  return <div className={styles.root} data-phase={phase} data-muted={muted || undefined}>
    {loaded && <Suspense fallback={null}>
      <StacksyCall wanted={wanted} muted={muted} session={session} pathname={pathname} levelRef={levelRef} onPhase={onPhase} onNotice={setNotice}/>
    </Suspense>}

    <div className={styles.dock}>
      {notice && <div className={styles.bubble} role="status">
        <span>{notice.text}</span>
        {notice.signIn && <Link href={`/sign-in/?next=${encodeURIComponent(pathname)}`} className={styles.bubbleLink} onClick={() => setNotice(null)}>Sign in</Link>}
      </div>}
      {!notice && status && <div className={styles.bubble} role="status" aria-live="polite">
        <span className={styles.statusDot} aria-hidden="true"/>
        <span>{status}</span>
        {phase !== 'starting' && <small className={styles.hint}>Tap me to hang up</small>}
      </div>}
      {!notice && !status && nudge && <button type="button" className={styles.bubble} onClick={toggleCall}>Stuck? Talk to me</button>}

      {phase !== 'idle' && phase !== 'starting' && <button type="button" className={styles.muteButton} onClick={() => setMuted(m => !m)}
        aria-pressed={muted} aria-label={muted ? 'Unmute your microphone' : 'Mute your microphone'} title={muted ? 'Unmute' : 'Mute'}>
        {muted ? <MicOff size={18} aria-hidden="true"/> : <Mic size={18} aria-hidden="true"/>}
      </button>}

      <div className={styles.launcherWrap}>
        <div ref={levelRef} className={styles.halo} aria-hidden="true"/>
        <button type="button" className={styles.launcher} onClick={toggleCall} aria-label={label} title={label}>
          <span className={phase === 'speaking' ? styles.bob : !greeted && !inCall ? styles.hop : undefined}>
            <StacksyFace mood={muted && inCall ? 'resting' : MOODS[phase]} wave={!greeted && !inCall}/>
          </span>
          <span className={inCall ? styles.micBadgeLive : styles.micBadge} aria-hidden="true">
            {inCall ? <PhoneOff size={14} strokeWidth={2.4}/> : <Mic size={15} strokeWidth={2.4}/>}
          </span>
        </button>
      </div>
    </div>
  </div>;
}
