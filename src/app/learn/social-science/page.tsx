import type {Metadata} from 'next';
import {HistoryChapterIndex} from '@/components/history-chapter-index';
export const metadata:Metadata={title:'Guided Social Science · History — NoteStack',description:'Study the first two uploaded History chapters through interactive timelines, maps, explanations and source-linked practice.'};
export default function Page(){return <HistoryChapterIndex/>;}
