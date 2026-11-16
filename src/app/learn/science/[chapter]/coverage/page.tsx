import {notFound} from 'next/navigation';
import {scienceChapters,scienceWorkbooks} from '@/lib/science-chapters';
import {ChapterCoverage} from '@/components/chapter-coverage';
export const dynamicParams=false;
export function generateStaticParams(){return scienceWorkbooks.map(c=>({chapter:c.slug}));}
export default async function Page({params}:{params:Promise<{chapter:string}>}){const {chapter:slug}=await params;const c=scienceWorkbooks.find(c=>c.slug===slug);if(!c)notFound();return <ChapterCoverage key={c.slug} config={c} chapter={scienceChapters.find(s=>s.slug===slug)!}/>;}
