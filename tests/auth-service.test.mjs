import test from 'node:test';
import assert from 'node:assert/strict';
import {DatabaseSync} from 'node:sqlite';
import {AuthService, MAX_DEVICES, MAX_FAILED_SIGN_INS, hashPassword, verifyPassword, describeDevice, lessonPath} from '../cloudflare/src/auth.ts';
import {serveLesson} from '../cloudflare/src/gate.ts';
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
  const all = [];
  const fetcher = async (url, init) => {all.push({url, headers: init.headers, body: JSON.parse(init.body)}); return new Response('{"id":"x"}', {status: 200});};
  // Password reset tests look only at reset emails; sign-up also sends a confirmation email.
  const sent = new Proxy([], {get: (_, key) => Reflect.get(all.filter(m => m.body.subject.startsWith('Reset')), key)});
  return {sent, all, fetcher};
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

// ---------- email confirmation ----------
test('confirm email: sign-up sends a link; opening it confirms the account', async () => {
  const {all, fetcher} = fakeResend();
  const env = {DB: memoryD1(), RESEND_API_KEY: 're_test'};
  const cookie = cookieOf(await apiCall(env, fetcher, '/api/auth/sign-up', {body: student}));
  assert.equal(all.length, 1);
  assert.match(all[0].body.subject, /Confirm your email/);
  assert.match(all[0].body.text, /https:\/\/notestack\.shop\/verify-email\/\?token=/);
  let session = await (await call(env, '/api/auth/session', {cookie})).json();
  assert.equal(session.user.emailVerified, false);
  assert.equal((await (await apiCall(env, fetcher, '/api/auth/verify-email', {body: {token: 'f'.repeat(64)}})).json()).code, 'invalid_link');
  const ok = await apiCall(env, fetcher, '/api/auth/verify-email', {body: {token: linkToken(all[0])}});
  assert.equal(ok.status, 200);
  session = await (await call(env, '/api/auth/session', {cookie})).json();
  assert.equal(session.user.emailVerified, true);
  // Already confirmed: resending does nothing.
  assert.equal((await (await apiCall(env, fetcher, '/api/auth/resend-verification', {cookie})).json()).alreadyVerified, true);
  assert.equal(all.length, 1);
});

test('confirm email: resends are limited, need a session, and a password reset also confirms', async () => {
  const {all, fetcher} = fakeResend();
  const env = {DB: memoryD1(), RESEND_API_KEY: 're_test'};
  const cookie = cookieOf(await apiCall(env, fetcher, '/api/auth/sign-up', {body: student}));
  assert.equal((await apiCall(env, fetcher, '/api/auth/resend-verification', {})).status, 401);
  assert.equal((await apiCall(env, fetcher, '/api/auth/resend-verification', {cookie})).status, 200);
  assert.equal((await apiCall(env, fetcher, '/api/auth/resend-verification', {cookie})).status, 200);
  assert.equal((await apiCall(env, fetcher, '/api/auth/resend-verification', {cookie})).status, 429);
  await apiCall(env, fetcher, '/api/auth/forgot-password', {body: {email: student.email}});
  const reset = all.find(m => m.body.subject.startsWith('Reset'));
  const after = cookieOf(await apiCall(env, fetcher, '/api/auth/reset-password', {body: {token: linkToken(reset), password: 'fresh password'}}));
  assert.equal((await (await call(env, '/api/auth/session', {cookie: after})).json()).user.emailVerified, true);
});

test('schema: an older users table without the confirmation column is upgraded', async () => {
  const db = memoryD1();
  await db.prepare('CREATE TABLE users (id TEXT PRIMARY KEY, email TEXT NOT NULL UNIQUE, name TEXT NOT NULL, password_hash TEXT NOT NULL, created_at INTEGER NOT NULL)').run();
  const auth = new AuthService(db);
  const result = await auth.signUp(student, PHONE);
  assert.equal(result.ok, true);
  assert.equal(result.user.emailVerified, false);
});

// ---------- change password ----------
test('change password: checks the current password and signs out other devices', async () => {
  const env = {DB: memoryD1()};
  const phone = cookieOf(await call(env, '/api/auth/sign-up', {method: 'POST', body: student}));
  const laptop = cookieOf(await call(env, '/api/auth/sign-in', {method: 'POST', body: student, ua: LAPTOP}));
  const wrong = await call(env, '/api/auth/change-password', {method: 'POST', cookie: phone, body: {currentPassword: 'not it at all', newPassword: 'better password'}});
  assert.equal(wrong.status, 401);
  assert.equal((await wrong.json()).errors.currentPassword, 'That is not your current password.');
  const short = await call(env, '/api/auth/change-password', {method: 'POST', cookie: phone, body: {currentPassword: student.password, newPassword: 'short'}});
  assert.equal(short.status, 400);
  const ok = await call(env, '/api/auth/change-password', {method: 'POST', cookie: phone, body: {currentPassword: student.password, newPassword: 'better password'}});
  assert.equal((await ok.json()).signedOutDevices, 1);
  assert.equal((await (await call(env, '/api/auth/session', {cookie: phone})).json()).user.name, 'Asha Rao');
  assert.deepEqual(await (await call(env, '/api/auth/session', {cookie: laptop})).json(), {user: null, reason: 'password_reset'});
  assert.equal((await call(env, '/api/auth/sign-in', {method: 'POST', body: {email: student.email, password: 'better password'}})).status, 200);
  assert.equal((await call(env, '/api/auth/change-password', {method: 'POST', body: {currentPassword: 'x', newPassword: 'better password'}})).status, 401);
});

// ---------- chapter progress ----------
test('progress: chapter visits and "done" marks are saved per account', async () => {
  let clock = 1_800_000_000_000;
  const env = {DB: memoryD1()};
  const cookie = cookieOf(await handleApi(new Request(ORIGIN + '/api/auth/sign-up', {method: 'POST', headers: {'content-type': 'application/json', origin: ORIGIN}, body: JSON.stringify(student)}), env, {now: () => clock}));
  const post = body => handleApi(new Request(ORIGIN + '/api/progress', {method: 'POST', headers: {'content-type': 'application/json', origin: ORIGIN, cookie}, body: JSON.stringify(body)}), env, {now: () => clock});
  assert.equal((await post({path: '/learn/maths/polynomials/practice/', title: 'Polynomials'})).status, 200);
  clock += 1000;
  assert.equal((await post({path: '/learn/science/electricity/', title: '  Electricity\n'})).status, 200);
  clock += 1000;
  assert.equal((await post({path: '/learn/maths/polynomials/', completed: true})).status, 200);
  assert.equal((await post({path: '/learn/english/poems/'})).status, 400);
  assert.equal((await post({path: '/account/'})).status, 400);
  const {progress} = await (await handleApi(new Request(ORIGIN + '/api/auth/session', {headers: {cookie}}), env, {now: () => clock})).json();
  assert.equal(progress.length, 2);
  assert.deepEqual(progress[0], {path: '/learn/maths/polynomials/', subject: 'mathematics', title: 'Polynomials', lastSeenAt: clock, completedAt: clock});
  assert.equal(progress[1].title, 'Electricity');
  assert.equal(progress[1].completedAt, null);
  await post({path: '/learn/maths/polynomials/', completed: false});
  const again = await (await handleApi(new Request(ORIGIN + '/api/auth/session', {headers: {cookie}}), env, {now: () => clock})).json();
  assert.equal(again.progress[0].completedAt, null);
  assert.equal((await handleApi(new Request(ORIGIN + '/api/progress', {method: 'POST', headers: {'content-type': 'application/json', origin: ORIGIN}, body: '{"path":"/learn/maths/polynomials/"}'}), env)).status, 401);
});

// ---------- lesson lock ----------
test('lesson paths: chapters are recognised; subject lists and their data files are not', () => {
  assert.deepEqual(lessonPath('/learn/maths/polynomials/practice/'), {area: 'maths', subject: 'mathematics', chapter: 'polynomials', path: '/learn/maths/polynomials/', free: false});
  assert.equal(lessonPath('/learn/maths/real-numbers/').free, true);
  assert.equal(lessonPath('/learn/maths/'), null);
  assert.equal(lessonPath('/learn/maths/index.txt'), null);
  assert.equal(lessonPath('/learn/maths/__next.learn.maths.__PAGE__.txt'), null);
  assert.equal(lessonPath('/learn//MATHS/%70olynomials/').chapter, 'polynomials');
  assert.equal(lessonPath('/learn/science/electricity').subject, 'science');
  assert.equal(lessonPath('/account/'), null);
});

function gateEnv(db = memoryD1(), extra = {}) {
  const served = [];
  return {served, env: {DB: db, ...extra, ASSETS: {fetch: async request => {served.push(new URL(request.url).pathname); return new Response('lesson', {status: 200, headers: {'cache-control': 'public, max-age=3600'}});}}}};
}

test('lesson lock: chapters open only for owners; the chapter list and first chapter are free', async () => {
  const {env, served} = gateEnv();
  const open = (path, cookie) => serveLesson(new Request(ORIGIN + path, {headers: cookie ? {cookie} : {}}), env);
  assert.equal((await open('/learn/maths/')).status, 200);
  assert.equal((await open('/learn/maths/real-numbers/')).status, 200);
  const locked = await open('/learn/maths/polynomials/');
  assert.equal(locked.status, 302);
  assert.equal(locked.headers.get('location'), '/unlock/?subject=mathematics&next=%2Flearn%2Fmaths%2Fpolynomials%2F');
  assert.equal((await open('/learn/maths/polynomials/index.txt')).status, 302);
  assert.equal(served.includes('/learn/maths/polynomials/'), false);

  const cookie = cookieOf(await call(env, '/api/auth/sign-up', {method: 'POST', body: student}));
  const signedIn = await open('/learn/science/electricity/', cookie);
  assert.equal(signedIn.status, 302);
  assert.match(signedIn.headers.get('location'), /subject=science&next=.*&signedIn=1/);
  const auth = new AuthService(env.DB);
  const {user} = await auth.getSession(cookie.split('=')[1]);
  await auth.grant(user.id, 'science', 'test');
  const owned = await open('/learn/science/electricity/', cookie);
  assert.equal(owned.status, 200);
  assert.equal(owned.headers.get('cache-control'), 'private, no-store');
  assert.equal((await open('/learn/maths/polynomials/', cookie)).status, 302);
  await auth.grant(user.id, 'core-collection', 'test');
  assert.equal((await open('/learn/maths/polynomials/', cookie)).status, 200);
});

// ---------- admin ----------
async function adminSetup() {
  const {all, fetcher} = fakeResend();
  const env = {DB: memoryD1(), RESEND_API_KEY: 're_test', ADMIN_EMAILS: 'admin@botlane.io'};
  const req = (path, {method = 'POST', cookie, body, ua} = {}) => handleApi(new Request(ORIGIN + path, {method, headers: {'content-type': 'application/json', origin: ORIGIN, 'user-agent': ua ?? PHONE, ...(cookie ? {cookie} : {})}, body: method === 'GET' ? undefined : JSON.stringify(body ?? {})}), env, {fetcher});
  const admin = cookieOf(await req('/api/auth/sign-up', {body: {name: 'House Account', email: 'Admin@Botlane.io', password: 'house password'}}));
  const studentCookie = cookieOf(await req('/api/auth/sign-up', {body: student}));
  return {env, all, req, admin, studentCookie};
}

test('admin: powers need a confirmed admin email', async () => {
  const {all, req, admin} = await adminSetup();
  let session = await (await req('/api/auth/session', {method: 'GET', cookie: admin})).json();
  assert.equal(session.admin, false);
  assert.deepEqual(session.entitlements, []);
  assert.equal((await req('/api/admin/users?q=asha', {method: 'GET', cookie: admin})).status, 403);
  const confirm = all.find(m => m.body.to[0] === 'admin@botlane.io');
  await req('/api/auth/verify-email', {body: {token: linkToken(confirm)}});
  session = await (await req('/api/auth/session', {method: 'GET', cookie: admin})).json();
  assert.equal(session.admin, true);
  assert.deepEqual(session.entitlements, ['mathematics', 'science', 'social-science']);
});

test('admin: find a student, unlock and remove packs, sign them out; students cannot', async () => {
  const {env, all, req, admin, studentCookie} = await adminSetup();
  await req('/api/auth/verify-email', {body: {token: linkToken(all.find(m => m.body.to[0] === 'admin@botlane.io'))}});
  assert.equal((await req('/api/admin/users?q=', {method: 'GET', cookie: studentCookie})).status, 403);
  const {users} = await (await req('/api/admin/users?q=ASHA', {method: 'GET', cookie: admin})).json();
  assert.equal(users.length, 1);
  assert.equal(users[0].email, 'asha@example.com');
  assert.equal(users[0].activeDevices, 1);
  const id = users[0].id;
  const granted = await (await req('/api/admin/grant', {cookie: admin, body: {userId: id, productId: 'science'}})).json();
  assert.deepEqual(granted, {ok: true, added: ['science'], emailed: true});
  const mail = all.at(-1);
  assert.deepEqual(mail.body.to, ['asha@example.com']);
  assert.match(mail.body.subject, /Science is now unlocked/);
  assert.deepEqual((await (await req('/api/auth/session', {method: 'GET', cookie: studentCookie})).json()).entitlements, ['science']);
  // Granting what they already have sends nothing.
  assert.deepEqual((await (await req('/api/admin/grant', {cookie: admin, body: {userId: id, productId: 'science'}})).json()).added, []);
  assert.equal((await req('/api/admin/grant', {cookie: admin, body: {userId: id, productId: 'english'}})).status, 400);
  assert.equal((await req('/api/admin/revoke', {cookie: admin, body: {userId: id, productId: 'science'}})).status, 200);
  assert.deepEqual((await (await req('/api/auth/session', {method: 'GET', cookie: studentCookie})).json()).entitlements, []);
  assert.equal((await (await req('/api/admin/sign-out', {cookie: admin, body: {userId: id}})).json()).signedOutDevices, 1);
  assert.equal((await (await req('/api/auth/session', {method: 'GET', cookie: studentCookie})).json()).user, null);
  assert.equal((await req('/api/admin/grant', {cookie: admin, body: {userId: 'missing', productId: 'science'}})).status, 404);
  // Search treats % and _ literally.
  assert.equal((await (await req('/api/admin/users?q=%25', {method: 'GET', cookie: admin})).json()).users.length, 0);
  void env;
});

test('admin: the house account opens every lesson and has no device limit', async () => {
  const {env, all, req, admin} = await adminSetup();
  await req('/api/auth/verify-email', {body: {token: linkToken(all.find(m => m.body.to[0] === 'admin@botlane.io'))}});
  const creds = {email: 'admin@botlane.io', password: 'house password'};
  for (const ua of [LAPTOP, 'Mozilla/5.0 (Macintosh; Mac OS X 14_0) Safari/605.1', 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0) Safari/604.1']) {
    assert.equal((await (await req('/api/auth/sign-in', {body: creds, ua})).json()).signedOutDevices, 0);
  }
  assert.equal((await (await req('/api/auth/session', {method: 'GET', cookie: admin})).json()).devices.length, 4);
  const {env: gate} = gateEnv(env.DB, {ADMIN_EMAILS: 'admin@botlane.io'});
  assert.equal((await serveLesson(new Request(ORIGIN + '/learn/social-science/india-soils/', {headers: {cookie: admin}}), gate)).status, 200);
});
