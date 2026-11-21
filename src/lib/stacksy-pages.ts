// The pages Stacksy may open during a voice call, and whether the student can open them.
// Checking access here (instead of letting the lesson gate redirect) keeps the page change
// inside the app, so the voice call is not cut. Only erasable TypeScript syntax: tests run it in Node.

export const CHAPTERS: Record<string, string[]> = {
  maths: ['applications-of-trigonometry', 'areas-related-to-circles', 'arithmetic-progressions', 'circles', 'coordinate-geometry', 'introduction-to-trigonometry', 'linear-equations', 'mathematical-modelling', 'polynomials', 'probability', 'proofs-in-mathematics', 'quadratic-equations', 'real-numbers', 'statistics', 'surface-areas-and-volumes', 'triangles'],
  science: ['acids-bases-and-salts', 'carbon-and-its-compounds', 'chemical-reactions-and-equations', 'control-and-coordination', 'electricity', 'heredity', 'how-do-organisms-reproduce', 'human-eye-and-the-colourful-world', 'life-processes', 'light-reflection-and-refraction', 'magnetic-effects-of-electric-current', 'metals-and-non-metals'],
  'social-science': ['bank-transactions', 'challenges-of-india-and-their-remedies', 'collective-behaviour-and-protests', 'consumer-education-and-protection', 'economy-and-government', 'entrepreneurship', 'india-after-independence', 'india-forest-resources', 'india-geographical-position-and-physical-features', 'india-land-use-and-agriculture', 'india-major-industries', 'india-mineral-and-power-resources', 'india-natural-disasters', 'india-seasons', 'india-soils', 'india-transport-and-communication', 'india-water-resources', 'indias-foreign-policy-and-global-challenges', 'opposition-to-british-rule-in-karnataka-and-wodeyars-of-mysore', 'public-administration-an-introduction', 'public-finance-and-budget', 'rural-development', 'social-and-religious-reform-movements', 'social-challenges', 'social-stratification', 'the-advent-of-europeans-to-india', 'the-extension-of-the-british-rule', 'the-first-war-of-indian-independence-1857', 'the-freedom-struggle', 'the-impact-of-the-british-rule-in-india', 'work-and-economic-life', 'world-organisations', 'world-wars-and-indias-role'],
};

/** Same as FREE_CHAPTERS in cloudflare/src/auth.ts: the first chapter of each subject is open to everyone. */
export const FREE_CHAPTERS: Record<string, string> = {
  maths: 'real-numbers',
  science: 'chemical-reactions-and-equations',
  'social-science': 'the-advent-of-europeans-to-india',
};

/** /learn/<area>/ → the product that unlocks it. */
export const AREA_PRODUCT: Record<string, string> = {maths: 'mathematics', science: 'science', 'social-science': 'social-science'};

/** Pages outside /learn/ that Stacksy may open. */
export const SITE_PAGES = ['/', '/flashcards/', '/account/', '/unlock/', '/sign-in/', '/sign-up/'];

export type Navigation =
  | {ok: true; path: string}
  | {ok: false; reason: 'unknown' | 'locked'; message: string};

/** Can this student open this chapter? `owned` is the session's entitlements, or null when signed out. */
export function canOpenChapter(area: string, chapter: string, owned: string[] | null): boolean {
  if (FREE_CHAPTERS[area] === chapter) return true;
  if (!owned) return false;
  return owned.includes(AREA_PRODUCT[area]) || owned.includes('core-collection');
}

/** Turns what the voice agent asked for into a safe in-app address, or explains why not. */
export function resolveNavigation(requested: unknown, owned: string[] | null): Navigation {
  const raw = typeof requested === 'string' ? requested.trim().toLowerCase() : '';
  if (!raw) return {ok: false, reason: 'unknown', message: 'No page was given. Use one of the paths from your instructions.'};
  // Accept "/learn/maths/polynomials", "learn/maths/polynomials/", or a full notestack.shop link.
  const path = ('/' + raw.replace(/^https?:\/\/(www\.)?notestack\.shop/, '').replace(/[?#].*$/, '').replace(/^\/+/, '')).replace(/\/+$/, '') + '/';
  if (SITE_PAGES.includes(path)) return {ok: true, path};
  const m = path.match(/^\/learn\/(maths|science|social-science)\/(?:([a-z0-9-]+)\/)?$/);
  if (!m) return {ok: false, reason: 'unknown', message: `There is no page at ${path}. Use one of the paths from your instructions.`};
  const [, area, chapter] = m;
  if (!chapter) return {ok: true, path};
  if (!CHAPTERS[area].includes(chapter)) return {ok: false, reason: 'unknown', message: `There is no chapter "${chapter}" in ${area}. Use one of the chapter paths from your instructions.`};
  if (!canOpenChapter(area, chapter, owned)) {
    return {ok: false, reason: 'locked', message: owned
      ? 'This chapter is locked: the student has not unlocked this subject yet. The page was not opened.'
      : 'This chapter is locked: the student is not signed in and only the first chapter of each subject is free. The page was not opened.'};
  }
  return {ok: true, path};
}

/** "Polynomials — guided chapter | NoteStack" → "Polynomials". */
export function cleanTitle(title: string): string {
  const name = title.split(' | ')[0].split(' — ')[0].trim();
  return name && name !== 'NoteStack' ? name : 'Home';
}
