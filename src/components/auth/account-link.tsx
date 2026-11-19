'use client';

import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {useEffect, useState} from 'react';
import {ArrowUpRight, Check, CircleCheck, UserRound} from 'lucide-react';
import {chapterPath, markChapter, recordProgress, useSession} from '@/lib/auth-client';

/** Header link: "Sign in" when signed out, the student's first name when signed in. */
export function AccountLink() {
  const session = useSession();
  if (session.status === 'signed-in') {
    return <Link className="icon-button signin-link" href="/account/"><UserRound size={15}/><span>{session.user.name.split(' ')[0]}</span></Link>;
  }
  return <Link className="icon-button signin-link" href="/sign-in/"><span>Sign in</span><ArrowUpRight size={15}/></Link>;
}

/** "Polynomials — guided chapter | NoteStack" → "Polynomials". */
function chapterTitle(): string | undefined {
  const title = document.title.split(' | ')[0].split(' — ')[0].trim();
  return title && title !== 'NoteStack' ? title : undefined;
}

/**
 * Lesson pages: shows who is signed in (so a shared login is visible to whoever uses it),
 * remembers the chapter for "Continue where you left off", and lets the student mark it done.
 */
export function StudentBadge() {
  const session = useSession();
  const pathname = usePathname();
  const chapter = chapterPath(pathname ?? '');
  const signedIn = session.status === 'signed-in';
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!signedIn || !chapter) return;
    // Wait for the page title to update after navigation. Sub-pages (practice, check) keep the chapter's saved title.
    const onChapterHome = pathname?.replace(/\/?$/, '/') === chapter;
    const timer = window.setTimeout(() => {void recordProgress(chapter, onChapterHome ? {title: chapterTitle()} : {});}, 1500);
    return () => window.clearTimeout(timer);
  }, [signedIn, chapter, pathname]);

  if (session.status !== 'signed-in') return null;
  const done = Boolean(chapter && session.progress.find(p => p.path === chapter)?.completedAt);
  async function toggle() {
    if (!chapter || busy) return;
    setBusy(true);
    await markChapter(chapter, !done);
    setBusy(false);
  }
  return <div className="student-dock">
    {chapter && <button type="button" className={`chapter-done ${done ? 'done' : ''}`} onClick={toggle} disabled={busy} aria-pressed={done}>
      {done ? <><CircleCheck size={14}/>Chapter done</> : <><Check size={14}/>Mark chapter done</>}
    </button>}
    <Link href="/account/" className="student-badge" aria-label={`Signed in as ${session.user.name}. Open your account.`}>
      <UserRound size={13}/><span>{session.user.name}</span><small>{session.user.email}</small>
    </Link>
  </div>;
}
