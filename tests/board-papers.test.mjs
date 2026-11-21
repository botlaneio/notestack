// Past KSEAB board papers: every paper adds up, every tag points at a real chapter, and the
// questions reach students only through locked pages, never through shared JavaScript.
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {allPapers, chapterBoardQuestions, chapterCounts, paperPath, paperSummaries, papersFor, UNPUBLISHED_YEARS} from '../src/lib/board-papers.ts';
import {allDecks} from '../src/lib/flashcards.ts';
import {lessonPath} from '../cloudflare/src/auth.ts';
import {chapterPath} from '../src/lib/auth-client.ts';

const files = dir => fs.readdirSync(dir, {withFileTypes: true}).flatMap(e => e.isDirectory() ? files(path.join(dir, e.name)) : [path.join(dir, e.name)]);
const chapterSlugs = area => new Set(allDecks().filter(d => d.area === area).map(d => d.slug));

test('nine official papers: 2022, 2024 and 2025 for each subject; 2023 and 2026 are not published', () => {
  const papers = allPapers();
  assert.equal(papers.length, 9);
  for (const area of ['maths', 'science', 'social-science']) assert.deepEqual(papersFor(area).map(p => p.year), [2025, 2024, 2022]);
  assert.deepEqual(UNPUBLISHED_YEARS, [2023, 2026]);
  assert.equal(new Set(papers.map(p => p.id)).size, 9);
  for (const p of papers) {
    assert.match(p.source, /^https:\/\/(kseab|kseeb)\.karnataka\.gov\.in\//, `${p.id} must come from KSEAB`);
    assert.match(p.date, new RegExp(`^${p.year}-\\d\\d-\\d\\d$`));
  }
});

test('each paper has 38 questions worth 80 marks, and each section adds up to its printed total', () => {
  for (const p of allPapers()) {
    assert.equal(p.questions.length, 38, p.id);
    assert.deepEqual(p.questions.map(q => q.n), Array.from({length: 38}, (_, i) => String(i + 1)), `${p.id} numbering`);
    assert.equal(p.questions.reduce((n, q) => n + q.marks, 0), p.maxMarks, `${p.id} total`);
    assert.equal(p.maxMarks, 80);
    for (const s of p.sections) {
      const total = Number(s.note.match(/=\s*(\d+)\s*$/)?.[1]);
      const sum = p.questions.filter(q => q.sec === s.id).reduce((n, q) => n + q.marks, 0);
      assert.equal(sum, total, `${p.id} section ${s.id}`);
    }
    for (const q of p.questions) assert.ok(p.sections.some(s => s.id === q.sec), `${p.id} Q${q.n} has an unknown section`);
  }
});

test('every question and OR choice has a worked answer and a valid chapter tag', () => {
  for (const p of allPapers()) {
    const slugs = chapterSlugs(p.subject);
    for (const q of p.questions) {
      for (const part of q.or ? [q, q.or] : [q]) {
        const where = `${p.id} Q${q.n}${part === q ? '' : ' OR'}`;
        assert.ok(part.q.trim(), `${where} has no question`);
        assert.ok(part.ans.trim(), `${where} has no answer`);
        assert.ok(part.sol.length > 0 && part.sol.every(s => s.trim()), `${where} has no worked answer`);
        if (part.ch === null) assert.ok(part.topic || part.syllabusNote || q.syllabusNote, `${where} is untagged without saying why`);
        else assert.ok(slugs.has(part.ch), `${where} is tagged to unknown chapter ${part.ch}`);
        if (part.opts) {
          assert.equal(part.opts.length, 4, `${where} should have four choices`);
          assert.ok('ABCD'.includes(part.ans) && part.ans.length === 1, `${where}: answer ${part.ans} is not a choice letter`);
        }
      }
    }
  }
});

test('chapter lists hold tagged questions only, skip removed topics, and cover most chapters', () => {
  const items = chapterBoardQuestions('maths', 'real-numbers');
  assert.ok(items.length >= 3);
  assert.ok(items.every(i => i.part.ch === 'real-numbers' && !i.part.syllabusNote));
  assert.deepEqual([...new Set(items.map(i => i.year))], [...new Set(items.map(i => i.year))].sort((a, b) => b - a), 'newest paper first');
  for (const area of ['maths', 'science', 'social-science']) {
    const counts = chapterCounts(area);
    const covered = Object.keys(counts).length;
    assert.ok(covered >= chapterSlugs(area).size * 0.7, `${area}: only ${covered} chapters have board questions`);
    for (const [slug, n] of Object.entries(counts)) assert.equal(chapterBoardQuestions(area, slug).length, n);
  }
});

test('paper and chapter pages sit under the lesson lock; only the free chapters are open', () => {
  for (const p of allPapers()) {
    const lesson = lessonPath(paperPath(p));
    assert.ok(lesson, `${paperPath(p)} is not covered by the lesson lock`);
    assert.equal(lesson.free, false, `${p.id} must not be free`);
    assert.equal(chapterPath(paperPath(p)), null, 'a paper is not a chapter for progress tracking');
  }
  for (const d of allDecks()) {
    const lesson = lessonPath(`/learn/${d.area}/${d.slug}/board/`);
    assert.equal(lesson.free, d.free, `${d.slug} board questions should match the chapter lock`);
  }
});

test('the public paper list carries titles and counts, not questions', () => {
  const [first] = paperSummaries();
  assert.equal('questions' in first && typeof first.questions, 'number');
  assert.equal('sections' in first, false);
  const page = fs.readFileSync('src/app/board-papers/page.tsx', 'utf8');
  assert.doesNotMatch(page, /chapterBoardQuestions|findPaper|allPapers/, 'the public page must not load questions');
});

test('browser components never import board paper data', () => {
  const offenders = [];
  for (const file of files('src').filter(f => /\.(tsx|jsx|ts|js)$/.test(f))) {
    const text = fs.readFileSync(file, 'utf8');
    if (!/^\s*['"]use client['"]/.test(text)) continue;
    for (const m of text.matchAll(/^import\s+(?!type\b)[^'"]*from\s*['"]([^'"]+)['"]/gm)) {
      if (/(^|\/)lib\/board-papers(\.ts)?$|board-papers\/.*\.json$|board-chapter-page/.test(m[1])) offenders.push(`${file} imports ${m[1]}`);
    }
  }
  assert.deepEqual(offenders, [], 'Pass paper data from the page (a server component) as props instead.');
});
