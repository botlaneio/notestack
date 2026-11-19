// Server side: the few guide-step fields that practice-page tools need (see guide-steps-context).
import {historyChapters} from './history-chapters.ts';

export function guideStepsFor(slug: string) {
  const chapter = historyChapters.find(c => c.slug === slug);
  // Only chapters whose practice tools read guide steps (Social Science 7 and 9–10).
  if (!chapter || ![7, 9, 10].includes(chapter.number)) return undefined;
  return chapter.steps.map(s => ({id: s.id, title: s.title, example: s.example, explorer: s.explorer}));
}
