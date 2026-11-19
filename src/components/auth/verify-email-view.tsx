'use client';

import Link from 'next/link';
import {useEffect, useState} from 'react';
import {ArrowRight, CircleCheck, Info} from 'lucide-react';
import {verifyEmailToken} from '@/lib/auth-client';

/** Opened from the confirmation email. Confirms the address and removes the token from the address bar. */
export function VerifyEmailView() {
  const [state, setState] = useState<{status: 'working'} | {status: 'done'; email: string} | {status: 'failed'; message: string}>({status: 'working'});
  useEffect(() => {
    const token = new URLSearchParams(window.location.search).get('token') ?? '';
    if (token) window.history.replaceState(null, '', window.location.pathname);
    if (!token) {
      setState({status: 'failed', message: 'This page needs the link from your confirmation email.'});
      return;
    }
    verifyEmailToken(token).then(result => setState(result.ok
      ? {status: 'done', email: String(result.data?.email ?? '')}
      : {status: 'failed', message: result.message ?? 'Something went wrong. Please try again.'}));
  }, []);

  return <div className="auth-form-container">
    <span className="section-kicker">YOUR EMAIL</span>
    {state.status === 'working' && <><h1>Confirming…</h1><p className="auth-intro">One moment.</p></>}
    {state.status === 'done' && <>
      <h1>Email confirmed.</h1>
      <p className="auth-intro verify-ok"><CircleCheck size={18}/>{state.email ? `${state.email} is confirmed.` : 'Your email is confirmed.'} Password reset links and receipts will reach you here.</p>
      <Link className="unlock-primary" href="/account/">Go to your account <ArrowRight size={16}/></Link>
    </>}
    {state.status === 'failed' && <>
      <h1>That link didn’t work.</h1>
      <div className="auth-service-message" role="status"><Info size={18}/><p>{state.message}</p></div>
      <Link className="unlock-primary" href="/account/">Go to your account <ArrowRight size={16}/></Link>
    </>}
  </div>;
}
