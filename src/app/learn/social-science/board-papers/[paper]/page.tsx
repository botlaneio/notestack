import type {Metadata} from 'next';
import {notFound} from 'next/navigation';
import {BoardPaperExam} from '@/components/board-paper-exam';
import {BOARD_AREA_NAMES, findPaper, paperSlugs} from '@/lib/board-papers';
// The full paper is passed from this (locked) page; it never goes into shared JavaScript.
export const dynamicParams=false;
export function generateStaticParams(){return paperSlugs('social-science');}
export async function generateMetadata({params}:{params:Promise<{paper:string}>}):Promise<Metadata>{const {paper:id}=await params;const p=findPaper('social-science',id);return {title:p?`${BOARD_AREA_NAMES['social-science']} ${p.year} board paper — timed mock test`:'Paper not found'};}
export default async function Page({params}:{params:Promise<{paper:string}>}){const {paper:id}=await params;const p=findPaper('social-science',id);if(!p)notFound();return <BoardPaperExam key={p.id} paper={p} subjectName={BOARD_AREA_NAMES['social-science']}/>;}
