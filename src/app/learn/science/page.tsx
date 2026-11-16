import type {Metadata} from 'next';
import {ScienceChapterIndex} from '@/components/science-chapter-index';
export const metadata:Metadata={title:'Guided Science chapters',description:'KTBS Class 10 Science Chapters 1–6: guided study, virtual chemistry models and source coverage maps, complete source mapping for Chapters 1–5 and an explicitly partial Chapter 6 opening.'};
export default function Page(){return <ScienceChapterIndex/>;}
