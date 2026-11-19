// HTTP layer for /api/auth/*. Kept separate from the Worker entry so tests can call it directly.
import {AuthService, BUNDLES, RESET_LINK_MINUTES, SESSION_COOKIE, SUBJECTS, VERIFY_LINK_HOURS, parseAdminEmails, type D1Database, type PublicUser, type SessionCreated} from './auth.ts';
import {emailConfigured, resetEmail, sendEmail, unlockedEmail, verifyEmail, type EmailEnv, type FetchLike} from './email.ts';

export interface ApiEnv extends EmailEnv {DB: D1Database; ADMIN_EMAILS?: string}

export const SUBJECT_NAMES: Record<string, string> = {mathematics: 'Mathematics', science: 'Science', 'social-science': 'Social Science'};

/** The account service configured for this deployment (admin emails come from ADMIN_EMAILS). */
export function authFor(env: ApiEnv, now?: () => number): AuthService {
  return new AuthService(env.DB, now, {adminEmails: parseAdminEmails(env.ADMIN_EMAILS)});
}

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
  invalid_verify_link: 'This confirmation link is invalid or has expired. Sign in and send a new one from your account page.',
  verify_sent: 'We sent a confirmation link. Check your inbox and spam folder.',
  verify_limit: 'You have asked for several links already. Wait an hour, then try again.',
  wrong_password: 'That is not your current password.',
  admin_only: 'This is only available to NoteStack admins.',
} as const;

export interface ApiOptions {now?: () => number; fetcher?: FetchLike; waitUntil?: (promise: Promise<unknown>) => void}

export async function handleApi(request: Request, env: ApiEnv, options: ApiOptions = {}): Promise<Response> {
  const {now, fetcher} = options;
  const url = new URL(request.url);
  const path = url.pathname.replace(/\/+$/, '');
  const method = request.method.toUpperCase();
  const auth = authFor(env, now);
  const background = (promise: Promise<unknown>) => {
    const safe = promise.catch(error => console.error('email_send_error', error));
    if (options.waitUntil) {options.waitUntil(safe); return Promise.resolve();}
    return safe;
  };
  const sendVerification = async (user: PublicUser) => {
    if (!emailConfigured(env)) return false;
    const created = await auth.createEmailVerification(user.id);
    if (!created) return false;
    const message = verifyEmail(created.user.name, `${url.origin}/verify-email/?token=${created.token}`, VERIFY_LINK_HOURS);
    await background(sendEmail(env, {to: created.user.email, ...message}, fetcher));
    return true;
  };
  const ua = request.headers.get('user-agent');

  if (method !== 'GET' && !sameOrigin(request)) return json({code: 'forbidden', message: MESSAGES.forbidden}, 403);

  if (path === '/api/auth/sign-up' && method === 'POST') {
    const result = await auth.signUp(await body(request), ua);
    if (result.ok) await sendVerification(result.user);
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

  if (path === '/api/auth/verify-email' && method === 'POST') {
    const result = await auth.verifyEmail((await body(request)).token);
    return result.ok ? json({ok: true, email: result.user.email}) : json({code: 'invalid_link', message: MESSAGES.invalid_verify_link}, 400);
  }

  const session = await auth.getSession(readCookie(request, SESSION_COOKIE));

  if (path === '/api/auth/session' && method === 'GET') {
    if (!session.user) return json({user: null, reason: session.reason}, 200, session.reason === 'none' ? {} : {'set-cookie': clearCookie(request)});
    const [devices, owned, progress] = await Promise.all([auth.listDevices(session.user.id, session.sessionId), auth.entitlements(session.user.id), auth.progress(session.user.id)]);
    // The house account opens everything.
    const entitlements = session.admin ? [...SUBJECTS] : owned;
    return json({user: session.user, admin: session.admin, devices, entitlements, progress});
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

  // Everything below needs a signed-in account.
  if (!session.user) return json({code: 'signed_out', message: MESSAGES.signed_out}, 401);
  const user = session.user;

  if (path === '/api/auth/resend-verification' && method === 'POST') {
    if (user.emailVerified) return json({ok: true, alreadyVerified: true});
    if (!emailConfigured(env)) return json({code: 'email_unavailable', message: 'Email is not set up yet.'}, 503);
    const sent = await sendVerification(user);
    return sent ? json({ok: true, message: MESSAGES.verify_sent}) : json({code: 'too_many_attempts', message: MESSAGES.verify_limit}, 429);
  }
  if (path === '/api/auth/change-password' && method === 'POST') {
    const result = await auth.changePassword(user.id, session.sessionId, await body(request));
    if (result.ok) return json({ok: true, signedOutDevices: result.signedOutDevices});
    const message = result.code === 'too_many_attempts' ? MESSAGES.too_many_attempts : result.code === 'wrong_password' ? MESSAGES.wrong_password : undefined;
    return json({code: result.code, message, errors: result.errors}, result.status);
  }
  if (path === '/api/progress' && method === 'POST') {
    const ok = await auth.recordProgress(user.id, await body(request));
    return ok ? json({ok: true}) : json({code: 'invalid_input'}, 400);
  }

  // ---------- admin (house account) ----------
  if (path.startsWith('/api/admin/')) {
    if (!session.admin) return json({code: 'admin_only', message: MESSAGES.admin_only}, 403);
    if (path === '/api/admin/users' && method === 'GET') {
      return json({users: await auth.searchUsers(url.searchParams.get('q') ?? '')});
    }
    const input = await body(request);
    const userId = typeof input.userId === 'string' ? input.userId : '';
    const target = userId ? await auth.findUser(userId) : null;
    if (!target) return json({code: 'not_found', message: 'That account no longer exists.'}, 404);
    const productId = typeof input.productId === 'string' ? input.productId : '';
    if (path === '/api/admin/grant' && method === 'POST') {
      if (!SUBJECTS.includes(productId) && !BUNDLES[productId]) return json({code: 'invalid_input', message: 'Unknown subject pack.'}, 400);
      const before = await auth.entitlements(target.id);
      await auth.grant(target.id, productId, 'admin', `by ${user.email}`);
      const added = (await auth.entitlements(target.id)).filter(id => !before.includes(id));
      let emailed = false;
      if (added.length && input.notify !== false && emailConfigured(env)) {
        await background(sendEmail(env, {to: target.email, ...unlockedEmail(target.name, added.map(id => SUBJECT_NAMES[id] ?? id), `${url.origin}/account/`)}, fetcher));
        emailed = true;
      }
      return json({ok: true, added, emailed});
    }
    if (path === '/api/admin/revoke' && method === 'POST') {
      return (await auth.revoke(target.id, productId)) ? json({ok: true}) : json({code: 'not_found', message: 'That account does not have this pack.'}, 404);
    }
    if (path === '/api/admin/sign-out' && method === 'POST') {
      return json({ok: true, signedOutDevices: await auth.signOutEverywhere(target.id)});
    }
  }
  return json({code: 'not_found'}, 404);
}
