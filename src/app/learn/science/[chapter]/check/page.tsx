import {notFound} from 'next/navigation';
import {scienceChapters,scienceWorkbooks} from '@/lib/science-chapters';
import {RealNumberWorkbook} from '@/components/real-number-workbook';
export const dynamicParams=false;
export function generateStaticParams(){return scienceWorkbooks.map(c=>({chapter:c.slug}));}
export default async function Page({params}:{params:Promise<{chapter:string}>}){const {chapter:slug}=await params;const c=scienceWorkbooks.find(c=>c.slug===slug);if(!c)notFound();return <RealNumberWorkbook key={c.slug} config={c} independent/>;}
