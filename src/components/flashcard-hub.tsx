'use client';
// The public list of flashcard decks. It receives titles and card counts only (DeckSummary);
// the cards themselves live on each chapter's locked page.
import Link from 'next/link';
import {useEffect, useMemo, useState} from 'react';
import {ArrowLeft, Layers, Lock} from 'lucide-react';
import {Brand} from './brand';
import {fetchFlashcards, useSession} from '@/lib/auth-client';
import type {DeckArea, DeckSummary} from '@/lib/flashcards';
import styles from './flashcards.module.css';

const AREAS: {id: DeckArea; name: string; subject: string}[] = [
  {id: 'maths', name: 'Maths', subject: 'mathematics'},
  {id: 'science', name: 'Science', subject: 'science'},
  {id: 'social-science', name: 'Social Science', subject: 'social-science'},
];

const chapterOf = (deckPath: string) => deckPath.replace(/flashcards\/$/, '');

function localKnown(path: string): number {
  try {
    const v = JSON.parse(localStorage.getItem(`ns-flashcards-v1:${path}`) ?? 'null');
    return v?.ratings ? Object.values(v.ratings).filter(r => r === 'k').length : 0;
  } catch {
    return 0;
  }
}

export function FlashcardHub({decks}: {decks: DeckSummary[]}) {
  const session = useSession();
  const [area, setArea] = useState<DeckArea>('maths');
  const [known, setKnown] = useState<Record<string, number>>({});
  const owned = session.status === 'signed-in' ? (session.admin ? AREAS.map(a => a.subject) : session.entitlements) : [];

  useEffect(() => {
    const fromBrowser = Object.fromEntries(decks.map(d => [chapterOf(d.path), localKnown(chapterOf(d.path))]));
    setKnown(fromBrowser);
    if (session.status !== 'signed-in') return;
    let stop = false;
    fetchFlashcards().then(list => {
      if (stop || !list) return;
      setKnown(prev => ({...prev, ...Object.fromEntries(list.map(d => [d.path, d.known.length]))}));
    });
    return () => {stop = true;};
  }, [decks, session.status]);

  const shown = useMemo(() => decks.filter(d => d.area === area), [decks, area]);
  const groups = useMemo(() => {
    const out = new Map<string, DeckSummary[]>();
    for (const d of shown) {
      const key = d.discipline ?? (d.code ? 'Appendices' : 'Chapters');
      out.set(key, [...(out.get(key) ?? []), d]);
    }
    return [...out];
  }, [shown]);
  const total = decks.reduce((n, d) => n + d.count, 0);
  const subject = AREAS.find(a => a.id === area)!;
  const ownsArea = owned.includes(subject.subject);

  return <div className={styles.page}>
    <header className={styles.header}>
      <Link href="/" aria-label="NoteStack home"><Brand small/></Link>
      <Link href="/"><ArrowLeft size={15}/> Back to NoteStack</Link>
    </header>
    <main className={styles.main}>
      <span className={styles.kicker}>QUICK REVISION · CLASS 10</span>
      <h1>Flashcards for every chapter.</h1>
      <p className={styles.lead}>{total.toLocaleString('en-IN')} cards across {decks.length} decks, made from the guided lessons: key ideas, formulas, dates and the questions that test them. Flip a card, then mark it <strong>Know it</strong> or <strong>Still learning</strong>. The first deck in each subject is free.</p>

      <div className={styles.subjectTabs} role="group" aria-label="Subject">
        {AREAS.map(a => <button key={a.id} type="button" aria-pressed={area === a.id} onClick={() => setArea(a.id)}>{a.name} <span>{decks.filter(d => d.area === a.id).length}</span></button>)}
      </div>

      {groups.map(([name, list]) => <section key={name} className={styles.group} aria-label={name}>
        {groups.length > 1 && <h2>{name}</h2>}
        <div className={styles.grid} data-area={area}>
          {list.map(d => {
            const chapter = chapterOf(d.path);
            const k = Math.min(known[chapter] ?? 0, d.count);
            const open = d.free || ownsArea;
            const pct = Math.round(k / d.count * 100);
            return <Link key={d.path} href={d.path} className={styles.deck} data-locked={!open || undefined}>
              <span className={styles.sheet}>
                <span className={styles.deckTop}>
                  <span className={styles.tile} aria-hidden="true"><b>{d.code ?? d.number}</b></span>
                  <span className={styles.label}>{d.code ? `APPENDIX ${d.code}` : `CHAPTER ${d.number}`}</span>
                  {d.free ? <span className={styles.free}>FREE</span> : !open && <span className={styles.locked}><Lock size={13}/>Locked</span>}
                </span>
                <h3>{d.title}</h3>
                <span className={styles.deckFoot}>
                  <span className={styles.count}><Layers size={14} aria-hidden="true"/>{d.count} cards</span>
                  {k > 0 && <span className={styles.knownCount}>{k} known <em>{pct}%</em></span>}
                </span>
                <span className={styles.mini} aria-hidden="true"><i style={{width: `${pct}%`}}/></span>
              </span>
            </Link>;
          })}
        </div>
      </section>)}

      <p className={styles.note}>
        {ownsArea ? `You own ${subject.name}, so every deck here is open.` : `Locked decks open when you own ${subject.name} (₹399) or all three subjects (₹999).`}
        {' '}{session.status === 'signed-in' ? 'Your cards are saved to your account.' : 'Sign in to keep your progress on every device.'}
      </p>
    </main>
  </div>;
}
