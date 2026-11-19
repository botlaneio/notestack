import test from 'node:test';
import assert from 'node:assert/strict';
import {exams, countdown, examDate} from '../src/lib/exam-dates.ts';

test('SSLC 2027 core exam dates match the KSEAB Exam 1 timetable', () => {
  assert.deepEqual(exams.map(e => [e.subject, examDate(e)]), [
    ['science', 'Thu, 25 Mar 2027'],
    ['maths', 'Tue, 30 Mar 2027'],
    ['social-science', 'Mon, 5 Apr 2027'],
  ]);
  // The label must agree with the actual start instant in IST.
  for (const e of exams) {
    const d = new Date(Date.parse(e.start) + 5.5 * 3600 * 1000);
    const day = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][d.getUTCDay()];
    const mon = ['Jan', 'Feb', 'Mar', 'Apr'][d.getUTCMonth()];
    assert.equal(examDate(e), `${day}, ${d.getUTCDate()} ${mon} ${d.getUTCFullYear()}`);
    assert.equal(d.getUTCHours(), 10);
  }
});

test('countdown splits the time left and switches to live and done', () => {
  const sci = exams[0];
  const start = Date.parse(sci.start);
  assert.deepEqual(countdown(sci, start - ((2 * 86400 + 3 * 3600 + 4 * 60 + 5) * 1000)), {state: 'upcoming', days: 2, hours: 3, minutes: 4, seconds: 5});
  assert.deepEqual(countdown(sci, start - 999), {state: 'upcoming', days: 0, hours: 0, minutes: 0, seconds: 0});
  assert.deepEqual(countdown(sci, start), {state: 'live'});
  assert.deepEqual(countdown(sci, Date.parse(sci.end)), {state: 'done'});
  // 10:00 AM IST is 04:30 UTC.
  assert.equal(new Date(start).toISOString(), '2027-03-25T04:30:00.000Z');
});
