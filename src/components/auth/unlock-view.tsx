'use client';

import Link from 'next/link';
import {useEffect, useState} from 'react';
import {ArrowRight, BookOpen, Lock} from 'lucide-react';
import {safeNext, useSession} from '@/lib/auth-client';
import {products} from '@/lib/catalog';
import {BUNDLE_PRICE} from '@/lib/cart.mjs';

/** Where each subject's free chapter is (kept in step with FREE_CHAPTERS in cloudflare/src/auth.ts). */
const freeChapter: Record<string, string> = {
  mathematics: '/learn/maths/real-numbers/',
  science: '/learn/science/chemical-reactions-and-equations/',
  'social-science': '/learn/social-science/the-advent-of-europeans-to-india/',
};
const money = (n: number) => `₹${n.toLocaleString('en-IN')}`;

/** Shown when a student opens a chapter of a subject they do not own. */
export function UnlockView() {
  const session = useSession();
  const [params, setParams] = useState<{subject: string; next: string} | null>(null);
  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    setParams({subject: q.get('subject') ?? '', next: safeNext(q.get('next'))});
  }, []);
  const pack = products.find(p => p.id === params?.subject);
  const next = params?.next ?? '/account/';
  const name = pack?.title ?? 'this subject';

  const owns = session.status === 'signed-in' && pack && session.entitlements.includes(pack.id);
  return <div className="auth-form-container unlock-view">
    <span className="section-kicker"><Lock size={12}/> PART OF THE {name.toUpperCase()} PACK</span>
    {owns ? <>
      <h1>You’re all set.</h1>
      <p className="auth-intro">{name} is in your study library now.</p>
      <a className="unlock-primary" href={next}>Open the chapter <ArrowRight size={16}/></a>
    </> : <>
      <h1>Unlock {name}.</h1>
      <p className="auth-intro">This chapter is part of the {name} pack. Get every {name} chapter for {money(pack?.price ?? 399)}, or all three subjects for {money(BUNDLE_PRICE)}.</p>
      {session.status === 'signed-in'
        ? <p className="unlock-note">You’re signed in as <strong>{session.user.email}</strong>, which doesn’t have {name} yet. Already paid? Ask NoteStack to unlock it for this email.</p>
        : <p className="unlock-note">Already own {name}? Sign in to open it.</p>}
      <div className="unlock-actions">
        {session.status !== 'signed-in' && <Link className="unlock-primary" href={`/sign-in/?next=${encodeURIComponent(next)}`}>Sign in <ArrowRight size={16}/></Link>}
        <Link className={session.status === 'signed-in' ? 'unlock-primary' : 'unlock-secondary'} href="/#subjects">See subject packs <ArrowRight size={16}/></Link>
      </div>
      {pack && freeChapter[pack.id] && <Link className="unlock-free" href={freeChapter[pack.id]}><BookOpen size={16}/>Try the first {name} chapter free</Link>}
    </>}
  </div>;
}
