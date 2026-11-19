// HTTP layer for /api/auth/*. Kept separate from the Worker entry so tests can call it directly.
import {AuthService, RESET_LINK_MINUTES, SESSION_COOKIE, type D1Database, type SessionCreated} from './auth.ts';
import {emailConfigured, resetEmail, sendEmail, type EmailEnv, type FetchLike} from './email.ts';

export interface ApiEnv extends EmailEnv {DB: D1Database}

const JSON_HEADERS = {'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store'};

function json(body: unknown, status = 200, headers: Record<string, string> = {}): Response {
  return new Response(JSON.stringify(body), {status, headers: {...JSON_HEADERS, ...headers}});
}

export function readCookie(request: Request, name: string): string | null {
  const header = request.headers.get('cookie') ?? '';
  for (const part of header.split(';')) {
    const [key, ...rest] = part.trim().split('=');
    if (key === name) return decodeURIComponent(rest.join('='));
  }
  return null;
}

function isSecure(request: Request): boolean {
  return new URL(request.url).protocol === 'https:';
}

function sessionCookie(request: Request, token: string, expiresAt: number): string {
  const maxAge = Math.max(0, Math.floor((expiresAt - Date.now()) / 1000));
  return `${SESSION_COOKIE}=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${maxAge}${isSecure(request) ? '; Secure' : ''}`;
}
function clearCookie(request: Request): string {
  return `${SESSION_COOKIE}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0${isSecure(request) ? '; Secure' : ''}`;
}

/** Blocks cross-site form posts: state-changing requests must come from this site, as JSON. */
function sameOrigin(request: Request): boolean {
  const origin = request.headers.get('origin');
  if (origin && origin !== new URL(request.url).origin) return false;
  return (request.headers.get('content-type') ?? '').includes('application/json');
}

async function body(request: Request): Promise<Record<string, unknown>> {
  try {
    const value = await request.json();
    return value && typeof value === 'object' ? value as Record<string, unknown> : {};
  } catch {
    return {};
  }
}

function created(request: Request, result: SessionCreated): Response {
  return json({user: result.user, signedOutDevices: result.signedOutDevices}, 200, {'set-cookie': sessionCookie(request, result.token, result.expiresAt)});
}

const MESSAGES = {
  invalid_credentials: 'That email and password do not match an account.',
  too_many_attempts: 'Too many unsuccessful attempts. Wait 15 minutes, then try again.',
  forbidden: 'This request was blocked. Reload the page and try again.',
  signed_out: 'You are not signed in.',
  reset_sent: 'If an account exists for that email, a reset link is on its way. Check your inbox and spam folder. The link expires in 30 minutes.',
  email_unavailable: 'Password reset by email is not available yet. Contact NoteStack support to recover your account.',
  invalid_link: 'This reset link is invalid, expired or already used. Request a new one.',
} as const;

export interface ApiOptions {now?: () => number; fetcher?: FetchLike; waitUntil?: (promise: Promise<unknown>) => void}

export async function handleApi(request: Request, env: ApiEnv, options: ApiOptions = {}): Promise<Response> {
  const {now, fetcher} = options;
  const url = new URL(request.url);
  const path = url.pathname.replace(/\/+$/, '');
  const method = request.method.toUpperCase();
  const auth = new AuthService(env.DB, now);
  const ua = request.headers.get('user-agent');

  if (method !== 'GET' && !sameOrigin(request)) return json({code: 'forbidden', message: MESSAGES.forbidden}, 403);

  if (path === '/api/auth/sign-up' && method === 'POST') {
    const result = await auth.signUp(await body(request), ua);
    return result.ok ? created(request, result) : json({code: result.code, errors: 'errors' in result ? result.errors : undefined}, result.status);
  }
  if (path === '/api/auth/sign-in' && method === 'POST') {
    const result = await auth.signIn(await body(request), ua);
    if (result.ok) return created(request, result);
    const message = result.code === 'invalid_credentials' || result.code === 'too_many_attempts' ? MESSAGES[result.code] : undefined;
    return json({code: result.code, message, errors: 'errors' in result ? result.errors : undefined}, result.status);
  }

  if (path === '/api/auth/forgot-password' && method === 'POST') {
    if (!emailConfigured(env)) return json({code: 'email_unavailable', message: MESSAGES.email_unavailable}, 503);
    const reset = await auth.requestPasswordReset((await body(request)).email);
    if (reset) {
      const link = `${url.origin}/reset-password/?token=${reset.token}`;
      const message = resetEmail(reset.user.name, link, RESET_LINK_MINUTES);
      const sending = sendEmail(env, {to: reset.user.email, ...message}, fetcher).catch(error => console.error('email_send_error', error));
      // Same response whether or not the account exists, so emails cannot be probed.
      if (options.waitUntil) options.waitUntil(sending); else await sending;
    }
    return json({ok: true, message: MESSAGES.reset_sent});
  }
  if (path === '/api/auth/reset-password' && method === 'POST') {
    const result = await auth.resetPassword(await body(request), ua);
    if (result.ok) return created(request, result);
    if (result.code === 'invalid_link') return json({code: 'invalid_link', message: MESSAGES.invalid_link}, 400);
    return json({code: result.code, errors: result.errors}, 400);
  }

  const session = await auth.getSession(readCookie(request, SESSION_COOKIE));

  if (path === '/api/auth/session' && method === 'GET') {
    if (!session.user) return json({user: null, reason: session.reason}, 200, session.reason === 'none' ? {} : {'set-cookie': clearCookie(request)});
    const [devices, entitlements] = await Promise.all([auth.listDevices(session.user.id, session.sessionId), auth.entitlements(session.user.id)]);
    return json({user: session.user, devices, entitlements});
  }
  if (path === '/api/auth/sign-out' && method === 'POST') {
    if (session.user) await auth.signOutSession(session.user.id, session.sessionId);
    return json({ok: true}, 200, {'set-cookie': clearCookie(request)});
  }
  const deviceMatch = path.match(/^\/api\/auth\/devices\/([0-9a-f-]{36})$/);
  if (deviceMatch && method === 'DELETE') {
    if (!session.user) return json({code: 'signed_out', message: MESSAGES.signed_out}, 401);
    const ok = await auth.signOutSession(session.user.id, deviceMatch[1]);
    if (!ok) return json({code: 'not_found'}, 404);
    return json({ok: true}, 200, deviceMatch[1] === session.sessionId ? {'set-cookie': clearCookie(request)} : {});
  }
  return json({code: 'not_found'}, 404);
}
