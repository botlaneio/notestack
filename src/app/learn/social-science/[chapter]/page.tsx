import type {Metadata} from 'next';
import {notFound} from 'next/navigation';
import {historyChapters} from '@/lib/history-chapters';
import {GuidedChapter} from '@/components/real-numbers-lesson';
import freedomSourceDetails from '@/lib/freedom-struggle-source-details.json';
export const dynamicParams=false;
export function generateStaticParams(){return historyChapters.map(c=>({chapter:c.slug}));}
export async function generateMetadata({params}:{params:Promise<{chapter:string}>}):Promise<Metadata>{const {chapter:slug}=await params;const c=historyChapters.find(c=>c.slug===slug);return {title:c?`${c.title} — guided ${c.discipline??'History'}`:'Chapter not found'};}
export default async function Page({params}:{params:Promise<{chapter:string}>}){const {chapter:slug}=await params;const c=historyChapters.find(c=>c.slug===slug);if(!c)notFound();return <GuidedChapter key={c.slug} chapter={c} sourceDetails={c.number===18?freedomSourceDetails:undefined}/>;}
