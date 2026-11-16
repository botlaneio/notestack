import {notFound} from 'next/navigation';
import {chapterWorkbooks} from '@/lib/chapter-practice';
import {ChapterCoverage} from '@/components/chapter-coverage';
import {additionalStudyUnits} from '@/lib/maths-chapters';
export const dynamicParams=false;
export function generateStaticParams(){return chapterWorkbooks.map(c=>({chapter:c.slug}));}
export default async function Page({params}:{params:Promise<{chapter:string}>}){const {chapter:slug}=await params;const config=chapterWorkbooks.find(c=>c.slug===slug);if(!config)notFound();return <ChapterCoverage key={config.slug} config={config} chapter={additionalStudyUnits.find(c=>c.slug===slug)!}/>;}
