'use client';
// Flip-card study for one chapter. The cards arrive as props from the chapter's own (locked)
// page; this file must not import lesson data (see tests/flashcards.test.mjs).
import Link from 'next/link';
import {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {ArrowLeft, ArrowRight, Check, RotateCw, Shuffle, Undo2} from 'lucide-react';
import {Brand} from './brand';
import {ChapterStudyNavigation} from './chapter-one-navigation';
import {fetchFlashcards, saveFlashcards, useSession} from '@/lib/auth-client';
import type {Deck, Flashcard} from '@/lib/flashcards';
import styles from './flashcards.module.css';

type Rating = 'k' | 'l';
type Saved = {ratings: Record<string, Rating>; updatedAt: number};
type Mode = 'all' | 'learning' | 'new';

const storageKey = (path: string) => `ns-flashcards-v1:${path}`;
export const chapterOf = (deckPath: string) => deckPath.replace(/flashcards\/$/, '');

function readLocal(path: string, ids: Set<string>): Saved {
  try {
    const v = JSON.parse(localStorage.getItem(storageKey(path)) ?? 'null');
    if (!v || typeof v !== 'object' || typeof v.ratings !== 'object') return {ratings: {}, updatedAt: 0};
    const ratings: Record<string, Rating> = {};
    for (const [id, r] of Object.entries(v.ratings)) if (ids.has(id) && (r === 'k' || r === 'l')) ratings[id] = r;
    return {ratings, updatedAt: Number(v.updatedAt) || 0};
  } catch {
    return {ratings: {}, updatedAt: 0};
  }
}
function writeLocal(path: string, saved: Saved) {
  try {localStorage.setItem(storageKey(path), JSON.stringify(saved));} catch {/* private mode or full storage */}
}
const split = (ratings: Record<string, Rating>) => ({
  known: Object.keys(ratings).filter(id => ratings[id] === 'k'),
  learning: Object.keys(ratings).filter(id => ratings[id] === 'l'),
});

function shuffled<T>(list: T[]): T[] {
  const out = [...list];
  for (let i = out.length - 1; i > 0; i--) {const j = Math.floor(Math.random() * (i + 1)); [out[i], out[j]] = [out[j], out[i]];}
  return out;
}

function CardFace({card, side}: {card: Flashcard; side: 'front' | 'back'}) {
  if (side === 'front') return <>
    <span className={styles.topic}>{card.kind === 'key' ? 'Key idea' : card.topic}</span>
    {card.context && <p className={styles.context}>{card.context}</p>}
    <p className={card.kind === 'key' ? styles.term : styles.prompt}>{card.front}</p>
    {card.choices && <ul className={styles.choices}>{card.choices.map(c => <li key={c}>{c}</li>)}</ul>}
    <span className={styles.flipHint}><RotateCw size={14}/>{card.kind === 'key' ? 'Tap to see what it means' : 'Tap to see the answer'}</span>
  </>;
  return <>
    <span className={styles.topic}>{card.kind === 'key' ? card.front : 'Answer'}</span>
    <p className={card.kind === 'key' ? styles.meaning : styles.answer}>{card.back}</p>
    {card.detail && <p className={styles.detail}>{card.detail}</p>}
  </>;
}

export function FlashcardDeck({deck, subjectName}: {deck: Deck; subjectName: string}) {
  const chapterPath = chapterOf(deck.path);
  const ids = useMemo(() => new Set(deck.cards.map(c => c.id)), [deck.cards]);
  const byId = useMemo(() => new Map(deck.cards.map(c => [c.id, c])), [deck.cards]);
  const session = useSession();
  const signedIn = session.status === 'signed-in';

  const [ready, setReady] = useState(false);
  const [saved, setSaved] = useState<Saved>({ratings: {}, updatedAt: 0});
  const [mode, setMode] = useState<Mode>('all');
  const [mixed, setMixed] = useState(false);
  const [queue, setQueue] = useState<string[]>(() => deck.cards.map(c => c.id));
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [round, setRound] = useState({known: 0, learning: 0});
  const [sync, setSync] = useState<'local' | 'saving' | 'saved' | 'offline'>('local');
  const pending = useRef<number | undefined>(undefined);
  const cardRef = useRef<HTMLButtonElement>(null);

  // Browser copy first, so the deck opens instantly.
  useEffect(() => {setSaved(readLocal(chapterPath, ids)); setReady(true);}, [chapterPath, ids]);

  // Signed in: the newer of the account copy and this browser's copy wins.
  useEffect(() => {
    if (!signedIn || !ready) return;
    let stop = false;
    fetchFlashcards().then(decks => {
      if (stop || !decks) return;
      const remote = decks.find(d => d.path === chapterPath);
      const local = readLocal(chapterPath, ids);
      if (remote && remote.updatedAt >= local.updatedAt) {
        const ratings: Record<string, Rating> = {};
        for (const id of remote.learning) if (ids.has(id)) ratings[id] = 'l';
        for (const id of remote.known) if (ids.has(id)) ratings[id] = 'k';
        const next = {ratings, updatedAt: remote.updatedAt};
        writeLocal(chapterPath, next);
        setSaved(next);
        setSync('saved');
      } else if (local.updatedAt > 0) {
        const {known, learning} = split(local.ratings);
        void saveFlashcards(chapterPath, known, learning).then(ok => !stop && setSync(ok ? 'saved' : 'offline'));
      } else setSync('saved');
    });
    return () => {stop = true;};
  }, [signedIn, ready, chapterPath, ids]);

  const persist = useCallback((next: Saved) => {
    writeLocal(chapterPath, next);
    if (!signedIn) return;
    setSync('saving');
    window.clearTimeout(pending.current);
    pending.current = window.setTimeout(() => {
      const {known, learning} = split(next.ratings);
      void saveFlashcards(chapterPath, known, learning).then(ok => setSync(ok ? 'saved' : 'offline'));
    }, 1200);
  }, [chapterPath, signedIn]);

  const counts = useMemo(() => {
    const known = deck.cards.filter(c => saved.ratings[c.id] === 'k').length;
    const learning = deck.cards.filter(c => saved.ratings[c.id] === 'l').length;
    return {known, learning, fresh: deck.cards.length - known - learning};
  }, [deck.cards, saved]);

  const start = useCallback((nextMode: Mode, mix = mixed) => {
    const pool = deck.cards.map(c => c.id).filter(id => nextMode === 'all' || (nextMode === 'learning' ? saved.ratings[id] === 'l' : !saved.ratings[id]));
    setMode(nextMode);
    setQueue(mix ? shuffled(pool) : pool);
    setIndex(0);
    setFlipped(false);
    setRound({known: 0, learning: 0});
  }, [deck.cards, mixed, saved.ratings]);

  const card = index < queue.length ? byId.get(queue[index]) : undefined;
  const finished = ready && index >= queue.length;

  const rate = useCallback((rating: Rating) => {
    if (!card || !flipped) return;
    const next = {ratings: {...saved.ratings, [card.id]: rating}, updatedAt: Date.now()};
    setSaved(next);
    persist(next);
    setRound(r => rating === 'k' ? {...r, known: r.known + 1} : {...r, learning: r.learning + 1});
    setFlipped(false);
    setIndex(i => i + 1);
  }, [card, flipped, persist, saved.ratings]);

  const back = () => {if (index > 0) {setIndex(index - 1); setFlipped(false);}};

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.altKey || e.ctrlKey || e.metaKey || (e.target as HTMLElement)?.closest('input, textarea, select')) return;
      if ((e.key === ' ' || e.key === 'Enter') && (e.target === document.body || e.target === cardRef.current)) {e.preventDefault(); setFlipped(f => !f);}
      else if (e.key === 'ArrowRight' || e.key === '2') rate('k');
      else if (e.key === 'ArrowLeft' || e.key === '1') rate('l');
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [rate]);

  useEffect(() => () => window.clearTimeout(pending.current), []);

  const label = deck.code ? `APPENDIX ${deck.code}` : `CHAPTER ${String(deck.number).padStart(2, '0')}`;
  const knownShare = deck.cards.length ? Math.round(counts.known / deck.cards.length * 100) : 0;
  const modes: [Mode, string, number][] = [['all', 'All cards', deck.cards.length], ['learning', 'Still learning', counts.learning], ['new', 'Not seen yet', counts.fresh]];

  return <div className={styles.page}>
    <header className={styles.header}>
      <Link href="/" aria-label="NoteStack home"><Brand small/></Link>
      <Link href="/flashcards/">All flashcards <ArrowRight size={16}/></Link>
    </header>
    <main className={styles.deckMain}>
      <ChapterStudyNavigation active="flashcards" slug={deck.slug} title={deck.title} subject={deck.area}/>
      <span className={styles.kicker}>{label} · {subjectName.toUpperCase()}{deck.discipline ? ` · ${deck.discipline.toUpperCase()}` : ''} · FLASHCARDS</span>
      <h1 className={styles.deckTitle}>{deck.title}</h1>

      <div className={styles.meter} aria-label={`${counts.known} of ${deck.cards.length} cards known`}>
        <div className={styles.bar}><i style={{width: `${knownShare}%`}}/></div>
        <div className={styles.meterRow}>
          <span><b className={styles.dotKnown}/>{counts.known} known</span>
          <span><b className={styles.dotLearning}/>{counts.learning} still learning</span>
          <span><b className={styles.dotNew}/>{counts.fresh} not seen</span>
        </div>
      </div>

      <div className={styles.modes} role="group" aria-label="Which cards to study">
        {modes.map(([id, text, n]) => <button key={id} type="button" aria-pressed={mode === id} disabled={n === 0} onClick={() => start(id)}>{text} <span>{n}</span></button>)}
        <button type="button" className={styles.shuffle} aria-pressed={mixed} onClick={() => {setMixed(!mixed); start(mode, !mixed);}}><Shuffle size={15}/>Shuffle</button>
      </div>

      {!ready ? <p role="status" className={styles.note}>Opening your cards…</p> : finished ? <section className={styles.done} aria-live="polite">
        <span className={styles.topic}>Round complete</span>
        <h2>{queue.length === 0 ? 'No cards here right now.' : round.learning === 0 ? 'You knew every card in this round.' : `${round.known} known, ${round.learning} to go over again.`}</h2>
        <p>{counts.known} of {deck.cards.length} cards in this chapter are marked as known.</p>
        <div className={styles.doneActions}>
          {counts.learning > 0 && <button type="button" className={styles.primary} onClick={() => start('learning')}>Review still learning ({counts.learning})</button>}
          {counts.fresh > 0 && <button type="button" className={counts.learning > 0 ? styles.secondary : styles.primary} onClick={() => start('new')}>Cards not seen yet ({counts.fresh})</button>}
          <button type="button" className={styles.secondary} onClick={() => start('all')}><RotateCw size={16}/>Go through all {deck.cards.length}</button>
        </div>
      </section> : card && <>
        <div className={styles.position}><span>Card {index + 1} of {queue.length}</span>{saved.ratings[card.id] && <span className={saved.ratings[card.id] === 'k' ? styles.wasKnown : styles.wasLearning}>{saved.ratings[card.id] === 'k' ? 'Known last time' : 'Still learning'}</span>}</div>
        <button ref={cardRef} type="button" className={styles.flip} data-flipped={flipped} onClick={() => setFlipped(!flipped)} aria-label={flipped ? 'Show the question' : 'Show the answer'} key={card.id}>
          <span className={styles.inner}>
            <span className={`${styles.face} ${styles.front}`} aria-hidden={flipped}><CardFace card={card} side="front"/></span>
            <span className={`${styles.face} ${styles.back}`} aria-hidden={!flipped}><CardFace card={card} side="back"/></span>
          </span>
        </button>
        <div className={styles.rate}>
          <button type="button" className={styles.learning} disabled={!flipped} onClick={() => rate('l')}><Undo2 size={18}/>Still learning</button>
          <button type="button" className={styles.know} disabled={!flipped} onClick={() => rate('k')}><Check size={18}/>Know it</button>
        </div>
        <div className={styles.under}>
          <button type="button" className={styles.textButton} disabled={index === 0} onClick={back}><ArrowLeft size={15}/>Previous card</button>
          <span className={styles.keys}>Space to flip · ← still learning · → know it</span>
        </div>
      </>}

      <p className={styles.note}>
        {signedIn ? sync === 'offline' ? 'Saved in this browser. We will save to your account when you are back online.' : sync === 'saving' ? 'Saving to your account…' : 'Saved to your account, so it follows you to your other device.' : 'Saved in this browser. Sign in to keep your cards on every device.'}
        {' '}Cards are made from this chapter&apos;s guided lessons. <Link href={chapterPath}>Study the full chapter →</Link>
      </p>
    </main>
  </div>;
}
