'use client';

import Link from 'next/link';
import {useEffect, useRef, useState, type FormEvent} from 'react';
import {useRouter} from 'next/navigation';
import {Button} from '@astryxdesign/core/Button';
import {TextInput} from '@astryxdesign/core/TextInput';
import {ArrowLeft, ArrowRight, Eye, EyeOff, Info, Check} from 'lucide-react';
import {authUnavailableMessages, validateAuthForm, type AuthErrors, type AuthField, type AuthMode, type AuthValues} from '@/lib/auth-validation';
import {fetchSession, requestPasswordReset, safeNext, signIn, signUp, signedOutMessages} from '@/lib/auth-client';

const copy = {
  'sign-in': {
    eyebrow: 'YOUR NEXT CHAPTER', title: 'Welcome back.',
    intro: 'A little focus. A fresh start. Sign in to your NoteStack account.',
    submit: 'Sign in',
  },
  'sign-up': {
    eyebrow: 'MAKE ROOM FOR UNDERSTANDING', title: 'Start your study stack.',
    intro: 'One account for your next chapter. Let’s start with the essentials.',
    submit: 'Create account',
  },
  'forgot-password': {
    eyebrow: 'LET’S GET YOU BACK ON TRACK', title: 'Forgot your password?',
    intro: 'Enter the email address associated with your NoteStack account to request a reset link.',
    submit: 'Send reset link',
  },
} as const;

export function AuthForm({mode}: {mode: AuthMode}) {
  const [values, setValues] = useState<AuthValues>({name: '', email: '', password: ''});
  const [errors, setErrors] = useState<AuthErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState('');
  const form = useRef<HTMLFormElement>(null);
  const messageRef = useRef<HTMLDivElement>(null);
  const content = copy[mode];

  function change(field: AuthField, value: string) {
    setValues(current => ({...current, [field]: value}));
    setErrors(current => ({...current, [field]: undefined}));
    setMessage('');
  }

  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState('');
  const next = useRef('/account/');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    next.current = safeNext(params.get('next'));
    if (mode === 'forgot-password') return;
    // Explain a sign-out that happened elsewhere, and skip the form if already signed in.
    fetchSession().then(session => {
      if (session.status === 'signed-in') router.replace(next.current);
      else if (session.status === 'signed-out') setNotice(signedOutMessages[session.reason]);
    });
  }, [mode, router]);

  function showMessage(text: string) {
    setMessage(text);
    requestAnimationFrame(() => messageRef.current?.focus());
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy) return;
    const nextErrors = validateAuthForm(mode, values);
    setErrors(nextErrors);
    const firstError = (['name', 'email', 'password'] as const).find(field => nextErrors[field]);
    if (firstError) {
      form.current?.querySelector<HTMLInputElement>(`#auth-${firstError}`)?.focus();
      setMessage('');
      return;
    }
    if (mode === 'forgot-password') {
      setBusy(true);
      const result = await requestPasswordReset(values.email);
      setBusy(false);
      // The server answers the same way whether or not the account exists.
      showMessage(result.message ?? (result.ok ? 'If an account exists for that email, a reset link is on its way.' : authUnavailableMessages['forgot-password']));
      return;
    }
    setBusy(true);
    setMessage('');
    const result = mode === 'sign-up' ? await signUp(values) : await signIn({email: values.email, password: values.password});
    setBusy(false);
    if (result.ok) {
      const query = result.signedOutDevices ? '?signedOutDevices=' + result.signedOutDevices : '';
      router.replace(next.current + (next.current.includes('?') ? query.replace('?', '&') : query));
      return;
    }
    if (result.errors && Object.keys(result.errors).length) {
      setErrors(result.errors);
      const field = (['name', 'email', 'password'] as const).find(f => result.errors?.[f]);
      if (field) form.current?.querySelector<HTMLInputElement>(`#auth-${field}`)?.focus();
      return;
    }
    showMessage(result.message ?? (result.status === 404 || result.status === 0 ? 'Accounts are not available on this preview. Try again on notestack.shop.' : 'Something went wrong. Please try again.'));
  }

  const status = (field: AuthField) => errors[field] ? {type: 'error' as const, message: errors[field]} : undefined;

  return <div className={`auth-form-container auth-${mode}`}>
    <span className="section-kicker">{content.eyebrow}</span>
    <h1>{content.title}</h1>
    <p className="auth-intro">{content.intro}</p>
    <form ref={form} onSubmit={submit} noValidate className="auth-form">
      {mode === 'sign-up' && <TextInput
        id="auth-name" label="Full name" htmlName="name" autoComplete="name"
        placeholder="Your full name" value={values.name} onChange={value => change('name', value)}
        isRequired status={status('name')} statusVariant="attached" width="100%"
      />}
      <TextInput
        id="auth-email" label="Email address" htmlName="email" type="email" autoComplete="email"
        autoCapitalize="none" hasSpellCheck={false} placeholder="you@example.com"
        value={values.email} onChange={value => change('email', value)}
        isRequired status={status('email')} statusVariant="attached" width="100%"
      />
      {mode !== 'forgot-password' && <div className="auth-password-field">
        <TextInput
          id="auth-password" label="Password" htmlName="password" type={showPassword ? 'text' : 'password'}
          autoComplete={mode === 'sign-up' ? 'new-password' : 'current-password'}
          placeholder={mode === 'sign-up' ? 'Create a password' : 'Your password'}
          value={values.password} onChange={value => change('password', value)}
          isRequired status={status('password')} statusVariant="attached" width="100%"
        />
        <button className="auth-password-toggle" type="button" onClick={() => setShowPassword(!showPassword)} aria-label={showPassword ? 'Hide password' : 'Show password'} aria-pressed={showPassword}>
          {showPassword ? <EyeOff size={15}/> : <Eye size={15}/>}<span>{showPassword ? 'Hide' : 'Show'}</span>
        </button>
        {mode === 'sign-up' && <p className={`password-guidance ${values.password.length >= 8 ? 'met' : ''}`}>
          {values.password.length >= 8 ? <Check size={13}/> : <span className="requirement-dot"/>}At least 8 characters
        </p>}
      </div>}
      {mode === 'sign-in' && <div className="auth-recovery-row"><Link href="/forgot-password">Forgot password?</Link></div>}
      {notice && !message && <div className="auth-service-message" role="status"><Info size={18}/><p>{notice}</p></div>}
      <Button type="submit" variant="primary" label={busy ? 'Please wait…' : content.submit} isDisabled={busy} endContent={<ArrowRight size={16}/>} width="100%" className="auth-submit"/>
      {message && <div ref={messageRef} tabIndex={-1} className="auth-service-message" role="status"><Info size={18}/><p>{message}</p></div>}
    </form>
    <div className="auth-switch">{mode === 'sign-in' ? <>New to NoteStack? <Link href="/sign-up">Create an account <ArrowUpRightSmall/></Link></> : mode === 'sign-up' ? <>Already have an account? <Link href="/sign-in">Sign in <ArrowUpRightSmall/></Link></> : <Link href="/sign-in"><ArrowLeft size={14}/>Back to sign in</Link>}</div>
    {mode !== 'forgot-password' && <p className="auth-availability"><span/>Each account can be signed in on up to 2 devices at a time.</p>}
  </div>;
}

function ArrowUpRightSmall() {return <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M4 12L12 4M4 4h8v8" stroke="currentColor" strokeWidth="1.5"/></svg>;}
