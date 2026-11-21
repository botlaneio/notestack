import type {Metadata} from 'next';
import {BoardChapterPage, boardChapterTitle} from '@/components/board-chapter-page';
import {deckSlugs} from '@/lib/flashcards';
// Board questions are passed from this (locked) page; they never go into shared JavaScript.
export const dynamicParams=false;
export function generateStaticParams(){return deckSlugs('social-science');}
export async function generateMetadata({params}:{params:Promise<{chapter:string}>}):Promise<Metadata>{const {chapter:slug}=await params;return {title:boardChapterTitle('social-science',slug)};}
export default async function Page({params}:{params:Promise<{chapter:string}>}){const {chapter:slug}=await params;return <BoardChapterPage area="social-science" slug={slug}/>;}
