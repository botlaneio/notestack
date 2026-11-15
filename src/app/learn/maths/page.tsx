import type {Metadata} from 'next';
import {MathsChapterIndex} from '@/components/maths-chapter-index';
export const metadata: Metadata={title:'Guided Maths chapters',description:'Study Maths Chapters 1–7, from Real Numbers to Triangles and Coordinate Geometry, with interactive explanations and practice.'};
export default function Page(){return <MathsChapterIndex/>;}
