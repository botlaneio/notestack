// Server component shared by the chapter "Board questions" pages. It reads the board paper data
// and passes only this chapter's questions to the browser component.
import {notFound} from 'next/navigation';
import {BoardQuestions} from './board-questions';
import {BOARD_AREA_NAMES, chapterBoardQuestions, papersFor, UNPUBLISHED_YEARS, type BoardArea} from '@/lib/board-papers';
import {findDeck} from '@/lib/flashcards';

export function boardChapterTitle(area: BoardArea, slug: string): string {
  const chapter = findDeck(area, slug);
  return chapter ? `${chapter.title} — board exam questions` : 'Chapter not found';
}

export function BoardChapterPage({area, slug}: {area: BoardArea; slug: string}) {
  const chapter = findDeck(area, slug);
  if (!chapter) notFound();
  const years = [...new Set(papersFor(area).map(p => p.year))].sort((a, b) => b - a);
  return <BoardQuestions key={slug} area={area} slug={slug} title={chapter.title} subjectName={BOARD_AREA_NAMES[area]}
    items={chapterBoardQuestions(area, slug)} years={years} unpublished={UNPUBLISHED_YEARS}/>;
}
