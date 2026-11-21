import test from 'node:test';
import assert from 'node:assert/strict';
import {DatabaseSync} from 'node:sqlite';
import {DAILY_LIMITS, stacksyVoice, takeCall} from '../cloudflare/src/stacksy.ts';
import {handleApi} from '../cloudflare/src/api.ts';
import {resolveNavigation, cleanTitle} from '../src/lib/stacksy-pages.ts';

function memoryD1() {
  const db = new DatabaseSync(':memory:');
  const statement = (sql, values = []) => ({
    bind: (...next) => statement(sql, next),
    first: async () => db.prepare(sql).get(...values) ?? null,
    all: async () => ({results: db.prepare(sql).all(...values)}),
    run: async () => db.prepare(sql).run(...values),
  });
  return {prepare: sql => statement(sql), batch: async list => Promise.all(list.map(s => s.run()))};
}

function elevenlabs(status = 200, token = 'tok_123') {
  const calls = [];
  const fetcher = async (url, init) => {
    calls.push({url, init});
    return new Response(JSON.stringify(status === 200 ? {token} : {detail: 'nope'}), {status});
  };
  return {calls, fetcher};
}

const ORIGIN = 'https://notestack.shop';
const ENV = {ELEVENLABS_API_KEY: 'xi', STACKSY_AGENT_ID: 'agent_1'};

test('a voice call gets a token with the key kept in the Worker', async () => {
  const {calls, fetcher} = elevenlabs();
  const out = await stacksyVoice({db: memoryD1(), env: ENV, who: 'ip:1', tier: 'guest', now: 0, fetcher});
  assert.equal(out.status, 200);
  assert.equal(out.body.token, 'tok_123');
  assert.equal(out.body.left, DAILY_LIMITS.guest - 1);
  assert.equal(calls[0].init.headers['xi-api-key'], 'xi');
  assert.match(calls[0].url, /\/v1\/convai\/conversation\/token\?agent_id=agent_1$/);
});

test('without a key Stacksy is resting, and limits stop at the daily allowance', async () => {
  assert.equal((await stacksyVoice({db: memoryD1(), env: {}, who: 'ip:1', tier: 'guest', now: 0})).status, 503);
  const db = memoryD1();
  for (let i = 0; i < DAILY_LIMITS.guest; i++) assert.ok(await takeCall(db, 'ip:2', 'guest', 0));
  assert.equal(await takeCall(db, 'ip:2', 'guest', 0), null);
  const {fetcher} = elevenlabs();
  const blocked = await stacksyVoice({db, env: ENV, who: 'ip:2', tier: 'guest', now: 0, fetcher});
  assert.equal(blocked.status, 429);
  assert.equal(blocked.body.code, 'guest_limit');
  assert.ok(await takeCall(db, 'ip:2', 'guest', 86_400_000), 'a new day resets the count');
  assert.ok(await takeCall(db, 'user:9', 'admin', 0), 'admins have no limit');
});

test('an ElevenLabs error does not use up a call', async () => {
  const db = memoryD1();
  const {fetcher} = elevenlabs(401);
  const out = await stacksyVoice({db, env: ENV, who: 'ip:4', tier: 'guest', now: 0, fetcher});
  assert.equal(out.status, 502);
  assert.equal(out.body.detail, 'elevenlabs_401');
  assert.equal((await takeCall(db, 'ip:4', 'guest', 0)).left, DAILY_LIMITS.guest - 1);
});

test('the API route works for visitors and blocks cross-site posts', async () => {
  const env = {DB: memoryD1(), ...ENV};
  const {fetcher} = elevenlabs();
  const post = headers => handleApi(new Request(ORIGIN + '/api/stacksy/voice', {method: 'POST', headers: {'content-type': 'application/json', ...headers}, body: '{}'}), env, {fetcher});
  const ok = await post({origin: ORIGIN, 'cf-connecting-ip': '10.0.0.1'});
  assert.equal(ok.status, 200);
  assert.equal(ok.headers.get('cache-control'), 'no-store');
  const data = await ok.json();
  assert.equal(data.token, 'tok_123');
  assert.equal(data.signedIn, false);
  assert.equal((await post({origin: 'https://evil.example'})).status, 403);
});

test('Stacksy only opens real pages the student can open', () => {
  assert.deepEqual(resolveNavigation('/flashcards', null), {ok: true, path: '/flashcards/'});
  assert.deepEqual(resolveNavigation('/', null), {ok: true, path: '/'});
  assert.deepEqual(resolveNavigation('learn/maths/real-numbers', null), {ok: true, path: '/learn/maths/real-numbers/'});
  assert.deepEqual(resolveNavigation('https://notestack.shop/learn/science/', null), {ok: true, path: '/learn/science/'});
  assert.equal(resolveNavigation('/learn/maths/quadratic-equations/', null).reason, 'locked');
  assert.equal(resolveNavigation('/learn/maths/quadratic-equations/', ['science']).reason, 'locked');
  assert.equal(resolveNavigation('/learn/maths/quadratic-equations/', ['mathematics']).ok, true);
  assert.equal(resolveNavigation('/learn/maths/quadratic-equations/', ['core-collection']).ok, true);
  assert.equal(resolveNavigation('/learn/maths/made-up/', ['mathematics']).reason, 'unknown');
  assert.equal(resolveNavigation('/admin/', ['mathematics']).reason, 'unknown');
  assert.equal(resolveNavigation('https://evil.example/', null).reason, 'unknown');
  assert.equal(resolveNavigation(42, null).ok, false);
  assert.equal(cleanTitle('Polynomials — guided chapter | NoteStack'), 'Polynomials');
  assert.equal(cleanTitle('NoteStack — Make room for understanding'), 'Home');
});
