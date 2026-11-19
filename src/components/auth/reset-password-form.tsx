'use client';

import Link from 'next/link';
import {useEffect, useRef, useState, type FormEvent} from 'react';
import {useRouter} from 'next/navigation';
import {Button} from '@astryxdesign/core/Button';
import {TextInput} from '@astryxdesign/core/TextInput';
import {ArrowLeft, ArrowRight, Check, Eye, EyeOff, Info} from 'lucide-react';
import {resetPassword} from '@/lib/auth-client';

export function ResetPasswordForm() {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [busy, setBusy] = useState(false);
  const messageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const value = new URLSearchParams(window.location.search).get('token') ?? '';
    setToken(value);
    // Keep the one-time token out of history and out of any shared screenshot of the address bar.
    if (value) window.history.replaceState(null, '', window.location.pathname);
  }, []);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy || !token) return;
    if (password.length < 8) {
      setError('Use at least 8 characters for your password.');
      return;
    }
    setBusy(true);
    const result = await resetPassword(token, password);
    setBusy(false);
    if (result.ok) {
      router.replace('/account/');
      return;
    }
    if (result.errors?.password) {
      setError(result.errors.password);
      return;
    }
    setMessage(result.message ?? 'Something went wrong. Please try again.');
    requestAnimationFrame(() => messageRef.current?.focus());
  }

  const missing = token === '';
  return <div className="auth-form-container auth-reset-password">
    <span className="section-kicker">ALMOST THERE</span>
    <h1>Choose a new password.</h1>
    <p className="auth-intro">{missing ? 'This page needs the link from your reset email. Request a new link if you need one.' : 'Pick a password you have not used before. Saving it signs you out on all other devices.'}</p>
    {!missing && <form onSubmit={submit} noValidate className="auth-form">
      <div className="auth-password-field">
        <TextInput
          id="auth-password" label="New password" htmlName="password" type={show ? 'text' : 'password'} autoComplete="new-password"
          placeholder="Create a password" value={password} onChange={value => {setPassword(value); setError(''); setMessage('');}}
          isRequired status={error ? {type: 'error', message: error} : undefined} statusVariant="attached" width="100%"
        />
        <button className="auth-password-toggle" type="button" onClick={() => setShow(!show)} aria-label={show ? 'Hide password' : 'Show password'} aria-pressed={show}>
          {show ? <EyeOff size={15}/> : <Eye size={15}/>}<span>{show ? 'Hide' : 'Show'}</span>
        </button>
        <p className={`password-guidance ${password.length >= 8 ? 'met' : ''}`}>
          {password.length >= 8 ? <Check size={13}/> : <span className="requirement-dot"/>}At least 8 characters
        </p>
      </div>
      <Button type="submit" variant="primary" label={busy ? 'Please wait…' : 'Save new password'} isDisabled={busy || token === null} endContent={<ArrowRight size={16}/>} width="100%" className="auth-submit"/>
      {message && <div ref={messageRef} tabIndex={-1} className="auth-service-message" role="status"><Info size={18}/><p>{message} <Link href="/forgot-password/">Request a new link</Link></p></div>}
    </form>}
    <div className="auth-switch">{missing ? <Link href="/forgot-password/">Request a reset link <ArrowRight size={14}/></Link> : <Link href="/sign-in/"><ArrowLeft size={14}/>Back to sign in</Link>}</div>
  </div>;
}
