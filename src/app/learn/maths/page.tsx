import type {Metadata} from 'next';
import {MathsChapterIndex} from '@/components/maths-chapter-index';
export const metadata: Metadata={title:'Guided Maths chapters',description:'Study Maths Chapters 1–12, including trigonometry, circles, areas and composite solids, with guided explanations and textbook practice.'};
export default function Page(){return <MathsChapterIndex/>;}
