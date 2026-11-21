import type {Metadata} from 'next';
import {BoardChapterPage} from '@/components/board-chapter-page';
export const metadata:Metadata={title:'Real Numbers — board exam questions'};
export default function Page(){return <BoardChapterPage area="maths" slug="real-numbers"/>;}
