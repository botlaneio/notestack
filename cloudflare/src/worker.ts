// Cloudflare Worker entry. /api/* runs here; every other request is served from the
// static Next.js export by the assets binding (see runWorkerFirst in cloudflare.config.ts).
import {handleApi, type ApiEnv} from './api.ts';

interface Env extends ApiEnv {
  ASSETS: {fetch(request: Request): Promise<Response>};
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
    return env.ASSETS.fetch(request);
  },
};
