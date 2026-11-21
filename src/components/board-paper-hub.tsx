// The public list of past board papers. It receives titles and counts only (BoardPaperSummary and
// chapter counts); the questions themselves live on each paper's and chapter's locked page.
import Link from 'next/link';
import {ArrowLeft, ArrowRight} from 'lucide-react';
import {Brand} from './brand';
import type {BoardArea, BoardPaperSummary} from '@/lib/board-papers';
import styles from './board-papers.module.css';

export interface BoardChapterLink {area: BoardArea; slug: string; title: string; label: string; count: number; free: boolean}

const listJoin = (items: number[]) => items.length < 2 ? items.join('') : `${items.slice(0, -1).join(', ')} and ${items[items.length - 1]}`;

const AREAS: {id: BoardArea; name: string}[] = [
  {id: 'maths', name: 'Maths'},
  {id: 'science', name: 'Science'},
  {id: 'social-science', name: 'Social Science'},
];

export function BoardPaperHub({papers, chapters, unpublished}: {papers: BoardPaperSummary[]; chapters: BoardChapterLink[]; unpublished: number[]}) {
  const years = [...new Set(papers.map(p => p.year))].sort((a, b) => b - a);
  const questions = papers.reduce((n, p) => n + p.questions, 0);
  return <div className={styles.page}>
    <header className={styles.header}>
      <Link href="/" aria-label="NoteStack home"><Brand small/></Link>
      <Link href="/"><ArrowLeft size={15}/> Back to NoteStack</Link>
    </header>
    <main className={styles.main}>
      <span className={styles.kicker}>PAST BOARD PAPERS · KARNATAKA SSLC</span>
      <h1>Past board papers, tagged by chapter.</h1>
      <p className={styles.lead}>{papers.length} official KSEAB papers from {listJoin(years)} ({questions} questions), each with worked answers. Sit a full paper as a timed mock test, or open any chapter to see every question the board has asked from it.</p>
      <p className={styles.missing}>KSEAB has not published the {unpublished.join(' and ')} papers on its website, so they are not included. We only use official papers.</p>

      {AREAS.map(area => {
        const list = papers.filter(p => p.area === area.id).sort((a, b) => b.year - a.year);
        const chapterList = chapters.filter(c => c.area === area.id && c.count > 0);
        return <section key={area.id} className={styles.subject} aria-labelledby={`papers-${area.id}`}>
          <h2 id={`papers-${area.id}`}>{area.name}: full papers</h2>
          <div className={styles.papers}>
            {list.map(p => <Link key={p.id} href={p.path} className={styles.paper}>
              <span className={styles.paperTop}><span>{p.code} · {p.exam}</span><ArrowRight size={15}/></span>
              <strong>{area.name} {p.year}</strong>
              <span>{p.questions} questions · {p.maxMarks} marks · {Math.floor(p.minutes / 60)} h {p.minutes % 60} min</span>
              {p.oldSyllabus && <em>Older syllabus: removed topics are marked</em>}
            </Link>)}
          </div>
          {chapterList.length > 0 && <>
            <h2 style={{marginTop: 28}}>{area.name}: questions by chapter</h2>
            <div className={styles.papers}>
              {chapterList.map(c => <Link key={c.slug} href={`/learn/${c.area}/${c.slug}/board/`} className={styles.paper}>
                <span className={styles.paperTop}><span>{c.label}{c.free ? ' · FREE' : ''}</span><ArrowRight size={15}/></span>
                <strong style={{fontSize: 17}}>{c.title}</strong>
                <span>{c.count} board {c.count === 1 ? 'question' : 'questions'}</span>
              </Link>)}
            </div>
          </>}
        </section>;
      })}
      <p className={styles.note}>Full papers and chapter questions unlock with the subject, like the lessons. The first chapter of each subject is free. Questions are from kseab.karnataka.gov.in; worked answers are written by NoteStack.</p>
    </main>
  </div>;
}
