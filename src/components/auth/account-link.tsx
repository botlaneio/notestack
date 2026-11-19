'use client';

import Link from 'next/link';
import {ArrowUpRight, UserRound} from 'lucide-react';
import {useSession} from '@/lib/auth-client';

/** Header link: "Sign in" when signed out, the student's first name when signed in. */
export function AccountLink() {
  const session = useSession();
  if (session.status === 'signed-in') {
    return <Link className="icon-button signin-link" href="/account/"><UserRound size={15}/><span>{session.user.name.split(' ')[0]}</span></Link>;
  }
  return <Link className="icon-button signin-link" href="/sign-in/"><span>Sign in</span><ArrowUpRight size={15}/></Link>;
}

/** Shows who is signed in on lesson pages, so a shared login is visible to whoever uses it. */
export function StudentBadge() {
  const session = useSession();
  if (session.status !== 'signed-in') return null;
  return <Link href="/account/" className="student-badge" aria-label={`Signed in as ${session.user.name}. Open your account.`}>
    <UserRound size={13}/><span>{session.user.name}</span><small>{session.user.email}</small>
  </Link>;
}
