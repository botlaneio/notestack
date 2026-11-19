import test from 'node:test';
import assert from 'node:assert/strict';
import {DatabaseSync} from 'node:sqlite';
import {AuthService, MAX_DEVICES, MAX_FAILED_SIGN_INS, hashPassword, verifyPassword, describeDevice} from '../cloudflare/src/auth.ts';
import {handleApi} from '../cloudflare/src/api.ts';

// Minimal D1-compatible wrapper around Node's in-memory SQLite.
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

const PHONE = 'Mozilla/5.0 (Linux; Android 14) AppleWebKit/537.36 Chrome/130.0 Mobile Safari/537.36';
const LAPTOP = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/130.0 Safari/537.36';
const student = {name: 'Asha Rao', email: 'Asha@Example.com ', password: 'board exam prep'};

test('passwords are salted and verified', async () => {
  const a = await hashPassword('secret-pass', 1000);
  const b = await hashPassword('secret-pass', 1000);
  assert.notEqual(a, b);
  assert.equal(await verifyPassword('secret-pass', a), true);
  assert.equal(await verifyPassword('wrong-pass', a), false);
  assert.equal(await verifyPassword('secret-pass', 'garbage'), false);
});

test('sign up creates one account per email and rejects bad input', async () => {
  const auth = new AuthService(memoryD1());
  const result = await auth.signUp(student, PHONE);
  assert.equal(result.ok, true);
  assert.equal(result.user.email, 'asha@example.com');
  assert.equal(result.user.name, 'Asha Rao');
  assert.equal('password_hash' in result.user, false);
  const again = await auth.signUp({...student, email: 'ASHA@example.com'}, PHONE);
  assert.equal(again.code, 'email_taken');
  const bad = await auth.signUp({name: 'A', email: 'nope', password: 'short'}, PHONE);
  assert.deepEqual(Object.keys(bad.errors).sort(), ['email', 'name', 'password']);
});

test('sign in checks the password and locks after repeated failures', async () => {
  const auth = new AuthService(memoryD1());
  await auth.signUp(student, PHONE);
  assert.equal((await auth.signIn({email: 'asha@example.com', password: 'wrong password'}, PHONE)).code, 'invalid_credentials');
  assert.equal((await auth.signIn({email: 'nobody@example.com', password: 'whatever1'}, PHONE)).code, 'invalid_credentials');
  assert.equal((await auth.signIn({email: ' ASHA@example.com', password: student.password}, PHONE)).ok, true);
  for (let i = 0; i < MAX_FAILED_SIGN_INS; i++) await auth.signIn({email: 'asha@example.com', password: 'wrong'}, PHONE);
  assert.equal((await auth.signIn({email: 'asha@example.com', password: student.password}, PHONE)).code, 'too_many_attempts');
});

test(`only ${MAX_DEVICES} devices stay signed in; the oldest is signed out with a reason`, async () => {
  let clock = 1_800_000_000_000;
  const auth = new AuthService(memoryD1(), () => clock);
  const first = await auth.signUp(student, PHONE);
  clock += 60_000;
  const second = await auth.signIn(student, LAPTOP);
  assert.equal(second.signedOutDevices, 0);
  clock += 60_000;
  const third = await auth.signIn(student, 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0) Safari/604.1');
  assert.equal(third.signedOutDevices, 1);
  assert.deepEqual(await auth.getSession(first.token), {user: null, reason: 'device_limit'});
  const current = await auth.getSession(third.token);
  assert.equal(current.user.email, 'asha@example.com');
  assert.equal((await auth.getSession(second.token)).user.email, 'asha@example.com');
  const devices = await auth.listDevices(current.user.id, current.sessionId);
  assert.equal(devices.length, MAX_DEVICES);
  assert.equal(devices.filter(d => d.current).length, 1);
});

test('sessions expire and can be signed out remotely', async () => {
  let clock = 1_800_000_000_000;
  const auth = new AuthService(memoryD1(), () => clock);
  const phone = await auth.signUp(student, PHONE);
  const laptop = await auth.signIn(student, LAPTOP);
  const phoneSession = await auth.getSession(phone.token);
  const laptopSession = await auth.getSession(laptop.token);
  assert.equal(await auth.signOutSession(phoneSession.user.id, laptopSession.sessionId), true);
  assert.deepEqual(await auth.getSession(laptop.token), {user: null, reason: 'signed_out'});
  clock += 31 * 86_400_000;
  assert.deepEqual(await auth.getSession(phone.token), {user: null, reason: 'expired'});
  assert.deepEqual(await auth.getSession('not-a-real-token'), {user: null, reason: 'none'});
});

test('device labels are readable', () => {
  assert.equal(describeDevice(PHONE), 'Chrome on Android');
  assert.equal(describeDevice(LAPTOP), 'Chrome on Windows');
  assert.equal(describeDevice(null), 'Browser on Unknown device');
});

// ---------- HTTP API ----------
const ORIGIN = 'https://notestack.shop';
function call(env, path, {method = 'GET', body, cookie, ua = PHONE, origin = ORIGIN} = {}) {
  const headers = {'user-agent': ua};
  if (body !== undefined) headers['content-type'] = 'application/json';
  if (cookie) headers.cookie = cookie;
  if (origin) headers.origin = origin;
  return handleApi(new Request(ORIGIN + path, {method, headers, body: body === undefined ? undefined : JSON.stringify(body)}), env);
}
const cookieOf = res => res.headers.get('set-cookie').split(';')[0];

test('API: sign up sets a secure HttpOnly cookie and the session endpoint returns the user', async () => {
  const env = {DB: memoryD1()};
  const res = await call(env, '/api/auth/sign-up', {method: 'POST', body: student});
  assert.equal(res.status, 200);
  const setCookie = res.headers.get('set-cookie');
  assert.match(setCookie, /^ns_session=[0-9a-f]{64};/);
  assert.match(setCookie, /HttpOnly/);
  assert.match(setCookie, /Secure/);
  assert.match(setCookie, /SameSite=Lax/);
  const session = await (await call(env, '/api/auth/session', {cookie: cookieOf(res)})).json();
  assert.equal(session.user.name, 'Asha Rao');
  assert.equal(session.devices.length, 1);
  assert.deepEqual(session.entitlements, []);
  const anonymous = await (await call(env, '/api/auth/session')).json();
  assert.deepEqual(anonymous, {user: null, reason: 'none'});
});

test('API: rejects cross-site and non-JSON posts', async () => {
  const env = {DB: memoryD1()};
  assert.equal((await call(env, '/api/auth/sign-up', {method: 'POST', body: student, origin: 'https://evil.example'})).status, 403);
  const form = await handleApi(new Request(ORIGIN + '/api/auth/sign-in', {method: 'POST', headers: {'content-type': 'application/x-www-form-urlencoded'}, body: 'email=a'}), env);
  assert.equal(form.status, 403);
});

test('API: wrong password, sign out, and removing another device', async () => {
  const env = {DB: memoryD1()};
  const phone = cookieOf(await call(env, '/api/auth/sign-up', {method: 'POST', body: student}));
  const wrong = await call(env, '/api/auth/sign-in', {method: 'POST', body: {email: student.email, password: 'nope nope'}});
  assert.equal(wrong.status, 401);
  assert.match((await wrong.json()).message, /do not match/);
  const laptop = cookieOf(await call(env, '/api/auth/sign-in', {method: 'POST', body: student, ua: LAPTOP}));
  const {devices} = await (await call(env, '/api/auth/session', {cookie: phone})).json();
  const laptopDevice = devices.find(d => !d.current);
  assert.equal(laptopDevice.device, 'Chrome on Windows');
  assert.equal((await call(env, `/api/auth/devices/${laptopDevice.id}`, {method: 'DELETE', cookie: phone, body: {}})).status, 200);
  assert.deepEqual(await (await call(env, '/api/auth/session', {cookie: laptop})).json(), {user: null, reason: 'signed_out'});
  const out = await call(env, '/api/auth/sign-out', {method: 'POST', cookie: phone, body: {}});
  assert.match(out.headers.get('set-cookie'), /Max-Age=0/);
  assert.equal((await (await call(env, '/api/auth/session', {cookie: phone})).json()).user, null);
});

test('API: a third device signs out the first, which learns why', async () => {
  const env = {DB: memoryD1()};
  const first = cookieOf(await call(env, '/api/auth/sign-up', {method: 'POST', body: student}));
  await call(env, '/api/auth/sign-in', {method: 'POST', body: student, ua: LAPTOP});
  const third = await (await call(env, '/api/auth/sign-in', {method: 'POST', body: student, ua: 'Mozilla/5.0 (Macintosh; Mac OS X 14_0) Safari/605.1'})).json();
  assert.equal(third.signedOutDevices, 1);
  const res = await call(env, '/api/auth/session', {cookie: first});
  assert.deepEqual(await res.json(), {user: null, reason: 'device_limit'});
  assert.match(res.headers.get('set-cookie'), /Max-Age=0/);
});

// ---------- password reset ----------
function fakeResend() {
  const sent = [];
  const fetcher = async (url, init) => {sent.push({url, headers: init.headers, body: JSON.parse(init.body)}); return new Response('{"id":"x"}', {status: 200});};
  return {sent, fetcher};
}
const linkToken = mail => mail.body.text.match(/token=([0-9a-f]{64})/)[1];
function apiCall(env, fetcher, path, opts = {}) {
  const headers = {'user-agent': opts.ua ?? PHONE, 'content-type': 'application/json', origin: ORIGIN};
  if (opts.cookie) headers.cookie = opts.cookie;
  return handleApi(new Request(ORIGIN + path, {method: 'POST', headers, body: JSON.stringify(opts.body ?? {})}), env, {fetcher});
}

test('reset: emails a one-time link, sets the new password and signs out every device', async () => {
  const {sent, fetcher} = fakeResend();
  const env = {DB: memoryD1(), RESEND_API_KEY: 're_test', EMAIL_FROM: 'NoteStack <no-reply@notestack.shop>'};
  const phone = cookieOf(await apiCall(env, fetcher, '/api/auth/sign-up', {body: student}));
  const res = await apiCall(env, fetcher, '/api/auth/forgot-password', {body: {email: ' ASHA@example.com'}});
  assert.equal(res.status, 200);
  assert.equal(sent.length, 1);
  assert.equal(sent[0].url, 'https://api.resend.com/emails');
  assert.equal(sent[0].headers.authorization, 'Bearer re_test');
  assert.deepEqual(sent[0].body.to, ['asha@example.com']);
  assert.match(sent[0].body.text, /https:\/\/notestack\.shop\/reset-password\/\?token=/);
  const token = linkToken(sent[0]);

  const short = await apiCall(env, fetcher, '/api/auth/reset-password', {body: {token, password: 'short'}});
  assert.equal(short.status, 400);
  const ok = await apiCall(env, fetcher, '/api/auth/reset-password', {body: {token, password: 'a brand new password'}, ua: LAPTOP});
  assert.equal(ok.status, 200);
  const laptop = cookieOf(ok);
  assert.deepEqual(await (await call(env, '/api/auth/session', {cookie: phone})).json(), {user: null, reason: 'password_reset'});
  assert.equal((await (await call(env, '/api/auth/session', {cookie: laptop})).json()).user.email, 'asha@example.com');
  assert.equal((await apiCall(env, fetcher, '/api/auth/sign-in', {body: student})).status, 401);
  assert.equal((await apiCall(env, fetcher, '/api/auth/sign-in', {body: {email: student.email, password: 'a brand new password'}})).status, 200);
  const replay = await apiCall(env, fetcher, '/api/auth/reset-password', {body: {token, password: 'another password'}});
  assert.equal((await replay.json()).code, 'invalid_link');
});

test('reset: unknown emails get the same answer and no email; requests are rate limited', async () => {
  const {sent, fetcher} = fakeResend();
  const env = {DB: memoryD1(), RESEND_API_KEY: 're_test'};
  await apiCall(env, fetcher, '/api/auth/sign-up', {body: student});
  const unknown = await (await apiCall(env, fetcher, '/api/auth/forgot-password', {body: {email: 'nobody@example.com'}})).json();
  const known = await (await apiCall(env, fetcher, '/api/auth/forgot-password', {body: {email: student.email}})).json();
  assert.deepEqual(unknown, known);
  assert.equal(sent.length, 1);
  for (let i = 0; i < 5; i++) await apiCall(env, fetcher, '/api/auth/forgot-password', {body: {email: student.email}});
  assert.equal(sent.length, 3);
  // Only the newest link works.
  const first = linkToken(sent[0]);
  const last = linkToken(sent[2]);
  assert.equal((await (await apiCall(env, fetcher, '/api/auth/reset-password', {body: {token: first, password: 'new password one'}})).json()).code, 'invalid_link');
  assert.equal((await apiCall(env, fetcher, '/api/auth/reset-password', {body: {token: last, password: 'new password two'}})).status, 200);
});

test('reset: links expire and the endpoint reports when email is not configured', async () => {
  let clock = 1_800_000_000_000;
  const auth = new AuthService(memoryD1(), () => clock);
  await auth.signUp(student, PHONE);
  const reset = await auth.requestPasswordReset(student.email);
  clock += 31 * 60_000;
  assert.equal((await auth.resetPassword({token: reset.token, password: 'too late now'}, PHONE)).code, 'invalid_link');
  const res = await apiCall({DB: memoryD1()}, undefined, '/api/auth/forgot-password', {body: {email: student.email}});
  assert.equal(res.status, 503);
  assert.equal((await res.json()).code, 'email_unavailable');
});

// ---------- owned subjects ----------
test('entitlements: one subject shows only that subject; the full pack shows all three', async () => {
  const auth = new AuthService(memoryD1());
  const one = await auth.signUp(student, PHONE);
  assert.deepEqual(await auth.entitlements(one.user.id), []);
  await auth.grant(one.user.id, 'science', 'test');
  assert.deepEqual(await auth.entitlements(one.user.id), ['science']);
  const all = await auth.signUp({...student, email: 'ravi@example.com'}, PHONE);
  await auth.grant(all.user.id, 'core-collection', 'test');
  assert.deepEqual(await auth.entitlements(all.user.id), ['mathematics', 'science', 'social-science']);
  await auth.grant(all.user.id, 'mathematics', 'test');
  assert.deepEqual(await auth.entitlements(all.user.id), ['mathematics', 'science', 'social-science']);
  await assert.rejects(auth.grant(all.user.id, 'english', 'test'), /Unknown product/);
});
