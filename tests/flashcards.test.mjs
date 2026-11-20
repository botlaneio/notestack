// Flashcard decks are generated from the guided lessons. Their text must reach students only
// through each chapter's own (locked) flashcards page, never through shared JavaScript.
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {allDecks, buildDeck, clip, deckSummaries, FREE_DECKS} from '../src/lib/flashcards.ts';
import {FREE_CHAPTERS, lessonPath} from '../cloudflare/src/auth.ts';

const files = dir => fs.readdirSync(dir, {withFileTypes: true}).flatMap(e => e.isDirectory() ? files(path.join(dir, e.name)) : [path.join(dir, e.name)]);

test('every chapter has a deck with usable cards', () => {
  const decks = allDecks();
  assert.equal(decks.length, 61);
  for (const area of ['maths', 'science', 'social-science']) assert.ok(decks.some(d => d.area === area));
  for (const deck of decks) {
    assert.ok(deck.cards.length >= 10, `${deck.slug} has only ${deck.cards.length} cards`);
    assert.equal(new Set(deck.cards.map(c => c.id)).size, deck.cards.length, `${deck.slug} repeats a card id`);
    for (const card of deck.cards) {
      assert.match(card.id, /^[a-z0-9-]{1,80}$/, `${deck.slug}: card id ${card.id} would be rejected by the API`);
      assert.ok(card.front.trim() && card.back.trim(), `${deck.slug}/${card.id} is empty`);
      if (card.choices) assert.ok(card.choices.includes(card.back), `${deck.slug}/${card.id}: answer missing from choices`);
      assert.ok(!card.detail || card.detail.length <= 261);
      assert.ok(!/^(correct|yes|exactly)[.!,]/i.test(card.detail ?? ''), `${deck.slug}/${card.id} starts with praise`);
    }
  }
});

test('deck pages sit under the lesson lock, and the free decks match the free chapters', () => {
  assert.deepEqual(FREE_DECKS, FREE_CHAPTERS);
  for (const deck of allDecks()) {
    const lesson = lessonPath(deck.path);
    assert.ok(lesson, `${deck.path} is not covered by the lesson lock`);
    assert.equal(lesson.chapter, deck.slug);
    assert.equal(lesson.free, deck.free);
  }
  assert.equal(allDecks().filter(d => d.free).length, 3);
});

test('the public deck list carries titles and counts, not card text', () => {
  const [first] = deckSummaries();
  assert.equal('cards' in first, false);
  assert.deepEqual(Object.keys(first).sort(), ['area', 'count', 'free', 'number', 'path', 'slug', 'title']);
});

test('browser components never import the flashcards module or lesson data directly', () => {
  const offenders = [];
  for (const file of files('src').filter(f => /\.(tsx|jsx|ts|js)$/.test(f))) {
    const text = fs.readFileSync(file, 'utf8');
    if (!/^\s*['"]use client['"]/.test(text)) continue;
    for (const m of text.matchAll(/^import\s+(?!type\b)[^'"]*from\s*['"]([^'"]+)['"]/gm)) {
      if (/(^|\/)lib\/flashcards(\.ts)?$/.test(m[1])) offenders.push(`${file} imports ${m[1]}`);
    }
  }
  assert.deepEqual(offenders, [], 'Pass deck data from the page (a server component) as props instead.');
});

test('cards: praise is dropped, choices appear only when needed, and context fills in short questions', () => {
  const chapter = {number: 9, slug: 'demo', title: 'Demo', sections: ['One'], challenge: '', summary: [['HCF', 'Greatest common factor.']], steps: [
    {id: 'a', section: 0, title: 'Pick one', intro: 'Primes have two factors. Explore the tool below.', simple: 'Two factors.', example: [], question: 'Which of these is prime?', options: ['1', '21', '13'], correct: 2, feedback: ['', '', 'Yes. 13 has only 1 and 13 as factors.'], hints: []},
    {id: 'b', section: 0, title: 'Short', intro: 'Bells ring every 12 and 18 minutes.', simple: 'Use the LCM.', example: [], question: 'When do they meet?', options: ['36 minutes', '6 minutes'], correct: 0, feedback: ['Correct. Use the same reasoning on a fresh question.', ''], hints: []},
  ]};
  const deck = buildDeck(chapter, 'maths');
  assert.deepEqual(deck.cards.map(c => c.id), ['k-1', 'q-a', 'q-b']);
  const [, a, b] = deck.cards;
  assert.deepEqual(a.choices, ['1', '21', '13']);
  assert.equal(a.back, '13');
  assert.equal(a.detail, '13 has only 1 and 13 as factors.');
  assert.equal(a.context, 'Primes have two factors.');
  assert.equal(b.choices, undefined);
  assert.equal(b.context, 'Bells ring every 12 and 18 minutes.');
  assert.equal(b.detail, 'Use the LCM.');
  assert.equal(clip('One. Two three four five.', 10), 'One.');
});
