'use client';
// "Asked in board exams" for one chapter. The questions arrive as props from the chapter's own
// (locked) page; this file must not import board paper data (see tests/board-papers.test.mjs).
import Link from 'next/link';
import {useMemo, useState} from 'react';
import {ArrowLeft, ArrowRight, ChevronDown, ChevronUp} from 'lucide-react';
import {Brand} from './brand';
import {ChapterStudyNavigation} from './chapter-one-navigation';
import type {BoardArea, BoardPart, ChapterBoardItem} from '@/lib/board-papers';
import styles from './board-papers.module.css';

const LETTERS = 'ABCD';
const listJoin = (items: (string | number)[]) => items.length < 2 ? items.join('') : `${items.slice(0, -1).join(', ')} and ${items[items.length - 1]}`;

export function PartBody({part}: {part: BoardPart}) {
  return <>
    <p className={styles.question}>{part.q}</p>
    {part.fig && <p className={styles.figure}>Figure: {part.fig}</p>}
    {part.opts && <ul className={styles.options}>{part.opts.map((o, i) => <li key={o}><b>{LETTERS[i]}</b><span>{o}</span></li>)}</ul>}
  </>;
}

export function WorkedAnswer({part}: {part: BoardPart}) {
  const letter = part.opts ? LETTERS.indexOf(part.ans) : -1;
  return <div className={styles.answer}>
    <strong>WORKED ANSWER</strong>
    <p>{letter >= 0 && part.opts ? `(${part.ans}) ${part.opts[letter]}` : part.ans}</p>
    {part.sol.length > 0 && <ol>{part.sol.map((s, i) => <li key={i}>{s}</li>)}</ol>}
  </div>;
}

function QuestionCard({item}: {item: ChapterBoardItem}) {
  const [open, setOpen] = useState(false);
  return <article className={styles.card} aria-label={`${item.year} question ${item.n}${item.isOr ? ' (OR choice)' : ''}`}>
    <div className={styles.meta}>
      <span className={styles.badge}>{item.year} · {item.exam}</span>
      <span className={styles.badge}>Q{item.n}</span>
      {item.isOr && <span className={`${styles.badge} ${styles.orBadge}`}>OR choice</span>}
      <span className={`${styles.badge} ${styles.marks}`}>{item.marks} {item.marks === 1 ? 'mark' : 'marks'}</span>
      <Link href={item.paperPath}>Full paper <ArrowRight size={13}/></Link>
    </div>
    <PartBody part={item.part}/>
    <button type="button" className={styles.reveal} aria-expanded={open} onClick={() => setOpen(!open)}>
      {open ? <><ChevronUp size={16}/>Hide worked answer</> : <><ChevronDown size={16}/>Show worked answer</>}
    </button>
    {open && <WorkedAnswer part={item.part}/>}
  </article>;
}

export function BoardQuestions({area, slug, title, subjectName, items, years, unpublished}: {
  area: BoardArea; slug: string; title: string; subjectName: string; items: ChapterBoardItem[]; years: number[]; unpublished: number[];
}) {
  const [year, setYear] = useState<number | null>(null);
  const [marks, setMarks] = useState<number | null>(null);
  const markValues = useMemo(() => [...new Set(items.map(i => i.marks))].sort((a, b) => a - b), [items]);
  const shown = items.filter(i => (year === null || i.year === year) && (marks === null || i.marks === marks));
  const total = items.reduce((n, i) => n + i.marks, 0);
  const unit = slug === 'proofs-in-mathematics' || slug === 'mathematical-modelling' ? 'appendix' : 'chapter';

  return <div className={styles.page}>
    <header className={styles.header}>
      <Link href="/" aria-label="NoteStack home"><Brand small/></Link>
      <Link href="/board-papers/"><ArrowLeft size={15}/> All board papers</Link>
    </header>
    <main className={styles.narrow}>
      <ChapterStudyNavigation active="board" slug={slug} title={title} subject={area}/>
      <span className={styles.kicker}>{subjectName.toUpperCase()} · ASKED IN BOARD EXAMS</span>
      <h1>{title}</h1>
      {items.length > 0
        ? <p className={styles.lead}>{items.length} {items.length === 1 ? 'question' : 'questions'} ({total} marks) from the official KSEAB SSLC papers of {listJoin(years)}, each with a worked answer. KSEAB has not published the {unpublished.join(' and ')} papers, so they are not included.</p>
        : <p className={styles.lead}>None of the official KSEAB SSLC papers of {listJoin(years)} asked a question from this {unit}.</p>}

      {items.length > 0 && <>
        <div className={styles.chips} role="group" aria-label="Filter by year">
          <button type="button" aria-pressed={year === null} onClick={() => setYear(null)}>All years</button>
          {years.map(y => <button key={y} type="button" aria-pressed={year === y} onClick={() => setYear(y)}>{y} <span>{items.filter(i => i.year === y).length}</span></button>)}
        </div>
        {markValues.length > 1 && <div className={styles.chips} role="group" aria-label="Filter by marks">
          <button type="button" aria-pressed={marks === null} onClick={() => setMarks(null)}>All marks</button>
          {markValues.map(m => <button key={m} type="button" aria-pressed={marks === m} onClick={() => setMarks(m)}>{m} {m === 1 ? 'mark' : 'marks'} <span>{items.filter(i => i.marks === m).length}</span></button>)}
        </div>}
        <div className={styles.list}>
          {shown.map(item => <QuestionCard key={item.key} item={item}/>)}
          {shown.length === 0 && <p className={styles.empty}>No questions match these filters.</p>}
        </div>
      </>}
      {items.length === 0 && <p className={styles.empty}>Practise with the <Link href="/board-papers/">full past papers</Link> instead, or try the <Link href={`/learn/${area}/${slug}/practice/`}>textbook practice</Link> for this {unit}.</p>}
      <p className={styles.note}>Questions and marks are from the official papers on kseab.karnataka.gov.in. Worked answers are written by NoteStack. Questions on topics that are no longer in the syllabus appear only in the full papers.</p>
    </main>
  </div>;
}
