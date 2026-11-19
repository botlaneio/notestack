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
];

let schemaReady: WeakSet<object> = new WeakSet();
export async function ensureSchema(db: D1Database): Promise<void> {
  if (schemaReady.has(db)) return;
  for (const statement of SCHEMA) await db.prepare(statement).run();
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
export interface PublicUser {id: string; name: string; email: string; createdAt: number}
export interface DeviceSession {id: string; device: string; createdAt: number; lastSeenAt: number; current: boolean}
interface UserRow {id: string; email: string; name: string; password_hash: string; created_at: number}
interface SessionRow {id: string; user_id: string; device: string; created_at: number; last_seen_at: number; expires_at: number; revoked_at: number | null; revoked_reason: string | null}

export type AuthFailure =
  | {ok: false; status: 400; code: 'invalid_input'; errors: FieldErrors}
  | {ok: false; status: 409; code: 'email_taken'; errors: FieldErrors}
  | {ok: false; status: 401; code: 'invalid_credentials'}
  | {ok: false; status: 429; code: 'too_many_attempts'};
export interface SessionCreated {ok: true; user: PublicUser; token: string; expiresAt: number; signedOutDevices: number}

function publicUser(row: UserRow): PublicUser {
  return {id: row.id, name: row.name, email: row.email, createdAt: row.created_at};
}

export class AuthService {
  db: D1Database;
  now: () => number;
  constructor(db: D1Database, now: () => number = Date.now) {
    this.db = db;
    this.now = now;
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
    const extra = (active.results ?? []).slice(MAX_DEVICES);
    for (const row of extra) {
      await this.db.prepare("UPDATE sessions SET revoked_at = ?, revoked_reason = 'device_limit' WHERE id = ?").bind(now, row.id).run();
    }
    return {ok: true, user: publicUser(user), token, expiresAt, signedOutDevices: extra.length};
  }

  /** Resolves a session token. A revoked session reports why, so the device can explain it. */
  async getSession(token: string | null): Promise<{user: PublicUser; sessionId: string} | {user: null; reason: 'none' | 'expired' | 'device_limit' | 'signed_out' | 'password_reset'}> {
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
    return {user: publicUser(user), sessionId: session.id};
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
    return this.createSession(user, userAgent);
  }
}
