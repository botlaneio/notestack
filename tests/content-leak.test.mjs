// Lesson text must reach students only through each chapter's own (locked) page, never the
// shared JavaScript that every visitor downloads. Browser-side ("use client") components may
// not import chapter collections or guide/practice data; pages pass what a component needs.
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const FORBIDDEN = [
  /(^|\/)lib\/[^'"]*-(guides|practice)\.json$/,
  /(^|\/)lib\/[^'"]*practice-data\.json$/,
  /(^|\/)lib\/(maths-chapters[^'"]*|science-chapters|history-chapters|chapter-practice|chapter-expansions|maths-appendices|real-numbers-expansion)(\.ts)?$/,
  /(^|\/)lib\/freedom-struggle-source-details\.json$/,
];

function files(dir) {
  return fs.readdirSync(dir, {withFileTypes: true}).flatMap(e => e.isDirectory() ? files(path.join(dir, e.name)) : [path.join(dir, e.name)]);
}

test('browser components do not import lesson collections or guide/practice data', () => {
  const offenders = [];
  for (const file of files('src').filter(f => /\.(tsx|jsx|ts|js)$/.test(f))) {
    const text = fs.readFileSync(file, 'utf8');
    if (!/^\s*['"]use client['"]/.test(text)) continue;
    for (const m of text.matchAll(/^import\s+(?!type\b)[^'"]*from\s*['"]([^'"]+)['"]/gm)) {
      if (FORBIDDEN.some(r => r.test(m[1]))) offenders.push(`${file} imports ${m[1]}`);
    }
  }
  assert.deepEqual(offenders, [], 'Pass this data from the page (a server component) as props instead.');
});

test('chapter list summaries keep only titles and progress fields', async () => {
  const {summariseChapters} = await import('../src/lib/chapter-summary.ts');
  const {scienceChapters, scienceWorkbooks} = await import('../src/lib/science-chapters.ts');
  const [first] = summariseChapters(scienceChapters, scienceWorkbooks);
  assert.equal(first.slug, scienceChapters[0].slug);
  assert.equal(first.tasks, scienceWorkbooks[0].tasks.length);
  assert.deepEqual(Object.keys(first.steps[0]).sort(), ['correct', 'id', 'options']);
  assert.ok(first.steps[0].options.every(o => o === ''));
  assert.equal('summary' in first, false);
});
