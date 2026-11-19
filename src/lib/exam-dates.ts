// Karnataka SSLC Exam 1, March–April 2027 (KSEAB final timetable, released 29 Oct 2026).
// Core papers run 10:00 AM to 1:15 PM IST.
export type ExamSubject = 'science' | 'maths' | 'social-science';

export type Exam = {
  subject: ExamSubject;
  title: string;
  /** Paper start, ISO with IST offset. */
  start: string;
  /** Paper end, ISO with IST offset. */
  end: string;
  href: string;
  /** Shown to students. Fixed text so server and browser render the same. */
  dateLabel: string;
};

export const exams: Exam[] = [
  {subject: 'science', title: 'Science', start: '2027-03-25T10:00:00+05:30', end: '2027-03-25T13:15:00+05:30', href: '/learn/science/', dateLabel: 'Thu, 25 Mar 2027'},
  {subject: 'maths', title: 'Mathematics', start: '2027-03-30T10:00:00+05:30', end: '2027-03-30T13:15:00+05:30', href: '/learn/maths/', dateLabel: 'Tue, 30 Mar 2027'},
  {subject: 'social-science', title: 'Social Science', start: '2027-04-05T10:00:00+05:30', end: '2027-04-05T13:15:00+05:30', href: '/learn/social-science/', dateLabel: 'Mon, 5 Apr 2027'},
];

export type Countdown =
  | {state: 'upcoming'; days: number; hours: number; minutes: number; seconds: number}
  | {state: 'live'}
  | {state: 'done'};

export function countdown(exam: Exam, now: number): Countdown {
  const start = Date.parse(exam.start), end = Date.parse(exam.end);
  if (now >= end) return {state: 'done'};
  if (now >= start) return {state: 'live'};
  let s = Math.floor((start - now) / 1000);
  const days = Math.floor(s / 86400); s -= days * 86400;
  const hours = Math.floor(s / 3600); s -= hours * 3600;
  const minutes = Math.floor(s / 60);
  return {state: 'upcoming', days, hours, minutes, seconds: s - minutes * 60};
}

/** Exam date as shown to students, e.g. "Thu, 25 Mar 2027". */
export function examDate(exam: Exam): string {
  return exam.dateLabel;
}
