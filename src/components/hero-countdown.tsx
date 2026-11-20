'use client';

import {useEffect, useState} from 'react';
import {exams as examTimetable, type ExamSubject} from '@/lib/exam-dates';
import styles from './hero-countdown.module.css';

export interface CountdownExam {
  subject: ExamSubject | string;
  /** Short subject name, e.g. "Science". */
  label: string;
  /** Paper start, ISO with IST offset, e.g. "2027-03-25T10:00:00+05:30". */
  date: string;
}

const SHORT_LABEL: Record<ExamSubject, string> = {science: 'Science', maths: 'Maths', 'social-science': 'Social Sci'};

/** Defaults come from the shared KSEAB timetable in lib/exam-dates. */
export const defaultCountdownExams: CountdownExam[] = examTimetable.map(e => ({subject: e.subject, label: SHORT_LABEL[e.subject], date: e.start}));

const IST_OFFSET_MS = 5.5 * 60 * 60 * 1000;
const DAY_MS = 86_400_000;
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/** Day number in IST (days since epoch, counted from IST midnight). */
const istDay = (ms: number) => Math.floor((ms + IST_OFFSET_MS) / DAY_MS);

/** "25 Mar" from the IST calendar date of the paper. Plain arithmetic, so server and browser agree. */
function shortDate(iso: string) {
  const d = new Date(istDay(Date.parse(iso)) * DAY_MS);
  return `${d.getUTCDate()} ${MONTHS[d.getUTCMonth()]}`;
}

/** Calendar days from today (IST) to the exam day (IST). 0 is exam day, negative is past. */
export function daysUntil(iso: string, now: number) {
  return istDay(Date.parse(iso)) - istDay(now);
}

/** Current time, set after mount; re-read at each IST midnight and when the tab becomes visible. */
function useIstDayClock() {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const tick = () => {
      const t = Date.now();
      setNow(t);
      clearTimeout(timer);
      // One second past the next IST midnight.
      timer = setTimeout(tick, (istDay(t) + 1) * DAY_MS - IST_OFFSET_MS - t + 1000);
    };
    const onVisible = () => {if (document.visibilityState === 'visible') tick();};
    tick();
    document.addEventListener('visibilitychange', onVisible);
    return () => {clearTimeout(timer); document.removeEventListener('visibilitychange', onVisible);};
  }, []);
  return now;
}

function Tile({exam, now}: {exam: CountdownExam; now: number | null}) {
  const where = `${exam.label} · ${shortDate(exam.date)}`;
  const days = now === null ? null : daysUntil(exam.date, now);
  if (days !== null && days < 0) return <li className={`${styles.tile} ${styles.done}`}><strong>Done</strong><span>{where}</span></li>;
  if (days === 0) return <li className={`${styles.tile} ${styles.today}`}><strong>Today</strong><span>{where}</span></li>;
  return <li className={styles.tile}>
    <strong>{days ?? '--'} {days === 1 ? 'day' : 'days'}</strong>
    <span>to {where}</span>
  </li>;
}

/** Small tiles with calendar days left to each paper, counted in IST. */
export function HeroCountdown({exams = defaultCountdownExams, className}: {exams?: CountdownExam[]; className?: string}) {
  const now = useIstDayClock();
  return <ul className={`${styles.tiles}${className ? ` ${className}` : ''}`} aria-label="Days left to your SSLC exams">
    {exams.map(e => <Tile key={e.subject} exam={e} now={now}/>)}
  </ul>;
}
