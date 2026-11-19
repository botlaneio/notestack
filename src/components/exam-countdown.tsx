'use client';
import Link from 'next/link';
import {useEffect, useState} from 'react';
import {ArrowRight, CalendarDays} from 'lucide-react';
import {exams, countdown, examDate, type Exam, type ExamSubject} from '@/lib/exam-dates';
import styles from './exam-countdown.module.css';

function useNow() {
  // null until mounted, so the static HTML and the first client render match.
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    setNow(Date.now());
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);
  return now;
}

const pad = (n: number) => String(n).padStart(2, '0');

function Units({exam, now}: {exam: Exam; now: number | null}) {
  const c = now === null ? null : countdown(exam, now);
  if (c?.state === 'live') return <p className={styles.message}>Exam in progress. All the best!</p>;
  if (c?.state === 'done') return <p className={styles.message}>Paper done. On to the next one.</p>;
  const parts: [string, string][] = [
    [c ? String(c.days) : '--', 'days'],
    [c ? pad(c.hours) : '--', 'hrs'],
    [c ? pad(c.minutes) : '--', 'min'],
    [c ? pad(c.seconds) : '--', 'sec'],
  ];
  return <div className={styles.units} role="timer" aria-live="off" aria-label={c ? `${c.days} days, ${c.hours} hours, ${c.minutes} minutes until the ${exam.title} exam` : `Countdown to the ${exam.title} exam`}>
    {parts.map(([v, l]) => <span key={l} className={styles.unit}><strong>{v}</strong><small>{l}</small></span>)}
  </div>;
}

function Card({exam, now, link}: {exam: Exam; now: number | null; link: boolean}) {
  return <article className={styles.card}>
    <div className={styles.cardHead}>
      <span className={`${styles.dot} ${styles[exam.subject]}`}/>
      <h3>{exam.title}</h3>
    </div>
    <p className={styles.date}><CalendarDays size={14}/> {examDate(exam)} · 10:00 AM</p>
    <Units exam={exam} now={now}/>
    {link && <Link className={styles.link} href={exam.href}>Open chapters <ArrowRight size={15}/></Link>}
  </article>;
}

/** All three core exams. Used on the homepage and account page. */
export function ExamCountdowns({className = ''}: {className?: string}) {
  const now = useNow();
  return <section className={`${styles.section} ${className}`} aria-labelledby="exam-countdown-title">
    <div className={styles.heading}>
      <span className={styles.kicker}>SSLC EXAM 1 · MARCH 2027</span>
      <h2 id="exam-countdown-title">Your exam countdown.</h2>
      <p>Time left until each core paper starts. Papers run 10:00 AM to 1:15 PM IST.</p>
    </div>
    <div className={styles.grid}>{exams.map(e => <Card key={e.subject} exam={e} now={now} link/>)}</div>
    <p className={styles.source}>Dates from the KSEAB SSLC Exam 1 2027 timetable. Check your hall ticket for the final schedule.</p>
  </section>;
}

/** One subject's exam, for that subject's chapter list. */
export function SubjectExamCountdown({subject}: {subject: ExamSubject}) {
  const now = useNow();
  const exam = exams.find(e => e.subject === subject)!;
  return <div className={styles.strip}>
    <div className={styles.stripCopy}>
      <span className={styles.kicker}>SSLC EXAM 1 · {exam.title.toUpperCase()}</span>
      <p className={styles.date}><CalendarDays size={14}/> {examDate(exam)} · 10:00 AM to 1:15 PM IST</p>
    </div>
    <Units exam={exam} now={now}/>
  </div>;
}
