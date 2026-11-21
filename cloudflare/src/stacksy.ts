// Stacksy, the NoteStack voice study buddy. The voice agent lives on ElevenLabs; this Worker route only
// hands the browser a short-lived conversation token, so the ElevenLabs API key never leaves the Worker.
// POST /api/stacksy/voice -> {token, left, limit}. Each token starts one voice call (at most 10 minutes,
// set on the agent). Only erasable TypeScript syntax is used so Node can run this file directly in tests.
import type {D1Database} from './auth.ts';
import type {FetchLike} from './email.ts';

export interface StacksyEnv {ELEVENLABS_API_KEY?: string; STACKSY_AGENT_ID?: string}

/** Voice calls per day. Visitors are counted per network address, signed-in students per account. */
export const DAILY_LIMITS = {guest: 2, student: 6, member: 20} as const;

export type StacksyTier = keyof typeof DAILY_LIMITS | 'admin';

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

/** Counts one call. Returns how many are left today, or null when the limit is used up. */
export async function takeCall(db: D1Database, who: string, tier: StacksyTier, now: number): Promise<{left: number; limit: number} | null> {
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

/** Gives a call back when ElevenLabs failed, so the student is not charged for an error. */
async function refundCall(db: D1Database, who: string, tier: StacksyTier, now: number) {
  if (tier === 'admin') return;
  await db.prepare('UPDATE stacksy_usage SET count = MAX(0, count - 1) WHERE who = ? AND day = ?').bind(who, dayOf(now)).run();
}

export const STACKSY_MESSAGES = {
  unavailable: 'Stacksy is resting right now. Please try again a little later.',
  guest_limit: `That's your ${DAILY_LIMITS.guest} free chats with Stacksy for today. Sign in (it's free) to talk more.`,
  student_limit: `You've had ${DAILY_LIMITS.student} chats with Stacksy today. Unlock a subject for more, or come back tomorrow.`,
  member_limit: `You've had ${DAILY_LIMITS.member} chats with Stacksy today. Take a break and come back tomorrow!`,
  upstream: "Stacksy couldn't pick up just now. Please tap again in a moment.",
} as const;

/** Asks ElevenLabs for a single-use WebRTC conversation token for the Stacksy agent. */
export async function conversationToken(env: StacksyEnv, fetcher: FetchLike = fetch): Promise<{ok: true; token: string} | {ok: false; detail: string}> {
  const agent = encodeURIComponent(env.STACKSY_AGENT_ID ?? '');
  const response = await fetcher(`https://api.elevenlabs.io/v1/convai/conversation/token?agent_id=${agent}`, {
    method: 'GET',
    headers: {'xi-api-key': env.ELEVENLABS_API_KEY ?? ''},
  });
  if (!response.ok) {
    console.error('stacksy_upstream', response.status, (await response.text().catch(() => '')).slice(0, 500));
    return {ok: false, detail: `elevenlabs_${response.status}`};
  }
  const data = await response.json().catch(() => null) as {token?: unknown} | null;
  return typeof data?.token === 'string' && data.token ? {ok: true, token: data.token} : {ok: false, detail: 'no_token'};
}

export interface StacksyRequest {
  db: D1Database;
  env: StacksyEnv;
  who: string;
  tier: StacksyTier;
  now: number;
  fetcher?: FetchLike;
}

/** Starts one voice call and returns the HTTP status and JSON body. */
export async function stacksyVoice(req: StacksyRequest): Promise<{status: number; body: Record<string, unknown>}> {
  if (!req.env.ELEVENLABS_API_KEY || !req.env.STACKSY_AGENT_ID) return {status: 503, body: {code: 'unavailable', message: STACKSY_MESSAGES.unavailable}};
  const quota = await takeCall(req.db, req.who, req.tier, req.now);
  if (!quota) {
    const code = req.tier === 'guest' ? 'guest_limit' : req.tier === 'student' ? 'student_limit' : 'member_limit';
    return {status: 429, body: {code, message: STACKSY_MESSAGES[code]}};
  }
  let result: Awaited<ReturnType<typeof conversationToken>>;
  try {
    result = await conversationToken(req.env, req.fetcher);
  } catch (error) {
    console.error('stacksy_fetch_error', error);
    result = {ok: false, detail: 'network'};
  }
  if (!result.ok) {
    await refundCall(req.db, req.who, req.tier, req.now);
    return {status: 502, body: {code: 'upstream', detail: result.detail, message: STACKSY_MESSAGES.upstream}};
  }
  return {status: 200, body: {token: result.token, left: quota.left, limit: quota.limit}};
}

export function resetStacksyTableCache() {tableReady = new WeakSet();}
