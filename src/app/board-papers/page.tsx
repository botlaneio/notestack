import type {Metadata} from 'next';
import {BoardPaperHub, type BoardChapterLink} from '@/components/board-paper-hub';
import {chapterCounts, paperSummaries, UNPUBLISHED_YEARS, type BoardArea} from '@/lib/board-papers';
import {deckSummaries} from '@/lib/flashcards';
export const metadata:Metadata={title:'Past SSLC board papers, tagged by chapter',description:'Official KSEAB Karnataka SSLC papers for Maths, Science and Social Science with worked answers. Take a full paper as a timed mock test or see every board question from a chapter.'};
// Only paper titles, chapter titles and counts reach this public page.
export default function Page(){
  const counts:Record<BoardArea,Record<string,number>>={maths:chapterCounts('maths'),science:chapterCounts('science'),'social-science':chapterCounts('social-science')};
  const chapters:BoardChapterLink[]=deckSummaries().map(d=>({area:d.area,slug:d.slug,title:d.title,label:d.code?`APPENDIX ${d.code}`:`CHAPTER ${d.number}`,count:counts[d.area][d.slug]??0,free:d.free}));
  return <BoardPaperHub papers={paperSummaries()} chapters={chapters} unpublished={UNPUBLISHED_YEARS}/>;
}
