import {notFound} from 'next/navigation';
import {historyChapters,historyWorkbooks} from '@/lib/history-chapters';
import {ChapterCoverage} from '@/components/chapter-coverage';
export const dynamicParams=false;
export function generateStaticParams(){return historyWorkbooks.map(c=>({chapter:c.slug}));}
export default async function Page({params}:{params:Promise<{chapter:string}>}){const {chapter:slug}=await params;const c=historyWorkbooks.find(c=>c.slug===slug);if(!c)notFound();return <ChapterCoverage key={c.slug} config={c} chapter={historyChapters.find(s=>s.slug===slug)!}/>;}
