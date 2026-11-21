import type {Metadata} from 'next';
import {BoardChapterPage, boardChapterTitle} from '@/components/board-chapter-page';
import {deckSlugs} from '@/lib/flashcards';
// Board questions are passed from this (locked) page; they never go into shared JavaScript.
export const dynamicParams=false;
export function generateStaticParams(){return deckSlugs('maths').filter(p=>p.chapter!=='real-numbers');}
export async function generateMetadata({params}:{params:Promise<{chapter:string}>}):Promise<Metadata>{const {chapter:slug}=await params;return {title:boardChapterTitle('maths',slug)};}
export default async function Page({params}:{params:Promise<{chapter:string}>}){const {chapter:slug}=await params;return <BoardChapterPage area="maths" slug={slug}/>;}
