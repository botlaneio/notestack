import type {Metadata} from 'next';
import {MathsChapterIndex} from '@/components/maths-chapter-index';
export const metadata: Metadata={title:'Guided Maths chapters',description:'Study Real Numbers, Polynomials, Linear Equations, Quadratic Equations and Arithmetic Progressions with interactive explanations and practice.'};
export default function Page(){return <MathsChapterIndex/>;}
