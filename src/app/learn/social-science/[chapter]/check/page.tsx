import {notFound} from 'next/navigation';
import {historyChapters,historyWorkbooks} from '@/lib/history-chapters';
import {RealNumberWorkbook} from '@/components/real-number-workbook';
import {guideStepsFor} from '@/lib/guide-steps';
export const dynamicParams=false;
export function generateStaticParams(){return historyWorkbooks.map(c=>({chapter:c.slug}));}
export default async function Page({params}:{params:Promise<{chapter:string}>}){const {chapter:slug}=await params;const c=historyWorkbooks.find(c=>c.slug===slug);if(!c)notFound();return <RealNumberWorkbook key={c.slug} config={c} guideSteps={guideStepsFor(slug)} independent/>;}
