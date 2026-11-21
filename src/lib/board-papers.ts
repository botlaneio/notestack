// Past SSLC board papers from KSEAB (English medium), tagged by chapter, with worked answers.
// Server-side only: import this from page files (server components) and pass what a page needs
// to browser components as props. Never import it from a 'use client' file, so the questions and
// answers stay inside each locked page (see tests/board-papers.test.mjs).
import maths2025 from './board-papers/maths-2025.json' with {type: 'json'};
import maths2024 from './board-papers/maths-2024.json' with {type: 'json'};
import maths2022 from './board-papers/maths-2022.json' with {type: 'json'};
import science2025 from './board-papers/science-2025.json' with {type: 'json'};
import science2024 from './board-papers/science-2024.json' with {type: 'json'};
import science2022 from './board-papers/science-2022.json' with {type: 'json'};
import ss2025 from './board-papers/ss-2025.json' with {type: 'json'};
import ss2024 from './board-papers/ss-2024.json' with {type: 'json'};
import ss2022 from './board-papers/ss-2022.json' with {type: 'json'};

export type BoardArea = 'maths' | 'science' | 'social-science';

/** One question, or the OR choice printed beside it. */
export interface BoardPart {
  /** Course chapter slug, or null when the topic is not one of the course's chapters. */
  ch: string | null;
  /** Names the topic when `ch` is null, e.g. "Our Environment". */
  topic?: string;
  q: string;
  /** Text description of a figure printed in the paper. */
  fig?: string;
  opts?: string[];
  /** The letter for multiple choice, otherwise a short final answer. */
  ans: string;
  /** Worked answer, one step per line. */
  sol: string[];
  /** Set when the topic is no longer in the current syllabus. */
  syllabusNote?: string;
}

export interface BoardQuestion extends BoardPart {
  n: string;
  sec: string;
  marks: number;
  or?: BoardPart;
}

export interface BoardSection {id: string; part?: string; title: string; note: string}

export interface BoardPaper {
  id: string;
  subject: BoardArea;
  year: number;
  exam: string;
  date: string;
  code: string;
  version: string;
  minutes: number;
  maxMarks: number;
  source: string;
  keySource?: string;
  syllabusNote?: string;
  sections: BoardSection[];
  questions: BoardQuestion[];
}

/** What public pages may show about a paper: no questions or answers. */
export interface BoardPaperSummary {
  id: string; area: BoardArea; year: number; exam: string; date: string; code: string;
  minutes: number; maxMarks: number; questions: number; path: string; source: string; oldSyllabus: boolean;
}

/** One question as it appears in a chapter's "Asked in board exams" list. */
export interface ChapterBoardItem {
  key: string;
  paperId: string;
  paperPath: string;
  year: number;
  exam: string;
  n: string;
  marks: number;
  /** True when this is the OR choice of question `n`. */
  isOr: boolean;
  part: BoardPart;
}

export const BOARD_AREA_NAMES: Record<BoardArea, string> = {maths: 'Maths', science: 'Science', 'social-science': 'Social Science'};

/** Years KSEAB has not published on its website (checked November 2026). */
export const UNPUBLISHED_YEARS = [2023, 2026];

const PAPERS = [maths2025, maths2024, maths2022, science2025, science2024, science2022, ss2025, ss2024, ss2022] as BoardPaper[];

export const paperPath = (paper: Pick<BoardPaper, 'subject' | 'id'>) => `/learn/${paper.subject}/board-papers/${paper.id}/`;

export function allPapers(): BoardPaper[] {
  return PAPERS;
}

export function papersFor(area: BoardArea): BoardPaper[] {
  return PAPERS.filter(p => p.subject === area).sort((a, b) => b.year - a.year);
}

export function findPaper(area: BoardArea, id: string): BoardPaper | undefined {
  return PAPERS.find(p => p.subject === area && p.id === id);
}

export function paperSlugs(area: BoardArea): {paper: string}[] {
  return papersFor(area).map(p => ({paper: p.id}));
}

export function paperSummaries(): BoardPaperSummary[] {
  return PAPERS.map(p => ({
    id: p.id, area: p.subject, year: p.year, exam: p.exam, date: p.date, code: p.code, minutes: p.minutes,
    maxMarks: p.maxMarks, questions: p.questions.length, path: paperPath(p), source: p.source, oldSyllabus: Boolean(p.syllabusNote),
  }));
}

/**
 * Every question (and OR choice) tagged to a chapter, newest paper first. Questions on topics that
 * have left the syllabus stay in the full papers but are not listed under a chapter.
 */
export function chapterBoardQuestions(area: BoardArea, slug: string): ChapterBoardItem[] {
  const out: ChapterBoardItem[] = [];
  for (const paper of papersFor(area)) {
    for (const q of paper.questions) {
      const parts: [BoardPart, boolean][] = [[q, false]];
      if (q.or) parts.push([q.or, true]);
      for (const [part, isOr] of parts) {
        if (part.ch !== slug || part.syllabusNote || (isOr ? false : q.syllabusNote)) continue;
        out.push({key: `${paper.id}-${q.n}${isOr ? '-or' : ''}`, paperId: paper.id, paperPath: paperPath(paper), year: paper.year, exam: paper.exam, n: q.n, marks: q.marks, isOr, part});
      }
    }
  }
  return out;
}

/** How many board questions each chapter has, for chapter lists. */
export function chapterCounts(area: BoardArea): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const paper of papersFor(area)) {
    for (const q of paper.questions) {
      for (const part of q.or ? [q, q.or] : [q]) {
        if (part.ch && !part.syllabusNote) counts[part.ch] = (counts[part.ch] ?? 0) + 1;
      }
    }
  }
  return counts;
}
