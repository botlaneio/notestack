'use client';
// A full past paper as a timed mock test. The paper arrives as props from its own (locked) page;
// this file must not import board paper data (see tests/board-papers.test.mjs).
// Multiple choice questions are marked automatically. Written answers are done on paper and the
// student marks them against the worked answers. Progress is kept in this browser only.
import Link from 'next/link';
import {useCallback, useEffect, useMemo, useState} from 'react';
import {ArrowLeft, Clock, RotateCcw} from 'lucide-react';
import {Brand} from './brand';
import {PartBody, WorkedAnswer} from './board-questions';
import type {BoardPaper, BoardQuestion} from '@/lib/board-papers';
import styles from './board-papers.module.css';

type Saved = {startedAt: number | null; finishedAt: number | null; picks: Record<string, string>; marks: Record<string, number>};
const EMPTY: Saved = {startedAt: null, finishedAt: null, picks: {}, marks: {}};
const storageKey = (id: string) => `ns-board-paper-v1:${id}`;
const LETTERS = 'ABCD';

function readLocal(id: string): Saved {
  try {
    const v = JSON.parse(localStorage.getItem(storageKey(id)) ?? 'null');
    if (!v || typeof v !== 'object') return EMPTY;
    return {
      startedAt: typeof v.startedAt === 'number' ? v.startedAt : null,
      finishedAt: typeof v.finishedAt === 'number' ? v.finishedAt : null,
      picks: v.picks && typeof v.picks === 'object' ? v.picks : {},
      marks: v.marks && typeof v.marks === 'object' ? v.marks : {},
    };
  } catch {
    return EMPTY;
  }
}
function writeLocal(id: string, saved: Saved) {
  try {localStorage.setItem(storageKey(id), JSON.stringify(saved));} catch {/* private mode or full storage */}
}

const isMcq = (q: BoardQuestion) => Boolean(q.opts && !q.or);
const clock = (seconds: number) => {
  const s = Math.max(0, Math.floor(seconds));
  const h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60), r = s % 60;
  return `${h}:${String(m).padStart(2, '0')}:${String(r).padStart(2, '0')}`;
};
const longDate = (iso: string) => new Date(`${iso}T00:00:00+05:30`).toLocaleDateString('en-IN', {day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Asia/Kolkata'});

export function BoardPaperExam({paper, subjectName}: {paper: BoardPaper; subjectName: string}) {
  const [saved, setSaved] = useState<Saved>(EMPTY);
  const [ready, setReady] = useState(false);
  const [now, setNow] = useState(() => Date.now());
  const [confirming, setConfirming] = useState(false);

  useEffect(() => {setSaved(readLocal(paper.id)); setReady(true);}, [paper.id]);
  const update = useCallback((change: (s: Saved) => Saved) => setSaved(prev => {
    const next = change(prev);
    writeLocal(paper.id, next);
    return next;
  }), [paper.id]);

  const running = saved.startedAt !== null && saved.finishedAt === null;
  const left = saved.startedAt === null ? paper.minutes * 60 : paper.minutes * 60 - (now - saved.startedAt) / 1000;

  useEffect(() => {
    if (!running) return;
    const timer = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(timer);
  }, [running]);
  useEffect(() => {
    if (running && left <= 0) update(s => ({...s, finishedAt: Date.now()}));
  }, [running, left, update]);

  const sections = useMemo(() => paper.sections.map(s => ({...s, questions: paper.questions.filter(q => q.sec === s.id)})), [paper]);
  const mcqs = paper.questions.filter(isMcq);
  const written = paper.questions.filter(q => !isMcq(q));
  const mcqScore = mcqs.reduce((n, q) => n + (saved.picks[q.n] === q.ans ? q.marks : 0), 0);
  const mcqMax = mcqs.reduce((n, q) => n + q.marks, 0);
  const selfScore = written.reduce((n, q) => n + (saved.marks[q.n] ?? 0), 0);
  const selfDone = written.filter(q => saved.marks[q.n] !== undefined).length;
  const answered = mcqs.filter(q => saved.picks[q.n]).length;

  const start = () => {update(() => ({...EMPTY, startedAt: Date.now()})); setNow(Date.now()); window.scrollTo({top: 0});};
  const finish = () => {update(s => ({...s, finishedAt: Date.now()})); setConfirming(false); window.scrollTo({top: 0});};
  const restart = () => {update(() => EMPTY); setConfirming(false); window.scrollTo({top: 0});};
  const title = `${subjectName} ${paper.year}`;

  return <div className={styles.page}>
    <header className={styles.header}>
      <Link href="/" aria-label="NoteStack home"><Brand small/></Link>
      <Link href="/board-papers/"><ArrowLeft size={15}/> All board papers</Link>
    </header>

    {running && <div className={styles.bar} role="timer" aria-live="off">
      <span><Clock size={16} style={{verticalAlign: '-3px', marginRight: 6}}/>Time left <time className={left < 900 ? styles.low : undefined}>{clock(left)}</time></span>
      <span>{answered}/{mcqs.length} multiple choice answered</span>
      {confirming
        ? <span style={{display: 'flex', gap: 8}}><button type="button" onClick={finish}>Yes, finish now</button><button type="button" onClick={() => setConfirming(false)}>Keep writing</button></span>
        : <button type="button" onClick={() => setConfirming(true)}>Finish and check</button>}
    </div>}

    <main className={styles.narrow}>
      <span className={styles.kicker}>{subjectName.toUpperCase()} · KSEAB SSLC {paper.year} · {paper.exam.toUpperCase()}</span>
      <h1>{title} board paper</h1>

      {!ready && <p role="status" className={styles.lead}>Opening the paper…</p>}

      {ready && saved.startedAt === null && <>
        <p className={styles.lead}>The official {paper.code} paper (version {paper.version}) from {longDate(paper.date)}. Sit it like the real exam: set the timer, write on paper, then check every answer.</p>
        <div className={styles.facts}>
          <div><b>{paper.maxMarks}</b><span>marks</span></div>
          <div><b>{paper.questions.length}</b><span>questions</span></div>
          <div><b>{Math.floor(paper.minutes / 60)} h {paper.minutes % 60} min</b><span>including 15 min reading</span></div>
          <div><b>{mcqMax}</b><span>marks marked for you</span></div>
        </div>
        <ol className={styles.rules}>
          <li>The timer runs for {paper.minutes} minutes, like the real exam. It keeps running if you close the page.</li>
          <li>Choose the answer for each multiple choice question here. Write every other answer on paper.</li>
          <li>When you finish, multiple choice is marked for you. Mark your written answers against the worked answers.</li>
          {paper.syllabusNote && <li>{paper.syllabusNote}</li>}
        </ol>
        <div className={styles.actions}><button type="button" className={styles.primary} onClick={start}><Clock size={17}/> Start the timed paper</button></div>
        <p className={styles.note}>Source: <a href={paper.source} target="_blank" rel="noopener noreferrer">KSEAB question paper</a>{paper.keySource && <>, <a href={paper.keySource} target="_blank" rel="noopener noreferrer">KSEAB key answers</a></>}. Your answers are saved in this browser only.</p>
      </>}

      {ready && saved.finishedAt !== null && <div className={styles.score} aria-live="polite">
        <b>{mcqScore + selfScore}<span style={{fontSize: 20, color: '#586178'}}> / {paper.maxMarks}</span></b>
        <p>Multiple choice: {mcqScore} of {mcqMax}, marked for you.<br/>Written answers: {selfScore} so far, {selfDone} of {written.length} marked by you.{selfDone < written.length && ' Mark the rest below.'}</p>
        <button type="button" className={styles.secondary} onClick={restart}><RotateCcw size={16}/> Sit it again</button>
      </div>}

      {ready && saved.startedAt !== null && sections.map(section => <section key={section.id}>
        <div className={styles.sectionHead}>
          {section.part && <small>{section.part}</small>}
          <h2>{section.id}. {section.title}</h2>
          <span>{section.note}</span>
        </div>
        <div className={styles.list}>
          {section.questions.map(q => <Question key={q.n} q={q} saved={saved} review={saved.finishedAt !== null}
            pick={letter => update(s => ({...s, picks: {...s.picks, [q.n]: letter}}))}
            mark={value => update(s => ({...s, marks: {...s.marks, [q.n]: value}}))}/>)}
        </div>
      </section>)}

      {ready && running && <div className={styles.actions}>
        {confirming
          ? <><button type="button" className={styles.primary} onClick={finish}>Yes, finish now</button><button type="button" className={styles.secondary} onClick={() => setConfirming(false)}>Keep writing</button></>
          : <button type="button" className={styles.primary} onClick={() => setConfirming(true)}>Finish and check answers</button>}
      </div>}
    </main>
  </div>;
}

function Question({q, saved, review, pick, mark}: {q: BoardQuestion; saved: Saved; review: boolean; pick: (letter: string) => void; mark: (value: number) => void}) {
  const mcq = isMcq(q);
  const chosen = saved.picks[q.n];
  return <article className={styles.card} aria-label={`Question ${q.n}`}>
    <div className={styles.meta}>
      <span className={styles.badge}>Q{q.n}</span>
      <span className={`${styles.badge} ${styles.marks}`}>{q.marks} {q.marks === 1 ? 'mark' : 'marks'}</span>
    </div>
    {mcq && q.opts
      ? <>
        <p className={styles.question}>{q.q}</p>
        {q.fig && <p className={styles.figure}>Figure: {q.fig}</p>}
        <div className={styles.choices} role="radiogroup" aria-label={`Question ${q.n} choices`}>
          {q.opts.map((o, i) => {
            const letter = LETTERS[i];
            const result = review ? (letter === q.ans ? 'right' : letter === chosen ? 'wrong' : undefined) : undefined;
            return <label key={o} className={styles.option} data-picked={!review && chosen === letter} data-result={result}>
              <input type="radio" name={`q-${q.n}`} value={letter} checked={chosen === letter} disabled={review} onChange={() => pick(letter)}/>
              <b>{letter}</b><span>{o}</span>
            </label>;
          })}
        </div>
      </>
      : <>
        <PartBody part={q}/>
        {q.or && <><div className={styles.orDivider}>OR</div><PartBody part={q.or}/></>}
        {!review && <p className={styles.writeHint}>Write your answer on paper.</p>}
      </>}
    {review && (q.syllabusNote || q.or?.syllabusNote) && <p className={styles.removed}>{q.syllabusNote ?? q.or?.syllabusNote}</p>}
    {review && <>
      <WorkedAnswer part={q}/>
      {q.or && <><div className={styles.orDivider}>OR</div><WorkedAnswer part={q.or}/></>}
      {mcq
        ? <p className={styles.writeHint}>{chosen ? (chosen === q.ans ? `Correct: ${q.marks} ${q.marks === 1 ? 'mark' : 'marks'}.` : `You chose ${chosen}. 0 marks.`) : 'Not answered. 0 marks.'}</p>
        : <div className={styles.markRow}>
          <span>Your marks</span>
          <div className={styles.markButtons} role="group" aria-label={`Marks for question ${q.n}`}>
            {Array.from({length: q.marks + 1}, (_, m) => <button key={m} type="button" aria-pressed={saved.marks[q.n] === m} onClick={() => mark(m)}>{m}</button>)}
          </div>
        </div>}
    </>}
  </article>;
}
