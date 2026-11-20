// Flashcard decks, generated from each chapter's guided-lesson content (summary points and
// checkpoint questions). Server-side only: import this from page files (server components),
// never from a 'use client' component, so card text stays inside each chapter's locked page.
import {realNumbers, additionalStudyUnits, type Chapter} from './maths-chapters.ts';
import {scienceChapters} from './science-chapters.ts';
import {historyChapters} from './history-chapters.ts';
import type {LessonStep} from './real-numbers.ts';

export type DeckArea = 'maths' | 'science' | 'social-science';

export interface Flashcard {
  id: string;
  kind: 'key' | 'question';
  /** Short label shown above the prompt, e.g. the lesson step it came from. */
  topic: string;
  front: string;
  /** A sentence of set-up from the lesson when the question cannot stand alone. */
  context?: string;
  /** Answer choices, shown on the front only for "which of these" style questions. */
  choices?: string[];
  back: string;
  /** Why the answer is right, from the lesson's own explanation. */
  detail?: string;
}

export interface Deck {
  area: DeckArea;
  slug: string;
  number: number;
  code?: string;
  title: string;
  discipline?: string;
  path: string;
  free: boolean;
  cards: Flashcard[];
}

/** What the public deck list may show: titles and counts, never card text. */
export interface DeckSummary {area: DeckArea; slug: string; number: number; code?: string; title: string; discipline?: string; path: string; free: boolean; count: number}

/** Matches FREE_CHAPTERS in cloudflare/src/auth.ts (a test keeps them in step). */
export const FREE_DECKS: Record<DeckArea, string> = {
  maths: 'real-numbers',
  science: 'chemical-reactions-and-equations',
  'social-science': 'the-advent-of-europeans-to-india',
};

export const AREA_NAMES: Record<DeckArea, string> = {maths: 'Maths', science: 'Science', 'social-science': 'Social Science'};

const PRAISE = /^(?:correct|yes|exactly|right|that[’']s (?:it|right)|good|great|nice|well done|perfect|spot on)\b[.!,]?\s*/i;
const FILLER = /^(?:use the same reasoning on a fresh question|try (?:it|this) (?:again|yourself)|keep going)\.?$/i;
const INTERACTIVE = /\b(?:explore|explorer|below|above|drag|slider|tap|click|builder|try (?:it|this)|use the (?:tool|model|diagram)|move the)\b/i;
const NEEDS_CONTEXT = /\b(?:that|this|these|those|such|the same|shown|above|below|here)\b/i;
const NEEDS_CHOICES = /^which\b|\b(?:of these|the following|which (?:one|statement|option|pair|sequence|expression|number|equation))\b/i;

const clean = (text: string) => text.replace(/\s+/g, ' ').trim();
const sentences = (text: string) => clean(text).match(/[^.!?]+(?:[.!?]+(?=\s|$)|$)/g)?.map(s => s.trim()).filter(Boolean) ?? [];

/** Up to `max` characters, cut at a sentence boundary when possible. */
export function clip(text: string, max: number): string {
  const value = clean(text);
  if (value.length <= max) return value;
  let out = '';
  for (const s of sentences(value)) {
    if ((out + ' ' + s).trim().length > max) break;
    out = (out + ' ' + s).trim();
  }
  if (out) return out;
  const cut = value.slice(0, max - 1);
  return cut.slice(0, Math.max(cut.lastIndexOf(' '), max * 0.6)).replace(/[,;:\s]+$/, '') + '…';
}

const same = (a: string, b: string) => clean(a).toLowerCase().replace(/[.\s]+$/, '') === clean(b).toLowerCase().replace(/[.\s]+$/, '');

function explanation(step: LessonStep, answer: string): string | undefined {
  const parts = sentences((step.feedback[step.correct] ?? '').replace(PRAISE, '')).filter(s => !FILLER.test(s));
  let text = parts.join(' ');
  if (!text || same(text, answer)) text = step.simple;
  if (!text || same(text, answer)) return undefined;
  return clip(text, 260);
}

function context(step: LessonStep): string | undefined {
  if (step.question.length >= 45 && !NEEDS_CONTEXT.test(step.question)) return undefined;
  const lines = sentences(step.intro).filter(s => !INTERACTIVE.test(s));
  return lines.length ? clip(lines.join(' '), 200) : undefined;
}

function questionCard(step: LessonStep, chapterTitle: string): Flashcard | null {
  const answer = clean(step.options[step.correct] ?? '');
  if (!answer || !step.question.trim()) return null;
  const card: Flashcard = {id: `q-${step.id}`, kind: 'question', topic: clean(step.title) || chapterTitle, front: clean(step.question), back: answer};
  const why = explanation(step, answer);
  if (why) card.detail = why;
  const ctx = context(step);
  if (ctx) card.context = ctx;
  if (NEEDS_CHOICES.test(step.question) && step.options.length > 1 && step.options.every(o => o.length <= 90)) card.choices = step.options.map(clean);
  return card;
}

/** One deck for one chapter: key ideas first, then a card for every guided checkpoint. */
export function buildDeck(chapter: Chapter, area: DeckArea): Deck {
  const cards: Flashcard[] = [];
  const fronts = new Set<string>();
  const add = (card: Flashcard | null) => {
    if (!card) return;
    const key = (card.front + '|' + (card.context ?? '')).toLowerCase();
    if (fronts.has(key)) return;
    fronts.add(key);
    cards.push(card);
  };
  chapter.summary.forEach(([term, meaning], i) => {
    if (term?.trim() && meaning?.trim()) add({id: `k-${i + 1}`, kind: 'key', topic: 'Key idea', front: clean(term), back: clean(meaning)});
  });
  for (const step of chapter.steps) add(questionCard(step, chapter.title));
  return {
    area, slug: chapter.slug, number: chapter.number, ...(chapter.code ? {code: chapter.code} : {}), title: chapter.title,
    ...(chapter.discipline ? {discipline: chapter.discipline} : {}),
    path: `/learn/${area}/${chapter.slug}/flashcards/`, free: FREE_DECKS[area] === chapter.slug, cards,
  };
}

const SOURCES: [DeckArea, Chapter[]][] = [
  ['maths', [realNumbers, ...additionalStudyUnits]],
  ['science', scienceChapters],
  ['social-science', historyChapters],
];

let cache: Deck[] | null = null;
export function allDecks(): Deck[] {
  cache ??= SOURCES.flatMap(([area, chapters]) => chapters.map(chapter => buildDeck(chapter, area)));
  return cache;
}

export function findDeck(area: DeckArea, slug: string): Deck | undefined {
  return allDecks().find(d => d.area === area && d.slug === slug);
}

export function deckSlugs(area: DeckArea): {chapter: string}[] {
  return allDecks().filter(d => d.area === area).map(d => ({chapter: d.slug}));
}

export function deckSummaries(): DeckSummary[] {
  return allDecks().map(({cards, ...rest}) => ({...rest, count: cards.length}));
}
