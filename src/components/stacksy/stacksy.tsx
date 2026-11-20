'use client';

import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {Fragment, useCallback, useEffect, useRef, useState, type FormEvent, type KeyboardEvent, type ReactNode} from 'react';
import {useSession} from '@/lib/auth-client';
import {StacksyFace, StacksyMini, type StacksyMood} from './stacksy-face';
import styles from './stacksy.module.css';

interface Turn {role: 'user' | 'stacksy'; text: string; error?: boolean; signIn?: boolean}

const STORE_KEY = 'notestack:stacksy:v1';
const NUDGE_KEY = 'notestack:stacksy:nudged';
/** Pages where the floating button would get in the way. */
const HIDDEN_ON = ['/admin', '/checkout'];

function readStore(): Turn[] {
  try {
    const value = JSON.parse(sessionStorage.getItem(STORE_KEY) ?? '[]');
    return Array.isArray(value) ? value.filter(t => t && (t.role === 'user' || t.role === 'stacksy') && typeof t.text === 'string').slice(-30) : [];
  } catch {return [];}
}
function writeStore(turns: Turn[]) {
  try {sessionStorage.setItem(STORE_KEY, JSON.stringify(turns.filter(t => !t.error).slice(-30)));} catch {/* private mode */}
}

/** "Polynomials — guided chapter | NoteStack" → "Polynomials". */
function pageTitle(): string {
  const title = document.title.split(' | ')[0].split(' — ')[0].trim();
  return title && title !== 'NoteStack' ? title : 'Home';
}

/** **bold** inside a line. Everything else stays plain text (no HTML is ever injected). */
function inline(text: string): ReactNode[] {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
    part.startsWith('**') && part.endsWith('**') && part.length > 4 ? <strong key={i}>{part.slice(2, -2)}</strong> : <Fragment key={i}>{part}</Fragment>);
}

/** Turns Stacksy's light formatting (paragraphs, "- " bullets, "1. " steps) into elements. */
function Formatted({text}: {text: string}) {
  const blocks: ReactNode[] = [];
  let list: {ordered: boolean; items: string[]} | null = null;
  const flush = () => {
    if (!list) return;
    const items = list.items.map((item, i) => <li key={i}>{inline(item)}</li>);
    blocks.push(list.ordered ? <ol key={blocks.length}>{items}</ol> : <ul key={blocks.length}>{items}</ul>);
    list = null;
  };
  for (const raw of text.replace(/\r/g, '').split('\n')) {
    const line = raw.trim();
    const bullet = line.match(/^[-*•]\s+(.*)$/);
    const step = line.match(/^\d+[.)]\s+(.*)$/);
    if (bullet || step) {
      const ordered = Boolean(step);
      if (!list || list.ordered !== ordered) {flush(); list = {ordered, items: []};}
      list.items.push((bullet ?? step)![1]);
      continue;
    }
    flush();
    if (line) blocks.push(<p key={blocks.length}>{inline(line.replace(/^#+\s*/, ''))}</p>);
  }
  flush();
  return <>{blocks}</>;
}

function suggestionsFor(pathname: string, chapter: string | null): string[] {
  if (chapter) return ['Explain this chapter simply', 'Quiz me on this chapter', 'What should I revise first here?'];
  if (pathname.startsWith('/flashcards')) return ['How should I use flashcards?', 'Quiz me on Science'];
  return ['Help me plan my revision', 'Explain a Maths topic', 'Quiz me on Science'];
}

export function Stacksy() {
  const pathname = usePathname() ?? '/';
  const session = useSession();
  const [open, setOpen] = useState(false);
  const [turns, setTurns] = useState<Turn[]>([]);
  const [draft, setDraft] = useState('');
  const [busy, setBusy] = useState(false);
  const [unread, setUnread] = useState(0);
  const [nudge, setNudge] = useState(false);
  const [title, setTitle] = useState('Home');
  const [celebrate, setCelebrate] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const openRef = useRef(open);
  openRef.current = open;

  const onLesson = /^\/learn\/[^/]+\/[^/]+/.test(pathname);
  const chapter = onLesson ? title : null;
  const hidden = HIDDEN_ON.some(p => pathname.startsWith(p));

  useEffect(() => {setTurns(readStore());}, []);
  useEffect(() => {writeStore(turns);}, [turns]);
  // The page title settles a moment after navigation.
  useEffect(() => {
    const timer = window.setTimeout(() => setTitle(pageTitle()), 400);
    return () => window.clearTimeout(timer);
  }, [pathname]);

  // A gentle nudge, at most once per visit, after a while on a lesson page.
  useEffect(() => {
    if (!onLesson || open) return;
    let seen = false;
    try {seen = sessionStorage.getItem(NUDGE_KEY) === '1';} catch {/* ignore */}
    if (seen) return;
    const show = window.setTimeout(() => {
      setNudge(true);
      try {sessionStorage.setItem(NUDGE_KEY, '1');} catch {/* ignore */}
    }, 45_000);
    return () => window.clearTimeout(show);
  }, [onLesson, open, pathname]);
  useEffect(() => {
    if (!nudge) return;
    const hide = window.setTimeout(() => setNudge(false), 9000);
    return () => window.clearTimeout(hide);
  }, [nudge]);

  useEffect(() => {
    if (!open) return;
    setUnread(0);
    setNudge(false);
    window.setTimeout(() => inputRef.current?.focus(), 50);
    const onKey = (e: globalThis.KeyboardEvent) => {if (e.key === 'Escape') setOpen(false);};
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  useEffect(() => {
    listRef.current?.scrollTo({top: listRef.current.scrollHeight, behavior: 'smooth'});
  }, [turns, busy, open]);

  const send = useCallback(async (text: string) => {
    const question = text.trim().slice(0, 1500);
    if (!question || busy) return;
    const history: Turn[] = [...turns.filter(t => !t.error), {role: 'user', text: question}];
    setTurns(history);
    setDraft('');
    setBusy(true);
    let reply: Turn;
    try {
      const res = await fetch('/api/stacksy/chat', {
        method: 'POST', credentials: 'same-origin', headers: {'content-type': 'application/json'},
        body: JSON.stringify({messages: history.slice(-12).map(({role, text}) => ({role, text})), page: {path: pathname, title: pageTitle()}}),
      });
      const data = await res.json().catch(() => null) as {reply?: string; message?: string; code?: string} | null;
      if (res.ok && data?.reply) reply = {role: 'stacksy', text: data.reply};
      else if (!data) reply = {role: 'stacksy', text: 'Stacksy only answers on the live site (or the Worker preview). In plain `npm run dev` the chat has nowhere to send questions.', error: true};
      else reply = {role: 'stacksy', text: data.message ?? 'Something went wrong. Please try again.', error: true, signIn: data.code === 'guest_limit'};
    } catch {
      reply = {role: 'stacksy', text: 'I could not reach NoteStack. Check your connection and try again.', error: true};
    }
    setTurns(current => [...current, reply]);
    setBusy(false);
    if (!reply.error && /\b(correct|well done|great job|exactly right|you got it|perfect)\b/i.test(reply.text)) {
      setCelebrate(true);
      window.setTimeout(() => setCelebrate(false), 2500);
    }
    if (!openRef.current) setUnread(n => n + 1);
  }, [busy, pathname, turns]);

  const submit = (e: FormEvent) => {e.preventDefault(); void send(draft);};
  const onKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {e.preventDefault(); void send(draft);}
  };
  const clear = () => {setTurns([]); inputRef.current?.focus();};

  if (hidden) return null;

  const firstName = session.status === 'signed-in' ? session.user.name.split(' ')[0] : null;
  const greeting = chapter
    ? `Hi${firstName ? ` ${firstName}` : ''}! I see you're on **${chapter}**. Want me to explain something from it, or shall I quiz you?`
    : `Hi${firstName ? ` ${firstName}` : ''}! I'm Stacksy, your SSLC study buddy. Ask me anything from Maths, Science or Social Science.`;
  const mood: StacksyMood = busy ? 'thinking' : celebrate || unread ? 'happy' : 'hello';

  return <div className={styles.root}>
    {open && <section className={styles.panel} role="dialog" aria-modal="false" aria-label="Chat with Stacksy">
      <header className={styles.header}>
        <span className={styles.headerFace}><StacksyMini size={34} onNavy/></span>
        <div className={styles.headerText}>
          <strong>Stacksy</strong>
          <span>{chapter ? `Helping with ${chapter}` : 'Your SSLC study buddy'}</span>
        </div>
        {turns.length > 0 && <button type="button" className={styles.headerButton} onClick={clear} aria-label="Start a new chat" title="New chat">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3 12a9 9 0 1 0 3-6.7"/><path d="M3 4v5h5"/></svg>
        </button>}
        <button type="button" className={styles.headerButton} onClick={() => setOpen(false)} aria-label="Close chat">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>
        </button>
      </header>

      <div className={styles.messages} ref={listRef} aria-live="polite">
        <div className={styles.row}>
          <span className={styles.avatar}><StacksyMini/></span>
          <div className={styles.bot}><Formatted text={greeting}/></div>
        </div>
        {turns.map((turn, i) => turn.role === 'user'
          ? <div key={i} className={styles.user}>{turn.text}</div>
          : <div key={i} className={styles.row}>
              <span className={styles.avatar}><StacksyMini/></span>
              <div className={`${styles.bot} ${turn.error ? styles.botError : ''}`}>
                <Formatted text={turn.text}/>
                {turn.signIn && <p><Link href={`/sign-in/?next=${encodeURIComponent(pathname)}`}>Sign in or create a free account</Link></p>}
              </div>
            </div>)}
        {busy && <div className={styles.row}>
          <span className={styles.avatar}><StacksyFace mood="thinking" size={28}/></span>
          <div className={`${styles.bot} ${styles.typing}`}>Stacksy is thinking…</div>
        </div>}
        {!busy && (turns.length === 0 || turns[turns.length - 1].role === 'stacksy') && <div className={styles.chips}>
          {(turns.length === 0 ? suggestionsFor(pathname, chapter) : ['Explain it more simply', 'Give me a practice question']).map(s =>
            <button key={s} type="button" className={styles.chip} onClick={() => void send(s)}>{s}</button>)}
        </div>}
      </div>

      <form className={styles.composer} onSubmit={submit}>
        <label htmlFor="stacksy-input" className={styles.srOnly}>Message Stacksy</label>
        <textarea id="stacksy-input" ref={inputRef} rows={1} value={draft} maxLength={1500}
          placeholder={chapter ? 'Ask about this chapter…' : 'Ask about any chapter…'}
          onChange={e => setDraft(e.target.value)} onKeyDown={onKeyDown}/>
        <button type="submit" className={styles.send} disabled={busy || !draft.trim()} aria-label="Send">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
        </button>
      </form>
      <p className={styles.footnote}>Stacksy is an AI and can make mistakes. Check important answers with your textbook.</p>
    </section>}

    <div className={`${styles.launcherWrap} ${open ? styles.launcherOpen : ''}`}>
      {nudge && !open && <button type="button" className={styles.nudge} onClick={() => setOpen(true)}>Stuck? Ask me</button>}
      <button type="button" className={`${styles.launcher} ${nudge ? styles.hop : ''}`} onClick={() => setOpen(o => !o)}
        aria-expanded={open} aria-label={open ? 'Close Stacksy chat' : unread ? `Open Stacksy chat, ${unread} new ${unread === 1 ? 'reply' : 'replies'}` : 'Open Stacksy chat'}>
        <StacksyFace mood={mood} wave={nudge && !open}/>
        {unread > 0 && !open && <span className={styles.badge} aria-hidden="true">{unread}</span>}
        {open && <span className={styles.closeBadge} aria-hidden="true">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>
        </span>}
      </button>
    </div>
  </div>;
}
