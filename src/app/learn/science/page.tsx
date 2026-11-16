import type {Metadata} from 'next';
import {ScienceChapterIndex} from '@/components/science-chapter-index';
export const metadata:Metadata={title:'Guided Science chapters',description:'KTBS Class 10 Science Chapters 1–4: guided study, virtual chemistry models and source coverage maps, with missing source pages explicitly flagged.'};
export default function Page(){return <ScienceChapterIndex/>;}
