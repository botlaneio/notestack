import type {Metadata} from 'next';
import {notFound} from 'next/navigation';
import {FlashcardDeck} from '@/components/flashcard-deck';
import {AREA_NAMES, findDeck} from '@/lib/flashcards';
export const metadata:Metadata={title:'Real Numbers — flashcards'};
export default function Page(){const d=findDeck('maths','real-numbers');if(!d)notFound();return <FlashcardDeck deck={d} subjectName={AREA_NAMES.maths}/>;}
