import test from 'node:test';
import assert from 'node:assert/strict';
import {DatabaseSync} from 'node:sqlite';
import {DAILY_LIMITS, cleanHistory, cleanPage, stacksyChat, systemFor, takeMessage} from '../cloudflare/src/stacksy.ts';
import {handleApi} from '../cloudflare/src/api.ts';

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

function gemini(reply = 'HCF means highest common factor.', status = 200) {
  const calls = [];
  const fetcher = async (url, init) => {
    calls.push({url, init, body: JSON.parse(init.body)});
    return new Response(JSON.stringify({candidates: [{content: {parts: [{text: reply}]}, finishReason: 'STOP'}]}), {status});
  };
  return {calls, fetcher};
}

const ORIGIN = 'https://notestack.shop';
const ask = [{role: 'stacksy', text: 'Hi! What are we studying?'}, {role: 'user', text: 'What is HCF?'}];

test('history keeps the student question last and drops junk', () => {
  assert.deepEqual(cleanHistory(ask), [{role: 'user', text: 'What is HCF?'}]);
  assert.deepEqual(cleanHistory([{role: 'user', text: 'hi'}, {role: 'stacksy', text: 'hello'}]), []);
  assert.deepEqual(cleanHistory('nope'), []);
  assert.equal(cleanHistory([{role: 'user', text: 'x'.repeat(5000)}])[0].text.length, 1500);
  assert.equal(cleanPage({path: 'https://evil', title: 'x'}), null);
  assert.match(systemFor({path: '/learn/maths/real-numbers/', title: 'Real Numbers'}), /Real Numbers/);
});

test('chat sends the key in a header, the page as context, and returns the reply', async () => {
  const {calls, fetcher} = gemini();
  const out = await stacksyChat({db: memoryD1(), env: {GEMINI_API_KEY: 'k'}, input: {messages: ask, page: {path: '/learn/maths/real-numbers/', title: 'Real Numbers'}}, who: 'ip:1', tier: 'guest', now: 0, fetcher});
  assert.equal(out.status, 200);
  assert.equal(out.body.reply, 'HCF means highest common factor.');
  assert.equal(out.body.left, DAILY_LIMITS.guest - 1);
  assert.equal(calls[0].init.headers['x-goog-api-key'], 'k');
  assert.match(calls[0].url, /gemini-flash-latest:generateContent$/);
  assert.equal(calls[0].body.contents[0].role, 'user');
  assert.match(calls[0].body.systemInstruction.parts[0].text, /Real Numbers/);
});

test('without a key Stacksy is resting, and limits stop at the daily allowance', async () => {
  assert.equal((await stacksyChat({db: memoryD1(), env: {}, input: {messages: ask}, who: 'ip:1', tier: 'guest', now: 0})).status, 503);
  const db = memoryD1();
  for (let i = 0; i < DAILY_LIMITS.guest; i++) assert.ok(await takeMessage(db, 'ip:2', 'guest', 0));
  assert.equal(await takeMessage(db, 'ip:2', 'guest', 0), null);
  assert.ok(await takeMessage(db, 'ip:2', 'guest', 86_400_000), 'a new day resets the count');
  const {fetcher} = gemini();
  const out = await stacksyChat({db, env: {GEMINI_API_KEY: 'k'}, input: {messages: ask}, who: 'ip:3', tier: 'guest', now: 0, fetcher});
  assert.equal(out.status, 200);
});

test('a Gemini error does not use up a question', async () => {
  const db = memoryD1();
  const {fetcher} = gemini('', 500);
  const out = await stacksyChat({db, env: {GEMINI_API_KEY: 'k'}, input: {messages: ask}, who: 'ip:4', tier: 'guest', now: 0, fetcher});
  assert.equal(out.status, 502);
  const left = await takeMessage(db, 'ip:4', 'guest', 0);
  assert.equal(left.left, DAILY_LIMITS.guest - 1);
});

test('the API route works for visitors and blocks cross-site posts', async () => {
  const env = {DB: memoryD1(), GEMINI_API_KEY: 'k'};
  const {fetcher} = gemini('Hello!');
  const post = headers => handleApi(new Request(ORIGIN + '/api/stacksy/chat', {method: 'POST', headers: {'content-type': 'application/json', ...headers}, body: JSON.stringify({messages: ask})}), env, {fetcher});
  const ok = await post({origin: ORIGIN, 'cf-connecting-ip': '10.0.0.1'});
  assert.equal(ok.status, 200);
  const data = await ok.json();
  assert.equal(data.reply, 'Hello!');
  assert.equal(data.signedIn, false);
  assert.equal((await post({origin: 'https://evil.example'})).status, 403);
});
