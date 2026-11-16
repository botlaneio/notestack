import type {Metadata} from 'next';
import {notFound} from 'next/navigation';
import {scienceChapters} from '@/lib/science-chapters';
import {GuidedChapter} from '@/components/real-numbers-lesson';
export const dynamicParams=false;
export function generateStaticParams(){return scienceChapters.map(c=>({chapter:c.slug}));}
export async function generateMetadata({params}:{params:Promise<{chapter:string}>}):Promise<Metadata>{const {chapter:slug}=await params;const c=scienceChapters.find(c=>c.slug===slug);return {title:c?`${c.title} — guided Science`:'Chapter not found'};}
export default async function Page({params}:{params:Promise<{chapter:string}>}){const {chapter:slug}=await params;const c=scienceChapters.find(c=>c.slug===slug);if(!c)notFound();return <GuidedChapter key={c.slug} chapter={c}/>;}
