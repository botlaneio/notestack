import type {Metadata} from 'next';
import {ScienceChapterIndex} from '@/components/science-chapter-index';
export const metadata:Metadata={title:'Guided Science chapters',description:'KTBS Class 10 Science Chapters 1–4: guided study, virtual chemistry models and source coverage maps, including textbook exercises and Chapter 4’s closing summary and group activities.'};
export default function Page(){return <ScienceChapterIndex/>;}
