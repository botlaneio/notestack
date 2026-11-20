import type {Metadata} from 'next';
import {FlashcardHub} from '@/components/flashcard-hub';
import {deckSummaries} from '@/lib/flashcards';
export const metadata:Metadata={title:'Flashcards for every chapter',description:'Quick revision flashcards for Karnataka SSLC Class 10 Maths, Science and Social Science: key ideas, formulas, dates and questions from every chapter. The first deck in each subject is free.'};
// Only titles and card counts reach this public page.
export default function Page(){return <FlashcardHub decks={deckSummaries()}/>;}
