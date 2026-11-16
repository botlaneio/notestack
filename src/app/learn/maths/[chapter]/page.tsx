import type {Metadata} from 'next';
import {notFound} from 'next/navigation';
import {GuidedChapter} from '@/components/real-numbers-lesson';
import {additionalStudyUnits} from '@/lib/maths-chapters';
export const dynamicParams=false;
export function generateStaticParams(){return additionalStudyUnits.map(chapter=>({chapter:chapter.slug}));}
export async function generateMetadata({params}:{params:Promise<{chapter:string}>}):Promise<Metadata>{const {chapter:slug}=await params;const chapter=additionalStudyUnits.find(c=>c.slug===slug);return {title:chapter?`${chapter.title} — guided chapter`:'Chapter not found'};}
export default async function Page({params}:{params:Promise<{chapter:string}>}){const {chapter:slug}=await params;const chapter=additionalStudyUnits.find(c=>c.slug===slug);if(!chapter)notFound();return <GuidedChapter key={chapter.slug} chapter={chapter}/>;}
