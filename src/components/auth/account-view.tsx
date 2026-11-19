'use client';

import Link from 'next/link';
import {useEffect, useState, type FormEvent} from 'react';
import {ArrowRight, BookOpen, ShoppingBag, UserRound, Bookmark, Laptop, LogOut, Info, KeyRound, MailCheck, PlayCircle, ShieldCheck} from 'lucide-react';
import {changePassword, resendVerification, signOut, signOutDevice, signedOutMessages, useSession, type DeviceSession, type ProgressEntry} from '@/lib/auth-client';
import {products} from '@/lib/catalog';

/** Where each subject pack opens. */
const learnPath: Record<string, string> = {
  mathematics: '/learn/maths/',
  science: '/learn/science/',
  'social-science': '/learn/social-science/',
};
const subjectName: Record<string, string> = {mathematics: 'Mathematics', science: 'Science', 'social-science': 'Social Science'};

function when(ms: number) {
  return new Intl.DateTimeFormat('en-IN', {day: 'numeric', month: 'short', hour: 'numeric', minute: '2-digit'}).format(ms);
}
/** "/learn/maths/quadratic-equations/" → "Quadratic equations", for chapters saved before their title was known. */
function prettyChapter(entry: ProgressEntry) {
  if (entry.title) return entry.title;
  const slug = entry.path.split('/').filter(Boolean).pop() ?? '';
  return slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, ' ');
}

function VerifyBanner({email}: {email: string}) {
  const [state, setState] = useState<'idle' | 'busy' | string>('idle');
  async function resend() {
    setState('busy');
    const result = await resendVerification();
    setState(result.ok ? `We sent a new link to ${email}. Check your inbox and spam folder.` : result.message ?? 'Could not send the link. Try again later.');
  }
  return <div className="auth-service-message account-flash verify-banner" role="status">
    <MailCheck size={18}/>
    <p>Please confirm your email, <strong>{email}</strong>. We sent you a link when you signed up. Confirming makes sure password reset links and receipts reach you.{' '}
      {state === 'idle' || state === 'busy'
        ? <button type="button" onClick={resend} disabled={state === 'busy'}>{state === 'busy' ? 'Sending…' : 'Send the link again'}</button>
        : <span className="verify-result">{state}</span>}
    </p>
  </div>;
}

function ChangePasswordCard() {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState('');
  const [next, setNext] = useState('');
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<{ok: boolean; text: string} | null>(null);
  async function submit(event: FormEvent) {
    event.preventDefault();
    if (busy) return;
    if (next.length < 8) {setMessage({ok: false, text: 'Use at least 8 characters for your new password.'}); return;}
    setBusy(true);
    const result = await changePassword(current, next);
    setBusy(false);
    if (result.ok) {
      setCurrent(''); setNext(''); setOpen(false);
      const n = result.signedOutDevices ?? 0;
      setMessage({ok: true, text: `Password changed.${n ? ` ${n === 1 ? 'Your other device was' : `${n} other devices were`} signed out.` : ''}`});
      return;
    }
    setMessage({ok: false, text: result.errors?.currentPassword ?? result.errors?.newPassword ?? result.message ?? 'Something went wrong. Please try again.'});
  }
  return <article className="account-password"><KeyRound size={23} strokeWidth={1.5}/><h2>Password</h2>
    <p>Changing your password signs you out on every other device.</p>
    {open ? <form onSubmit={submit} className="password-form" noValidate>
      <label>Current password<input type="password" autoComplete="current-password" value={current} onChange={e => {setCurrent(e.target.value); setMessage(null);}} required/></label>
      <label>New password<input type="password" autoComplete="new-password" value={next} onChange={e => {setNext(e.target.value); setMessage(null);}} required minLength={8}/><small>At least 8 characters</small></label>
      <div className="password-actions"><button type="submit" className="password-save" disabled={busy}>{busy ? 'Saving…' : 'Save new password'}</button><button type="button" onClick={() => {setOpen(false); setMessage(null);}}>Cancel</button></div>
    </form> : <button type="button" className="text-action password-open" onClick={() => {setOpen(true); setMessage(null);}}>Change password <ArrowRight size={14}/></button>}
    {message && <p className={`password-message ${message.ok ? 'ok' : 'error'}`} role="status">{message.text}</p>}
  </article>;
}

export function AccountView() {
  const session = useSession();
  const [busy, setBusy] = useState<string | null>(null);
  const [flash, setFlash] = useState('');

  useEffect(() => {
    const n = Number(new URLSearchParams(window.location.search).get('signedOutDevices'));
    if (n > 0) setFlash(`You signed in on a new device, so ${n === 1 ? 'your oldest device was' : `${n} older devices were`} signed out. Each account can be used on 2 devices at a time.`);
  }, []);

  async function removeDevice(device: DeviceSession) {
    setBusy(device.id);
    await signOutDevice(device.id);
    setBusy(null);
    if (device.current) window.location.assign('/sign-in/');
  }
  async function leave() {
    setBusy('all');
    await signOut();
    window.location.assign('/');
  }

  if (session.status === 'loading') {
    return <section className="account-welcome" aria-busy="true"><span className="account-avatar"><UserRound size={28} strokeWidth={1.5}/></span><div><h2>Loading your account…</h2></div></section>;
  }

  if (session.status === 'signed-out') {
    const note = signedOutMessages[session.reason];
    return <>
      {note && <div className="auth-service-message account-flash" role="status"><Info size={18}/><p>{note}</p></div>}
      <section className="account-welcome"><span className="account-avatar"><UserRound size={28} strokeWidth={1.5}/></span><div><h2>Let’s start with you.</h2><p>Sign in or create an account to keep your study progress and, soon, your subject packs in one place.</p></div><div className="account-actions"><Link className="account-signin" href="/sign-in/?next=/account/">Sign in <ArrowRight size={16}/></Link><Link href="/sign-up/">Create account ↗</Link></div></section>
      <div className="account-sections">{[[BookOpen, 'Your study library', 'Your subject packs will live here once purchases open.'], [ShoppingBag, 'Your orders', 'Order history will appear here when ordering opens.'], [Bookmark, 'Your saved packs', 'Explore the store and save the subjects you want to come back to.']].map(([Icon, title, description]) => {const Glyph = Icon as typeof BookOpen; return <article key={title as string}><Glyph size={23} strokeWidth={1.5}/><h2>{title as string}</h2><p>{description as string}</p></article>;})}</div>
    </>;
  }

  const {user, devices, entitlements, progress, admin} = session;
  const owned = products.filter(p => entitlements.includes(p.id));
  const notOwned = products.filter(p => !entitlements.includes(p.id));
  const doneIn = (subject: string) => progress.filter(p => p.subject === subject && p.completedAt).length;
  // The most recent chapter the student can still open.
  const last = progress.find(p => entitlements.includes(p.subject) || /\/(real-numbers|chemical-reactions-and-equations|the-advent-of-europeans-to-india)\/$/.test(p.path));
  return <>
    {flash && <div className="auth-service-message account-flash" role="status"><Info size={18}/><p>{flash}</p></div>}
    {!user.emailVerified && <VerifyBanner email={user.email}/>}
    <section className="account-welcome"><span className="account-avatar"><UserRound size={28} strokeWidth={1.5}/></span><div><h2>Hello, {user.name}.</h2><p>Signed in as {user.email}</p></div><div className="account-actions"><button className="account-signin" onClick={leave} disabled={busy === 'all'}>Sign out <LogOut size={16}/></button></div></section>
    {last && <Link className="continue-card" href={last.path}>
      <PlayCircle size={30} strokeWidth={1.4}/>
      <span><small>CONTINUE WHERE YOU LEFT OFF · {subjectName[last.subject]?.toUpperCase()}</small><strong>{prettyChapter(last)}</strong><em>Last opened {when(last.lastSeenAt)}{last.completedAt ? ' · marked done' : ''}</em></span>
      <ArrowRight size={18}/>
    </Link>}
    {owned.length > 0 && <section className="account-library" aria-labelledby="library-title">
      <div className="account-library-head"><h2 id="library-title">Your study library</h2><p>{admin ? 'House account: every subject is open.' : owned.length === products.length ? 'The complete core collection: all three subjects.' : `${owned.length} subject${owned.length > 1 ? 's' : ''} in your stack.`}</p></div>
      <div className={`library-shelf library-count-${owned.length}`}>{owned.map(p => {const done = doneIn(p.id); return <Link key={p.id} href={learnPath[p.id] ?? '/'} className={`library-book ${p.color}`}>
        <span className="library-cover"><img src={p.image} width="380" height="530" alt=""/></span>
        <span className="library-meta"><small>{p.edition} · English medium</small><strong>{p.title}</strong><span>{p.subtitle}</span><span className="library-progress">{done ? `${done} chapter${done > 1 ? 's' : ''} done` : 'No chapters marked done yet'}</span><em>Open {p.title} <ArrowRight size={14}/></em></span>
      </Link>;})}</div>
      {notOwned.length > 0 && <p className="library-more">Want more? <Link href="/#subjects">Add {notOwned.map(p => p.title).join(' or ')} <ArrowRight size={13}/></Link></p>}
    </section>}
    <div className="account-sections">
      {admin && <article className="account-admin"><ShieldCheck size={23} strokeWidth={1.5}/><h2>Admin</h2><p>Look up students, unlock subjects for them and sign out their devices. This account has no device limit.</p><Link className="text-action" href="/admin/">Open admin <ArrowRight size={14}/></Link></article>}
      {owned.length === 0 && <article><BookOpen size={23} strokeWidth={1.5}/><h2>Your study library</h2><p>No subject packs yet. Packs you buy will appear here. The first chapter of each subject is free to try.</p><Link className="text-action" href="/#subjects">Explore subject packs <ArrowRight size={14}/></Link></article>}
      <article><ShoppingBag size={23} strokeWidth={1.5}/><h2>Your orders</h2><p>Order history will appear here when ordering opens.</p></article>
      <article className="account-devices"><Laptop size={23} strokeWidth={1.5}/><h2>Signed-in devices</h2><p>{admin ? 'The house account can be signed in on any number of devices.' : 'Your account can be signed in on up to 2 devices. Signing in on another device signs out the oldest one.'}</p>
        <ul className="device-list">{devices.map(d => <li key={d.id}><div><strong>{d.device}{d.current && <em> · This device</em>}</strong><small>Last active {when(d.lastSeenAt)}</small></div><button onClick={() => removeDevice(d)} disabled={busy === d.id}>{d.current ? 'Sign out' : 'Remove'}</button></li>)}</ul>
      </article>
      <ChangePasswordCard/>
    </div>
  </>;
}
