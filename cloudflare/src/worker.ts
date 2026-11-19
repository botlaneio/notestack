// Cloudflare Worker entry. /api/* and /learn/* run here; every other request is served from
// the static Next.js export by the assets binding (see runWorkerFirst in cloudflare.config.ts).
import {handleApi, type ApiEnv} from './api.ts';
import {serveLesson, type AssetsBinding} from './gate.ts';

interface Env extends ApiEnv {
  ASSETS: AssetsBinding;
}

export default {
  async fetch(request: Request, env: Env, ctx: {waitUntil(promise: Promise<unknown>): void}): Promise<Response> {
    const {pathname} = new URL(request.url);
    if (pathname.startsWith('/api/')) {
      try {
        return await handleApi(request, env, {waitUntil: promise => ctx.waitUntil(promise)});
      } catch (error) {
        console.error('api_error', error);
        return new Response(JSON.stringify({code: 'server_error', message: 'Something went wrong. Please try again.'}), {status: 500, headers: {'content-type': 'application/json'}});
      }
    }
    if (pathname.startsWith('/learn/')) {
      try {
        return await serveLesson(request, env);
      } catch (error) {
        console.error('lesson_gate_error', error);
        return new Response('Something went wrong. Please reload the page.', {status: 500, headers: {'content-type': 'text/plain; charset=utf-8', 'cache-control': 'no-store'}});
      }
    }
    return env.ASSETS.fetch(request);
  },
};
