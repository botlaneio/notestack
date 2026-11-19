// Lesson lock: chapter pages under /learn/ open only for students who own that subject.
// The chapter list of each subject and its first chapter stay open as a free preview.
import {SESSION_COOKIE, lessonPath} from './auth.ts';
import {authFor, readCookie, type ApiEnv} from './api.ts';

export interface AssetsBinding {fetch(request: Request): Promise<Response>}

/** Serves a /learn/ request, or redirects to the unlock page when the student does not own the subject. */
export async function serveLesson(request: Request, env: ApiEnv & {ASSETS: AssetsBinding}, now?: () => number): Promise<Response> {
  const url = new URL(request.url);
  const lesson = lessonPath(url.pathname);
  if (!lesson || lesson.free) return env.ASSETS.fetch(request);

  const token = readCookie(request, SESSION_COOKIE);
  const auth = authFor(env, now);
  const session = token ? await auth.getSession(token) : null;
  const allowed = session?.user ? await auth.canOpen(session.user, lesson.subject) : false;
  if (!allowed) {
    const target = new URL('/unlock/', url.origin);
    target.searchParams.set('subject', lesson.subject);
    target.searchParams.set('next', lesson.path);
    if (session?.user) target.searchParams.set('signedIn', '1');
    return new Response(null, {status: 302, headers: {location: target.pathname + target.search, 'cache-control': 'private, no-store'}});
  }
  const response = await env.ASSETS.fetch(request);
  // Paid pages must never be stored by a shared cache.
  const out = new Response(response.body, response);
  out.headers.set('cache-control', 'private, no-store');
  return out;
}
