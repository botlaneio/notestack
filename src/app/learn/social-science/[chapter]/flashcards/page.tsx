import type {Metadata} from 'next';
import {notFound} from 'next/navigation';
import {FlashcardDeck} from '@/components/flashcard-deck';
import {AREA_NAMES, deckSlugs, findDeck} from '@/lib/flashcards';
// Card text is passed from this (locked) page; it never goes into shared JavaScript.
export const dynamicParams=false;
export function generateStaticParams(){return deckSlugs('social-science');}
export async function generateMetadata({params}:{params:Promise<{chapter:string}>}):Promise<Metadata>{const {chapter:slug}=await params;const d=findDeck('social-science',slug);return {title:d?`${d.title} — flashcards`:'Chapter not found'};}
export default async function Page({params}:{params:Promise<{chapter:string}>}){const {chapter:slug}=await params;const d=findDeck('social-science',slug);if(!d)notFound();return <FlashcardDeck key={d.slug} deck={d} subjectName={AREA_NAMES['social-science']}/>;}
