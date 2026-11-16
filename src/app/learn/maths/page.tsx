import type {Metadata} from 'next';
import {MathsChapterIndex} from '@/components/maths-chapter-index';
export const metadata: Metadata={title:'Guided Maths chapters',description:'Study Maths Chapters 1–14, including statistics and probability, with guided explanations and textbook practice.'};
export default function Page(){return <MathsChapterIndex/>;}
