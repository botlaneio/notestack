import type {Metadata} from 'next';
import StudyDesk from '@/components/study-desk-view';

export const metadata: Metadata = {
  title: {absolute: 'Notestack — Study desk'},
  description: 'Create flashcard decks, take practice quizzes, and track your study progress with Notestack.',
  alternates: {canonical: 'https://notestack.shop/'},
};

export default function HomePage() {
  return <StudyDesk/>;
}
