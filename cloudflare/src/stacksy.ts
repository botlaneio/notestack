// Stacksy, the NoteStack study assistant: POST /api/stacksy/chat answers with Google Gemini.
// The API key stays in the Worker (GEMINI_API_KEY secret); the browser only ever talks to /api/stacksy/chat.
// Only erasable TypeScript syntax is used so Node can run this file directly in tests.
import type {D1Database} from './auth.ts';
import type {FetchLike} from './email.ts';

export interface StacksyEnv {GEMINI_API_KEY?: string; GEMINI_MODEL?: string}

/** "gemini-flash-latest" always points at Google's current Flash model, so retirements do not break Stacksy. */
export const DEFAULT_MODEL = 'gemini-flash-latest';
/** Messages per day. Visitors are counted per network address, signed-in students per account. */
export const DAILY_LIMITS = {guest: 10, student: 40, member: 150} as const;
export const MAX_HISTORY = 12;
export const MAX_MESSAGE_CHARS = 1500;

export type StacksyTier = keyof typeof DAILY_LIMITS | 'admin';
export interface ChatTurn {role: 'user' | 'stacksy'; text: string}
export interface PageContext {path: string; title: string}

export const SYSTEM_PROMPT = `You are Stacksy, the friendly study buddy inside NoteStack (notestack.shop), an online course for Karnataka SSLC Class 10 students (English medium, Karnataka state board textbooks) in Mathematics, Science and Social Science.

Who you talk to: 15 and 16 year old students preparing for the SSLC board exams. The 2027 exams start on 25 March (Science), then 30 March (Mathematics) and 5 April (Social Science).

How you talk:
- Like a cheerful, patient senior student, never like a strict teacher. Never make a student feel slow.
- Keep answers short: usually 2 to 6 sentences or a short numbered list. Offer to go deeper instead of writing long essays.
- Teach, do not just hand over answers. For a problem, show the method step by step and end with a small check question or "want to try the next one?".
- Use simple English. Explain any technical word the first time you use it.
- Formatting: plain text only. You may use **bold** for key terms, "- " bullet lines and "1. " numbered lines. No tables, no headings, no LaTeX: write maths like x² + 3x − 4 = 0, √2, ½, π, θ.
- Stick to the Karnataka SSLC Class 10 syllabus. When a method differs between boards, use the one Karnataka textbooks use.
- For "important questions", explain the kind of questions that are commonly asked and why; never claim to know what will come in the exam.
- Never invent textbook page numbers, past paper years or marks. If you are not sure of a fact, say so.

Boundaries:
- If asked about something unrelated to studies, answer in one friendly line and steer back to studying.
- Never ask for or store personal details such as phone numbers, addresses or passwords.
- You are an AI, not a human; say so if asked.
- If a student says they feel very stressed, hopeless or unsafe, be kind, suggest they talk to a parent, teacher or another adult they trust, and share Tele-MANAS, India's free mental health helpline: 14416. Do not try to be their counsellor.
- For questions about NoteStack accounts, payments or access, tell them to use the Account page or contact NoteStack support.`;

function clip(value: unknown, max: number): string {
  return typeof value === 'string' ? value.replace(/\u0000/g, '').trim().slice(0, max) : '';
}

/** Keeps the last few well-formed turns, ending with the student's question. */
export function cleanHistory(input: unknown): ChatTurn[] {
  if (!Array.isArray(input)) return [];
  const turns: ChatTurn[] = [];
  for (const item of input.slice(-MAX_HISTORY)) {
    if (!item || typeof item !== 'object') continue;
    const role = (item as {role?: unknown}).role === 'stacksy' ? 'stacksy' : (item as {role?: unknown}).role === 'user' ? 'user' : null;
    const text = clip((item as {text?: unknown}).text, MAX_MESSAGE_CHARS);
    if (role && text) turns.push({role, text});
  }
  // Gemini needs the conversation to start with the student; drop a leading greeting.
  while (turns.length && turns[0].role !== 'user') turns.shift();
  return turns.length && turns[turns.length - 1].role === 'user' ? turns : [];
}

export function cleanPage(input: unknown): PageContext | null {
  if (!input || typeof input !== 'object') return null;
  const path = clip((input as {path?: unknown}).path, 200);
  const title = clip((input as {title?: unknown}).title, 160);
  return path.startsWith('/') ? {path, title} : null;
}

export function systemFor(page: PageContext | null): string {
  if (!page) return SYSTEM_PROMPT;
  const where = page.path.startsWith('/learn/')
    ? `The student is on this NoteStack lesson page: "${page.title}" (${page.path}). When their question is vague, assume it is about this chapter.`
    : `The student is on the NoteStack page "${page.title}" (${page.path}).`;
  return `${SYSTEM_PROMPT}\n\nContext: ${where}`;
}

/** UTC day, e.g. 2026-11-20. Limits reset at 5:30 AM in India. */
function dayOf(now: number): string {
  return new Date(now).toISOString().slice(0, 10);
}

let tableReady: WeakSet<object> = new WeakSet();
async function ensureTable(db: D1Database) {
  if (tableReady.has(db)) return;
  await db.prepare(`CREATE TABLE IF NOT EXISTS stacksy_usage (
    who TEXT NOT NULL,
    day TEXT NOT NULL,
    count INTEGER NOT NULL DEFAULT 0,
    PRIMARY KEY (who, day)
  )`).run();
  tableReady.add(db);
}

/** Counts one message. Returns how many are left today, or null when the limit is used up. */
export async function takeMessage(db: D1Database, who: string, tier: StacksyTier, now: number): Promise<{left: number; limit: number} | null> {
  if (tier === 'admin') return {left: 999, limit: 999};
  await ensureTable(db);
  const limit = DAILY_LIMITS[tier];
  const day = dayOf(now);
  const row = await db.prepare('SELECT count FROM stacksy_usage WHERE who = ? AND day = ?').bind(who, day).first<{count: number}>();
  const used = row?.count ?? 0;
  if (used >= limit) return null;
  await db.prepare('INSERT INTO stacksy_usage (who, day, count) VALUES (?, ?, 1) ON CONFLICT(who, day) DO UPDATE SET count = count + 1').bind(who, day).run();
  return {left: limit - used - 1, limit};
}

/** Gives a message back when Gemini failed, so the student is not charged for an error. */
async function refundMessage(db: D1Database, who: string, tier: StacksyTier, now: number) {
  if (tier === 'admin') return;
  await db.prepare('UPDATE stacksy_usage SET count = MAX(0, count - 1) WHERE who = ? AND day = ?').bind(who, dayOf(now)).run();
}

export interface AskResult {ok: true; text: string}
export interface AskFailure {ok: false; reason: 'blocked' | 'upstream'}

export async function askGemini(env: StacksyEnv, turns: ChatTurn[], page: PageContext | null, fetcher: FetchLike = fetch): Promise<AskResult | AskFailure> {
  const model = (env.GEMINI_MODEL || DEFAULT_MODEL).replace(/[^a-z0-9.\-]/gi, '');
  const response = await fetcher(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`, {
    method: 'POST',
    headers: {'content-type': 'application/json', 'x-goog-api-key': env.GEMINI_API_KEY ?? ''},
    body: JSON.stringify({
      systemInstruction: {parts: [{text: systemFor(page)}]},
      contents: turns.map(t => ({role: t.role === 'user' ? 'user' : 'model', parts: [{text: t.text}]})),
      generationConfig: {temperature: 0.6, maxOutputTokens: 1024},
      safetySettings: [
        {category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_LOW_AND_ABOVE'},
        {category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_LOW_AND_ABOVE'},
        {category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_LOW_AND_ABOVE'},
        {category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE'},
      ],
    }),
  });
  if (!response.ok) {
    console.error('stacksy_upstream', response.status, (await response.text().catch(() => '')).slice(0, 500));
    return {ok: false, reason: 'upstream'};
  }
  const data = await response.json().catch(() => null) as {promptFeedback?: {blockReason?: string}; candidates?: {finishReason?: string; content?: {parts?: {text?: string; thought?: boolean}[]}}[]} | null;
  if (data?.promptFeedback?.blockReason) return {ok: false, reason: 'blocked'};
  const candidate = data?.candidates?.[0];
  const text = (candidate?.content?.parts ?? []).filter(p => !p.thought).map(p => p.text ?? '').join('').trim();
  if (!text) return {ok: false, reason: candidate?.finishReason === 'SAFETY' ? 'blocked' : 'upstream'};
  return {ok: true, text};
}

export const STACKSY_MESSAGES = {
  unavailable: 'Stacksy is resting right now. Please try again a little later.',
  empty: 'Type a question for Stacksy first.',
  guest_limit: `That's all ${DAILY_LIMITS.guest} free questions for today. Sign in (it's free) to keep chatting with Stacksy.`,
  student_limit: `You've asked ${DAILY_LIMITS.student} questions today. Unlock a subject for more, or come back tomorrow.`,
  member_limit: `You've reached today's ${DAILY_LIMITS.member} questions. Take a break and come back tomorrow!`,
  blocked: "Let's keep things about studies. Ask me anything from Maths, Science or Social Science!",
  upstream: "Hmm, my brain card got stuck. Please try sending that again.",
} as const;

export interface StacksyRequest {
  db: D1Database;
  env: StacksyEnv;
  input: Record<string, unknown>;
  who: string;
  tier: StacksyTier;
  now: number;
  fetcher?: FetchLike;
}

/** Runs one chat turn and returns the HTTP status and JSON body. */
export async function stacksyChat(req: StacksyRequest): Promise<{status: number; body: Record<string, unknown>}> {
  if (!req.env.GEMINI_API_KEY) return {status: 503, body: {code: 'unavailable', message: STACKSY_MESSAGES.unavailable}};
  const turns = cleanHistory(req.input.messages);
  if (!turns.length) return {status: 400, body: {code: 'empty', message: STACKSY_MESSAGES.empty}};
  const page = cleanPage(req.input.page);
  const quota = await takeMessage(req.db, req.who, req.tier, req.now);
  if (!quota) {
    const code = req.tier === 'guest' ? 'guest_limit' : req.tier === 'student' ? 'student_limit' : 'member_limit';
    return {status: 429, body: {code, message: STACKSY_MESSAGES[code]}};
  }
  let result: AskResult | AskFailure;
  try {
    result = await askGemini(req.env, turns, page, req.fetcher);
  } catch (error) {
    console.error('stacksy_fetch_error', error);
    result = {ok: false, reason: 'upstream'};
  }
  if (!result.ok) {
    if (result.reason === 'upstream') await refundMessage(req.db, req.who, req.tier, req.now);
    return {status: result.reason === 'blocked' ? 200 : 502, body: {code: result.reason, message: STACKSY_MESSAGES[result.reason], reply: result.reason === 'blocked' ? STACKSY_MESSAGES.blocked : undefined}};
  }
  return {status: 200, body: {reply: result.text, left: quota.left, limit: quota.limit}};
}

export function resetStacksyTableCache() {tableReady = new WeakSet();}
