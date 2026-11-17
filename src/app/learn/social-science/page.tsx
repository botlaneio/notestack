import type {Metadata} from 'next';
import {HistoryChapterIndex} from '@/components/history-chapter-index';
export const metadata:Metadata={title:'Guided Social Science — NoteStack',description:'Study uploaded Social Science Chapters 1–6: History and Public Administration, with guided explanations,interactive tools and source-linked practice.'};
export default function Page(){return <HistoryChapterIndex/>;}
