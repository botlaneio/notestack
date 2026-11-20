// NoteStack account service: accounts, password hashing, sessions and the device limit.
// Runs inside the Cloudflare Worker (D1) and in Node tests (an in-memory SQLite adapter).
// Only erasable TypeScript syntax is used so Node can run this file directly in tests.

export interface D1Result<T = Record<string, unknown>> {results?: T[]}
export interface D1PreparedStatement {
  bind(...values: unknown[]): D1PreparedStatement;
  first<T = Record<string, unknown>>(): Promise<T | null>;
  all<T = Record<string, unknown>>(): Promise<D1Result<T>>;
  run(): Promise<unknown>;
}
export interface D1Database {
  prepare(query: string): D1PreparedStatement;
  batch(statements: D1PreparedStatement[]): Promise<unknown[]>;
}

/** Subject packs a student can own, and the bundle that contains all of them. */
export const SUBJECTS = ['mathematics', 'science', 'social-science'];
export const BUNDLES: Record<string, string[]> = {'core-collection': SUBJECTS};

/** How many devices may be signed in to one account at the same time. */
export const MAX_DEVICES = 2;
export const SESSION_DAYS = 30;
export const SESSION_COOKIE = 'ns_session';
/** Failed sign-ins allowed per email within the window before it is temporarily locked. */
export const MAX_FAILED_SIGN_INS = 8;
export const FAILED_WINDOW_MINUTES = 15;
/** Reset links work once and expire after this many minutes. */
export const RESET_LINK_MINUTES = 30;
/** At most this many reset emails per account per hour. */
export const MAX_RESETS_PER_HOUR = 3;
/** Email confirmation links expire after this many hours; at most 3 are sent per hour. */
export const VERIFY_LINK_HOURS = 48;
export const MAX_VERIFY_EMAILS_PER_HOUR = 3;
/** Chapters a student can track; more than this is ignored so the table cannot be flooded. */
export const MAX_PROGRESS_ROWS = 400;
export const MAX_DECK_CARDS = 300;
/** Lesson URLs: /learn/<area>/<chapter>/… The area maps to the subject pack that unlocks it. */
export const LEARN_AREAS: Record<string, string> = {maths: 'mathematics', science: 'science', 'social-science': 'social-science'};
/** The first chapter of each subject stays open to everyone as a free preview. */
export const FREE_CHAPTERS: Record<string, string> = {
  maths: 'real-numbers',
  science: 'chemical-reactions-and-equations',
  'social-science': 'the-advent-of-europeans-to-india',
};

/**
 * Reads a lesson URL. Returns null for anything that is not a chapter page, such as the
 * subject's chapter list (/learn/maths/) and its page data files.
 */
export function lessonPath(pathname: string): {area: string; subject: string; chapter: string; path: string; free: boolean} | null {
  let decoded = pathname;
  try {decoded = decodeURIComponent(pathname);} catch {/* keep as is */}
  const clean = decoded.replace(/\\/g, '/').replace(/\/{2,}/g, '/').toLowerCase();
  const m = clean.match(/^\/learn\/([^/]+)\/([^/]+)(?:\/|$)/);
  if (!m) return null;
  const [, area, chapter] = m;
  const subject = LEARN_AREAS[area];
  if (!subject) return null;
  if (chapter.startsWith('__next') || chapter.startsWith('index.')) return null;
  return {area, subject, chapter, path: `/learn/${area}/${chapter}/`, free: FREE_CHAPTERS[area] === chapter};
}
const PBKDF2_ITERATIONS = 100_000; // Workers' WebCrypto maximum for PBKDF2.
const DAY = 86_400_000;

export const SCHEMA = [
  `CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    email TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    password_hash TEXT NOT NULL,
    created_at INTEGER NOT NULL
  )`,
  `CREATE TABLE IF NOT EXISTS sessions (
    id TEXT PRIMARY KEY,
    token_hash TEXT NOT NULL UNIQUE,
    user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    device TEXT NOT NULL,
    created_at INTEGER NOT NULL,
    last_seen_at INTEGER NOT NULL,
    expires_at INTEGER NOT NULL,
    revoked_at INTEGER,
    revoked_reason TEXT
  )`,
  `CREATE INDEX IF NOT EXISTS sessions_user ON sessions(user_id, revoked_at)`,
  // Purchases or grants unlock subject packs. Payments will insert rows here.
  `CREATE TABLE IF NOT EXISTS entitlements (
    user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    product_id TEXT NOT NULL,
    source TEXT NOT NULL,
    reference TEXT,
    created_at INTEGER NOT NULL,
    expires_at INTEGER,
    PRIMARY KEY (user_id, product_id)
  )`,
  `CREATE TABLE IF NOT EXISTS sign_in_failures (
    email TEXT NOT NULL,
    at INTEGER NOT NULL
  )`,
  `CREATE INDEX IF NOT EXISTS sign_in_failures_email ON sign_in_failures(email, at)`,
  `CREATE TABLE IF NOT EXISTS password_resets (
    token_hash TEXT PRIMARY KEY,
    user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    created_at INTEGER NOT NULL,
    expires_at INTEGER NOT NULL,
    used_at INTEGER
  )`,
  `CREATE INDEX IF NOT EXISTS password_resets_user ON password_resets(user_id, created_at)`,
  `CREATE TABLE IF NOT EXISTS email_verifications (
    token_hash TEXT PRIMARY KEY,
    user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    created_at INTEGER NOT NULL,
    expires_at INTEGER NOT NULL,
    used_at INTEGER
  )`,
  `CREATE INDEX IF NOT EXISTS email_verifications_user ON email_verifications(user_id, created_at)`,
  // One row per chapter a student has opened. completed_at is set when they mark it done.
  `CREATE TABLE IF NOT EXISTS progress (
    user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    path TEXT NOT NULL,
    subject TEXT NOT NULL,
    title TEXT,
    first_seen_at INTEGER NOT NULL,
    last_seen_at INTEGER NOT NULL,
    completed_at INTEGER,
    PRIMARY KEY (user_id, path)
  )`,
  // Flashcard ratings, one row per chapter deck: card ids the student knows or is still learning.
  `CREATE TABLE IF NOT EXISTS flashcard_progress (
    user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    path TEXT NOT NULL,
    known TEXT NOT NULL,
    learning TEXT NOT NULL,
    updated_at INTEGER NOT NULL,
    PRIMARY KEY (user_id, path)
  )`,
];
/** Columns added after launch. Each runs once; "duplicate column" errors mean it already ran. */
const MIGRATIONS = [
  'ALTER TABLE users ADD COLUMN email_verified_at INTEGER',
];

let schemaReady: WeakSet<object> = new WeakSet();
export async function ensureSchema(db: D1Database): Promise<void> {
  if (schemaReady.has(db)) return;
  for (const statement of SCHEMA) await db.prepare(statement).run();
  for (const statement of MIGRATIONS) {
    try {await db.prepare(statement).run();} catch (error) {
      if (!/duplicate column/i.test(String((error as Error)?.message ?? error))) throw error;
    }
  }
  schemaReady.add(db);
}
export function resetSchemaCache() {schemaReady = new WeakSet();}

// ---------- validation ----------
export interface SignUpInput {name: string; email: string; password: string}
export type FieldErrors = Partial<Record<'name' | 'email' | 'password', string>>;

export function normaliseEmail(email: unknown): string {
  return typeof email === 'string' ? email.trim().toLowerCase() : '';
}
export function validateSignUp(input: {name?: unknown; email?: unknown; password?: unknown}): FieldErrors {
  const errors: FieldErrors = {};
  const name = typeof input.name === 'string' ? input.name.trim() : '';
  const email = normaliseEmail(input.email);
  const password = typeof input.password === 'string' ? input.password : '';
  if (name.length < 2) errors.name = 'Enter your full name.';
  else if (name.length > 80) errors.name = 'Use 80 characters or fewer for your name.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) errors.email = 'Enter a valid email address, such as name@example.com.';
  if (password.length < 8) errors.password = 'Use at least 8 characters for your password.';
  else if (password.length > 200) errors.password = 'Use 200 characters or fewer for your password.';
  return errors;
}

// ---------- crypto helpers ----------
const encoder = new TextEncoder();
function toHex(bytes: ArrayBuffer | Uint8Array): string {
  return [...new Uint8Array(bytes)].map(b => b.toString(16).padStart(2, '0')).join('');
}
function fromHex(hex: string): Uint8Array<ArrayBuffer> {
  const out = new Uint8Array(hex.length / 2);
  for (let i = 0; i < out.length; i++) out[i] = parseInt(hex.slice(i * 2, i * 2 + 2), 16);
  return out;
}
export function randomToken(bytes = 32): string {
  return toHex(crypto.getRandomValues(new Uint8Array(bytes)));
}
export async function sha256(value: string): Promise<string> {
  return toHex(await crypto.subtle.digest('SHA-256', encoder.encode(value)));
}
function timingSafeEqual(a: Uint8Array, b: Uint8Array): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a[i] ^ b[i];
  return diff === 0;
}
async function pbkdf2(password: string, salt: Uint8Array<ArrayBuffer>, iterations: number): Promise<Uint8Array> {
  const key = await crypto.subtle.importKey('raw', encoder.encode(password), 'PBKDF2', false, ['deriveBits']);
  const bits = await crypto.subtle.deriveBits({name: 'PBKDF2', hash: 'SHA-256', salt, iterations}, key, 256);
  return new Uint8Array(bits);
}
export async function hashPassword(password: string, iterations = PBKDF2_ITERATIONS): Promise<string> {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  return `pbkdf2-sha256$${iterations}$${toHex(salt)}$${toHex(await pbkdf2(password, salt, iterations))}`;
}
export async function verifyPassword(password: string, stored: string): Promise<boolean> {
  const [scheme, iter, salt, hash] = stored.split('$');
  if (scheme !== 'pbkdf2-sha256' || !iter || !salt || !hash) return false;
  return timingSafeEqual(await pbkdf2(password, fromHex(salt), Number(iter)), fromHex(hash));
}
// Used when the email does not exist, so a failed sign-in takes the same time either way.
const DUMMY_HASH = 'pbkdf2-sha256$100000$00000000000000000000000000000000$0000000000000000000000000000000000000000000000000000000000000000';

// ---------- device labels ----------
export function describeDevice(userAgent: string | null): string {
  const ua = userAgent ?? '';
  const os = /Android/i.test(ua) ? 'Android' : /iPhone|iPad|iPod/i.test(ua) ? 'iPhone or iPad' : /Windows/i.test(ua) ? 'Windows' : /Mac OS X|Macintosh/i.test(ua) ? 'Mac' : /CrOS/i.test(ua) ? 'Chromebook' : /Linux/i.test(ua) ? 'Linux' : 'Unknown device';
  const browser = /Edg\//.test(ua) ? 'Edge' : /SamsungBrowser/.test(ua) ? 'Samsung Internet' : /OPR\/|Opera/.test(ua) ? 'Opera' : /Firefox\//.test(ua) ? 'Firefox' : /Chrome\//.test(ua) ? 'Chrome' : /Safari\//.test(ua) ? 'Safari' : 'Browser';
  return `${browser} on ${os}`;
}

// ---------- service ----------
export interface PublicUser {id: string; name: string; email: string; createdAt: number; emailVerified: boolean}
export interface DeviceSession {id: string; device: string; createdAt: number; lastSeenAt: number; current: boolean}
interface UserRow {id: string; email: string; name: string; password_hash: string; created_at: number; email_verified_at?: number | null}
interface SessionRow {id: string; user_id: string; device: string; created_at: number; last_seen_at: number; expires_at: number; revoked_at: number | null; revoked_reason: string | null}

export type AuthFailure =
  | {ok: false; status: 400; code: 'invalid_input'; errors: FieldErrors}
  | {ok: false; status: 409; code: 'email_taken'; errors: FieldErrors}
  | {ok: false; status: 401; code: 'invalid_credentials'}
  | {ok: false; status: 429; code: 'too_many_attempts'};
export interface SessionCreated {ok: true; user: PublicUser; token: string; expiresAt: number; signedOutDevices: number}

function publicUser(row: UserRow): PublicUser {
  return {id: row.id, name: row.name, email: row.email, createdAt: row.created_at, emailVerified: Boolean(row.email_verified_at)};
}

export interface AdminUser extends PublicUser {
  products: {productId: string; source: string; createdAt: number}[];
  activeDevices: number;
  chaptersDone: number;
  lastSeenAt: number | null;
}
export interface FlashcardProgress {path: string; known: string[]; learning: string[]; updatedAt: number}
export interface ProgressEntry {path: string; subject: string; title: string | null; lastSeenAt: number; completedAt: number | null}

/** Parses a comma-separated list of admin emails, such as the ADMIN_EMAILS setting. */
export function parseAdminEmails(value: unknown): string[] {
  return typeof value === 'string' ? value.split(',').map(normaliseEmail).filter(Boolean) : [];
}

export class AuthService {
  db: D1Database;
  now: () => number;
  adminEmails: string[];
  constructor(db: D1Database, now: () => number = Date.now, options: {adminEmails?: string[]} = {}) {
    this.db = db;
    this.now = now;
    this.adminEmails = options.adminEmails ?? [];
  }

  /** Admins (the house account) see every subject and have no device limit. The email must be confirmed. */
  isAdmin(user: {email: string; emailVerified: boolean} | null | undefined): boolean {
    return Boolean(user && user.emailVerified && this.adminEmails.includes(normaliseEmail(user.email)));
  }

  async signUp(input: {name?: unknown; email?: unknown; password?: unknown}, userAgent: string | null): Promise<SessionCreated | AuthFailure> {
    await ensureSchema(this.db);
    const errors = validateSignUp(input);
    if (Object.keys(errors).length) return {ok: false, status: 400, code: 'invalid_input', errors};
    const email = normaliseEmail(input.email);
    const existing = await this.db.prepare('SELECT id FROM users WHERE email = ?').bind(email).first();
    if (existing) return {ok: false, status: 409, code: 'email_taken', errors: {email: 'An account with this email already exists. Sign in instead.'}};
    const user: UserRow = {
      id: crypto.randomUUID(), email, name: String(input.name).trim(),
      password_hash: await hashPassword(String(input.password)), created_at: this.now(),
    };
    try {
      await this.db.prepare('INSERT INTO users (id, email, name, password_hash, created_at) VALUES (?, ?, ?, ?, ?)')
        .bind(user.id, user.email, user.name, user.password_hash, user.created_at).run();
    } catch {
      // A simultaneous sign-up with the same email lost the race on the UNIQUE constraint.
      return {ok: false, status: 409, code: 'email_taken', errors: {email: 'An account with this email already exists. Sign in instead.'}};
    }
    return this.createSession(user, userAgent);
  }

  async signIn(input: {email?: unknown; password?: unknown}, userAgent: string | null): Promise<SessionCreated | AuthFailure> {
    await ensureSchema(this.db);
    const email = normaliseEmail(input.email);
    const password = typeof input.password === 'string' ? input.password : '';
    if (!email || !password) return {ok: false, status: 400, code: 'invalid_input', errors: {...(!email ? {email: 'Enter your email address.'} : {}), ...(!password ? {password: 'Enter your password.'} : {})}};
    const since = this.now() - FAILED_WINDOW_MINUTES * 60_000;
    const failures = await this.db.prepare('SELECT COUNT(*) AS n FROM sign_in_failures WHERE email = ? AND at > ?').bind(email, since).first<{n: number}>();
    if ((failures?.n ?? 0) >= MAX_FAILED_SIGN_INS) return {ok: false, status: 429, code: 'too_many_attempts'};
    const user = await this.db.prepare('SELECT * FROM users WHERE email = ?').bind(email).first<UserRow>();
    const valid = await verifyPassword(password, user?.password_hash ?? DUMMY_HASH);
    if (!user || !valid) {
      await this.db.prepare('INSERT INTO sign_in_failures (email, at) VALUES (?, ?)').bind(email, this.now()).run();
      return {ok: false, status: 401, code: 'invalid_credentials'};
    }
    await this.db.prepare('DELETE FROM sign_in_failures WHERE email = ? OR at <= ?').bind(email, since).run();
    return this.createSession(user, userAgent);
  }

  /** Creates a session and signs out the oldest devices beyond MAX_DEVICES. */
  async createSession(user: UserRow, userAgent: string | null): Promise<SessionCreated> {
    const now = this.now();
    const token = randomToken();
    const expiresAt = now + SESSION_DAYS * DAY;
    await this.db.prepare('INSERT INTO sessions (id, token_hash, user_id, device, created_at, last_seen_at, expires_at) VALUES (?, ?, ?, ?, ?, ?, ?)')
      .bind(crypto.randomUUID(), await sha256(token), user.id, describeDevice(userAgent), now, now, expiresAt).run();
    const active = await this.db.prepare('SELECT id FROM sessions WHERE user_id = ? AND revoked_at IS NULL AND expires_at > ? ORDER BY last_seen_at DESC, created_at DESC')
      .bind(user.id, now).all<{id: string}>();
    const extra = this.isAdmin(publicUser(user)) ? [] : (active.results ?? []).slice(MAX_DEVICES);
    for (const row of extra) {
      await this.db.prepare("UPDATE sessions SET revoked_at = ?, revoked_reason = 'device_limit' WHERE id = ?").bind(now, row.id).run();
    }
    return {ok: true, user: publicUser(user), token, expiresAt, signedOutDevices: extra.length};
  }

  /** Resolves a session token. A revoked session reports why, so the device can explain it. */
  async getSession(token: string | null): Promise<{user: PublicUser; sessionId: string; admin: boolean} | {user: null; reason: 'none' | 'expired' | 'device_limit' | 'signed_out' | 'password_reset'}> {
    if (!token) return {user: null, reason: 'none'};
    await ensureSchema(this.db);
    const now = this.now();
    const session = await this.db.prepare('SELECT * FROM sessions WHERE token_hash = ?').bind(await sha256(token)).first<SessionRow>();
    if (!session) return {user: null, reason: 'none'};
    if (session.revoked_at) return {user: null, reason: session.revoked_reason === 'device_limit' || session.revoked_reason === 'password_reset' ? session.revoked_reason : 'signed_out'};
    if (session.expires_at <= now) return {user: null, reason: 'expired'};
    const user = await this.db.prepare('SELECT * FROM users WHERE id = ?').bind(session.user_id).first<UserRow>();
    if (!user) return {user: null, reason: 'none'};
    if (now - session.last_seen_at > 5 * 60_000) {
      await this.db.prepare('UPDATE sessions SET last_seen_at = ? WHERE id = ?').bind(now, session.id).run();
    }
    const pub = publicUser(user);
    return {user: pub, sessionId: session.id, admin: this.isAdmin(pub)};
  }

  async listDevices(userId: string, currentSessionId: string): Promise<DeviceSession[]> {
    const rows = await this.db.prepare('SELECT * FROM sessions WHERE user_id = ? AND revoked_at IS NULL AND expires_at > ? ORDER BY last_seen_at DESC')
      .bind(userId, this.now()).all<SessionRow>();
    return (rows.results ?? []).map(r => ({id: r.id, device: r.device, createdAt: r.created_at, lastSeenAt: r.last_seen_at, current: r.id === currentSessionId}));
  }

  async signOutSession(userId: string, sessionId: string, reason = 'signed_out'): Promise<boolean> {
    const row = await this.db.prepare('SELECT id FROM sessions WHERE id = ? AND user_id = ? AND revoked_at IS NULL').bind(sessionId, userId).first();
    if (!row) return false;
    await this.db.prepare('UPDATE sessions SET revoked_at = ?, revoked_reason = ? WHERE id = ?').bind(this.now(), reason, sessionId).run();
    return true;
  }

  /** Records a purchase or a free grant. productId is a subject or 'core-collection'. */
  async grant(userId: string, productId: string, source: string, reference: string | null = null): Promise<void> {
    if (!SUBJECTS.includes(productId) && !BUNDLES[productId]) throw new Error(`Unknown product ${productId}`);
    await ensureSchema(this.db);
    await this.db.prepare('INSERT OR IGNORE INTO entitlements (user_id, product_id, source, reference, created_at) VALUES (?, ?, ?, ?, ?)')
      .bind(userId, productId, source, reference, this.now()).run();
  }

  /** Subject ids the user can open (bundles expanded). The paywall will check this list. */
  async entitlements(userId: string): Promise<string[]> {
    const rows = await this.db.prepare('SELECT product_id FROM entitlements WHERE user_id = ? AND (expires_at IS NULL OR expires_at > ?)')
      .bind(userId, this.now()).all<{product_id: string}>();
    const ids = new Set<string>();
    for (const {product_id} of rows.results ?? []) {
      // A full-pack purchase unlocks every subject in it.
      for (const id of BUNDLES[product_id] ?? [product_id]) ids.add(id);
    }
    return [...ids].sort();
  }

  /**
   * Starts a password reset. Returns the one-time token to email, or null when there is
   * no such account or too many recent requests. Callers must respond the same either way.
   */
  async requestPasswordReset(emailInput: unknown): Promise<{token: string; user: PublicUser; expiresAt: number} | null> {
    await ensureSchema(this.db);
    const email = normaliseEmail(emailInput);
    if (!email) return null;
    const user = await this.db.prepare('SELECT * FROM users WHERE email = ?').bind(email).first<UserRow>();
    if (!user) return null;
    const now = this.now();
    const recent = await this.db.prepare('SELECT COUNT(*) AS n FROM password_resets WHERE user_id = ? AND created_at > ?').bind(user.id, now - 3_600_000).first<{n: number}>();
    if ((recent?.n ?? 0) >= MAX_RESETS_PER_HOUR) return null;
    const token = randomToken();
    const expiresAt = now + RESET_LINK_MINUTES * 60_000;
    // A new link replaces any earlier unused one.
    await this.db.prepare('UPDATE password_resets SET used_at = ? WHERE user_id = ? AND used_at IS NULL').bind(now, user.id).run();
    await this.db.prepare('INSERT INTO password_resets (token_hash, user_id, created_at, expires_at) VALUES (?, ?, ?, ?)')
      .bind(await sha256(token), user.id, now, expiresAt).run();
    return {token, user: publicUser(user), expiresAt};
  }

  /** Sets a new password from a reset link, signs out every device, and signs in this one. */
  async resetPassword(input: {token?: unknown; password?: unknown}, userAgent: string | null): Promise<SessionCreated | {ok: false; status: 400; code: 'invalid_input'; errors: FieldErrors} | {ok: false; status: 400; code: 'invalid_link'}> {
    await ensureSchema(this.db);
    const password = typeof input.password === 'string' ? input.password : '';
    if (password.length < 8) return {ok: false, status: 400, code: 'invalid_input', errors: {password: 'Use at least 8 characters for your password.'}};
    if (password.length > 200) return {ok: false, status: 400, code: 'invalid_input', errors: {password: 'Use 200 characters or fewer for your password.'}};
    const token = typeof input.token === 'string' ? input.token : '';
    if (!/^[0-9a-f]{64}$/.test(token)) return {ok: false, status: 400, code: 'invalid_link'};
    const now = this.now();
    const reset = await this.db.prepare('SELECT * FROM password_resets WHERE token_hash = ?').bind(await sha256(token)).first<{token_hash: string; user_id: string; expires_at: number; used_at: number | null}>();
    if (!reset || reset.used_at || reset.expires_at <= now) return {ok: false, status: 400, code: 'invalid_link'};
    const user = await this.db.prepare('SELECT * FROM users WHERE id = ?').bind(reset.user_id).first<UserRow>();
    if (!user) return {ok: false, status: 400, code: 'invalid_link'};
    // Mark used first so the same link cannot be replayed in parallel.
    await this.db.prepare('UPDATE password_resets SET used_at = ? WHERE token_hash = ? AND used_at IS NULL').bind(now, reset.token_hash).run();
    const claimed = await this.db.prepare('SELECT used_at FROM password_resets WHERE token_hash = ?').bind(reset.token_hash).first<{used_at: number}>();
    if (claimed?.used_at !== now) return {ok: false, status: 400, code: 'invalid_link'};
    user.password_hash = await hashPassword(password);
    await this.db.prepare('UPDATE users SET password_hash = ? WHERE id = ?').bind(user.password_hash, user.id).run();
    await this.db.prepare("UPDATE sessions SET revoked_at = ?, revoked_reason = 'password_reset' WHERE user_id = ? AND revoked_at IS NULL").bind(now, user.id).run();
    await this.db.prepare('DELETE FROM sign_in_failures WHERE email = ?').bind(user.email).run();
    // Opening a link sent to the inbox proves the student owns the address.
    if (!user.email_verified_at) {
      user.email_verified_at = now;
      await this.db.prepare('UPDATE users SET email_verified_at = ? WHERE id = ?').bind(now, user.id).run();
    }
    return this.createSession(user, userAgent);
  }

  // ---------- email confirmation ----------

  /** Creates a confirmation link token, or null if the email is confirmed or too many were sent. */
  async createEmailVerification(userId: string): Promise<{token: string; user: PublicUser} | null> {
    await ensureSchema(this.db);
    const user = await this.db.prepare('SELECT * FROM users WHERE id = ?').bind(userId).first<UserRow>();
    if (!user || user.email_verified_at) return null;
    const now = this.now();
    const recent = await this.db.prepare('SELECT COUNT(*) AS n FROM email_verifications WHERE user_id = ? AND created_at > ?').bind(userId, now - 3_600_000).first<{n: number}>();
    if ((recent?.n ?? 0) >= MAX_VERIFY_EMAILS_PER_HOUR) return null;
    const token = randomToken();
    await this.db.prepare('INSERT INTO email_verifications (token_hash, user_id, created_at, expires_at) VALUES (?, ?, ?, ?)')
      .bind(await sha256(token), userId, now, now + VERIFY_LINK_HOURS * 3_600_000).run();
    return {token, user: publicUser(user)};
  }

  /** Confirms an email from its link. Any unexpired link for the account works. */
  async verifyEmail(tokenInput: unknown): Promise<{ok: true; user: PublicUser} | {ok: false}> {
    await ensureSchema(this.db);
    const token = typeof tokenInput === 'string' ? tokenInput : '';
    if (!/^[0-9a-f]{64}$/.test(token)) return {ok: false};
    const now = this.now();
    const row = await this.db.prepare('SELECT * FROM email_verifications WHERE token_hash = ?').bind(await sha256(token)).first<{token_hash: string; user_id: string; expires_at: number; used_at: number | null}>();
    if (!row || row.expires_at <= now) return {ok: false};
    const user = await this.db.prepare('SELECT * FROM users WHERE id = ?').bind(row.user_id).first<UserRow>();
    if (!user) return {ok: false};
    if (!user.email_verified_at) {
      user.email_verified_at = now;
      await this.db.prepare('UPDATE users SET email_verified_at = ? WHERE id = ?').bind(now, user.id).run();
    }
    await this.db.prepare('UPDATE email_verifications SET used_at = ? WHERE user_id = ? AND used_at IS NULL').bind(now, user.id).run();
    return {ok: true, user: publicUser(user)};
  }

  // ---------- password change ----------

  /** Changes the password after checking the current one. Every other device is signed out. */
  async changePassword(userId: string, sessionId: string, input: {currentPassword?: unknown; newPassword?: unknown}): Promise<{ok: true; signedOutDevices: number} | {ok: false; status: 400 | 401 | 429; code: 'invalid_input' | 'wrong_password' | 'too_many_attempts'; errors?: Record<string, string>}> {
    const current = typeof input.currentPassword === 'string' ? input.currentPassword : '';
    const next = typeof input.newPassword === 'string' ? input.newPassword : '';
    if (next.length < 8) return {ok: false, status: 400, code: 'invalid_input', errors: {newPassword: 'Use at least 8 characters for your new password.'}};
    if (next.length > 200) return {ok: false, status: 400, code: 'invalid_input', errors: {newPassword: 'Use 200 characters or fewer for your password.'}};
    const user = await this.db.prepare('SELECT * FROM users WHERE id = ?').bind(userId).first<UserRow>();
    if (!user) return {ok: false, status: 401, code: 'wrong_password'};
    const since = this.now() - FAILED_WINDOW_MINUTES * 60_000;
    const failures = await this.db.prepare('SELECT COUNT(*) AS n FROM sign_in_failures WHERE email = ? AND at > ?').bind(user.email, since).first<{n: number}>();
    if ((failures?.n ?? 0) >= MAX_FAILED_SIGN_INS) return {ok: false, status: 429, code: 'too_many_attempts'};
    if (!await verifyPassword(current, user.password_hash)) {
      await this.db.prepare('INSERT INTO sign_in_failures (email, at) VALUES (?, ?)').bind(user.email, this.now()).run();
      return {ok: false, status: 401, code: 'wrong_password', errors: {currentPassword: 'That is not your current password.'}};
    }
    const now = this.now();
    await this.db.prepare('UPDATE users SET password_hash = ? WHERE id = ?').bind(await hashPassword(next), userId).run();
    const others = await this.db.prepare('SELECT id FROM sessions WHERE user_id = ? AND id != ? AND revoked_at IS NULL AND expires_at > ?').bind(userId, sessionId, now).all<{id: string}>();
    await this.db.prepare("UPDATE sessions SET revoked_at = ?, revoked_reason = 'password_reset' WHERE user_id = ? AND id != ? AND revoked_at IS NULL").bind(now, userId, sessionId).run();
    return {ok: true, signedOutDevices: (others.results ?? []).length};
  }

  // ---------- chapter progress ----------

  /** Records that a chapter was opened, and optionally marks it done (true) or not done (false). */
  async recordProgress(userId: string, input: {path?: unknown; title?: unknown; completed?: unknown}): Promise<boolean> {
    const lesson = lessonPath(typeof input.path === 'string' ? input.path : '');
    if (!lesson || !/^[a-z0-9-]{1,100}$/.test(lesson.chapter)) return false;
    const title = typeof input.title === 'string' ? input.title.replace(/\s+/g, ' ').trim().slice(0, 120) || null : null;
    const now = this.now();
    const existing = await this.db.prepare('SELECT completed_at FROM progress WHERE user_id = ? AND path = ?').bind(userId, lesson.path).first<{completed_at: number | null}>();
    if (!existing) {
      const count = await this.db.prepare('SELECT COUNT(*) AS n FROM progress WHERE user_id = ?').bind(userId).first<{n: number}>();
      if ((count?.n ?? 0) >= MAX_PROGRESS_ROWS) return false;
    }
    const completedAt = input.completed === true ? (existing?.completed_at ?? now) : input.completed === false ? null : (existing?.completed_at ?? null);
    await this.db.prepare(`INSERT INTO progress (user_id, path, subject, title, first_seen_at, last_seen_at, completed_at) VALUES (?, ?, ?, ?, ?, ?, ?)
      ON CONFLICT (user_id, path) DO UPDATE SET last_seen_at = excluded.last_seen_at, completed_at = excluded.completed_at, title = COALESCE(excluded.title, progress.title)`)
      .bind(userId, lesson.path, lesson.subject, title, now, now, completedAt).run();
    return true;
  }

  async progress(userId: string): Promise<ProgressEntry[]> {
    const rows = await this.db.prepare('SELECT path, subject, title, last_seen_at, completed_at FROM progress WHERE user_id = ? ORDER BY last_seen_at DESC LIMIT ?')
      .bind(userId, MAX_PROGRESS_ROWS).all<{path: string; subject: string; title: string | null; last_seen_at: number; completed_at: number | null}>();
    return (rows.results ?? []).map(r => ({path: r.path, subject: r.subject, title: r.title, lastSeenAt: r.last_seen_at, completedAt: r.completed_at}));
  }

  // ---------- flashcards ----------

  /** Saves which cards of one chapter's deck a student knows and is still learning. */
  async saveFlashcards(userId: string, input: {path?: unknown; known?: unknown; learning?: unknown}): Promise<{ok: true; updatedAt: number} | {ok: false}> {
    const lesson = lessonPath(typeof input.path === 'string' ? input.path : '');
    if (!lesson || !/^[a-z0-9-]{1,100}$/.test(lesson.chapter)) return {ok: false};
    const ids = (value: unknown) => Array.isArray(value) && value.length <= MAX_DECK_CARDS && value.every(id => typeof id === 'string' && /^[a-z0-9-]{1,80}$/.test(id)) ? [...new Set(value as string[])] : null;
    const known = ids(input.known ?? []), learning = ids(input.learning ?? []);
    if (!known || !learning) return {ok: false};
    const learningOnly = learning.filter(id => !known.includes(id));
    const existing = await this.db.prepare('SELECT 1 AS x FROM flashcard_progress WHERE user_id = ? AND path = ?').bind(userId, lesson.path).first();
    if (!existing) {
      const count = await this.db.prepare('SELECT COUNT(*) AS n FROM flashcard_progress WHERE user_id = ?').bind(userId).first<{n: number}>();
      if ((count?.n ?? 0) >= MAX_PROGRESS_ROWS) return {ok: false};
    }
    const now = this.now();
    await this.db.prepare(`INSERT INTO flashcard_progress (user_id, path, known, learning, updated_at) VALUES (?, ?, ?, ?, ?)
      ON CONFLICT (user_id, path) DO UPDATE SET known = excluded.known, learning = excluded.learning, updated_at = excluded.updated_at`)
      .bind(userId, lesson.path, JSON.stringify(known), JSON.stringify(learningOnly), now).run();
    return {ok: true, updatedAt: now};
  }

  async flashcards(userId: string): Promise<FlashcardProgress[]> {
    const rows = await this.db.prepare('SELECT path, known, learning, updated_at FROM flashcard_progress WHERE user_id = ? ORDER BY updated_at DESC LIMIT ?')
      .bind(userId, MAX_PROGRESS_ROWS).all<{path: string; known: string; learning: string; updated_at: number}>();
    const parse = (text: string): string[] => {try {const v = JSON.parse(text); return Array.isArray(v) ? v.filter(x => typeof x === 'string') : [];} catch {return [];}};
    return (rows.results ?? []).map(r => ({path: r.path, known: parse(r.known), learning: parse(r.learning), updatedAt: r.updated_at}));
  }

  /** Whether this user may open a lesson in the given subject. */
  async canOpen(user: PublicUser, subject: string): Promise<boolean> {
    if (this.isAdmin(user)) return true;
    return (await this.entitlements(user.id)).includes(subject);
  }

  // ---------- admin ----------

  /** Finds students by email or name for the admin page. */
  async searchUsers(query: unknown, limit = 25): Promise<AdminUser[]> {
    await ensureSchema(this.db);
    const q = typeof query === 'string' ? query.trim().toLowerCase().slice(0, 100) : '';
    const like = `%${q.replace(/[\\%_]/g, c => '\\' + c)}%`;
    const now = this.now();
    const users = await this.db.prepare(`SELECT * FROM users WHERE ? = '' OR lower(email) LIKE ? ESCAPE '\\' OR lower(name) LIKE ? ESCAPE '\\' ORDER BY created_at DESC LIMIT ?`)
      .bind(q, like, like, limit).all<UserRow>();
    const out: AdminUser[] = [];
    for (const row of users.results ?? []) {
      const [products, devices, done] = await Promise.all([
        this.db.prepare('SELECT product_id, source, created_at FROM entitlements WHERE user_id = ? ORDER BY created_at').bind(row.id).all<{product_id: string; source: string; created_at: number}>(),
        this.db.prepare('SELECT COUNT(*) AS n, MAX(last_seen_at) AS last FROM sessions WHERE user_id = ? AND revoked_at IS NULL AND expires_at > ?').bind(row.id, now).first<{n: number; last: number | null}>(),
        this.db.prepare('SELECT COUNT(*) AS n FROM progress WHERE user_id = ? AND completed_at IS NOT NULL').bind(row.id).first<{n: number}>(),
      ]);
      out.push({
        ...publicUser(row),
        products: (products.results ?? []).map(p => ({productId: p.product_id, source: p.source, createdAt: p.created_at})),
        activeDevices: devices?.n ?? 0, lastSeenAt: devices?.last ?? null, chaptersDone: done?.n ?? 0,
      });
    }
    return out;
  }

  async findUser(userId: string): Promise<PublicUser | null> {
    const row = await this.db.prepare('SELECT * FROM users WHERE id = ?').bind(userId).first<UserRow>();
    return row ? publicUser(row) : null;
  }

  /** Removes a subject or the full pack from an account (for refunds or mistakes). */
  async revoke(userId: string, productId: string): Promise<boolean> {
    const row = await this.db.prepare('SELECT product_id FROM entitlements WHERE user_id = ? AND product_id = ?').bind(userId, productId).first();
    if (!row) return false;
    await this.db.prepare('DELETE FROM entitlements WHERE user_id = ? AND product_id = ?').bind(userId, productId).run();
    return true;
  }

  /** Signs an account out everywhere. Returns how many devices were signed out. */
  async signOutEverywhere(userId: string): Promise<number> {
    const now = this.now();
    const rows = await this.db.prepare('SELECT id FROM sessions WHERE user_id = ? AND revoked_at IS NULL AND expires_at > ?').bind(userId, now).all<{id: string}>();
    await this.db.prepare("UPDATE sessions SET revoked_at = ?, revoked_reason = 'signed_out' WHERE user_id = ? AND revoked_at IS NULL").bind(now, userId).run();
    return (rows.results ?? []).length;
  }
}
