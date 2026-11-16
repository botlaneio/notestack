import type {Metadata} from 'next';
import {ScienceChapterIndex} from '@/components/science-chapter-index';
export const metadata:Metadata={title:'Guided Science chapters',description:'KTBS Class 10 Science: Chemical Reactions and Equations; Acids, Bases and Salts. Guided study, virtual models and source-mapped practice.'};
export default function Page(){return <ScienceChapterIndex/>;}
