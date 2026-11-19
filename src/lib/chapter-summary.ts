// Chapter lists show titles and progress only. Pages build these light summaries on the
// server so the full lesson text never ships in the site's shared JavaScript files.
import type {Chapter} from './maths-chapters.ts';
import type {LessonStep} from './real-numbers.ts';

export type ChapterSummary = {
  number: number; code?: string; slug: string; title: string; sections: string[];
  discipline?: string; sourcePending?: string; legacyIds?: string[];
  /** Only what saved progress needs: step ids, the right option, and how many options there are. */
  steps: LessonStep[];
  /** Number of book activities in the chapter's workbook, when it has one. */
  tasks?: number;
};

export function summariseChapters(chapters: Chapter[], workbooks?: {tasks: unknown[]}[]): ChapterSummary[] {
  return chapters.map((c, i) => {
    const summary: ChapterSummary = {
      number: c.number, slug: c.slug, title: c.title, sections: c.sections,
      steps: c.steps.map(s => ({id: s.id, correct: s.correct, options: s.options.map(() => '')}) as unknown as LessonStep),
    };
    if (c.code) summary.code = c.code;
    if (c.discipline) summary.discipline = c.discipline;
    if (c.sourcePending) summary.sourcePending = c.sourcePending;
    if (c.legacyIds) summary.legacyIds = c.legacyIds;
    if (workbooks?.[i]) summary.tasks = workbooks[i].tasks.length;
    return summary;
  });
}
