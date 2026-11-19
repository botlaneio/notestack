'use client';

import Link from 'next/link';
import {useEffect, useState} from 'react';
import {ArrowRight, BookOpen, ShoppingBag, UserRound, Bookmark, Laptop, LogOut, Info} from 'lucide-react';
import {signOut, signOutDevice, signedOutMessages, useSession, type DeviceSession} from '@/lib/auth-client';
import {products} from '@/lib/catalog';

/** Where each subject pack opens. */
const learnPath: Record<string, string> = {
  mathematics: '/learn/maths/',
  science: '/learn/science/',
  'social-science': '/learn/social-science/',
};

function when(ms: number) {
  return new Intl.DateTimeFormat('en-IN', {day: 'numeric', month: 'short', hour: 'numeric', minute: '2-digit'}).format(ms);
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

  const {user, devices, entitlements} = session;
  const owned = products.filter(p => entitlements.includes(p.id));
  const notOwned = products.filter(p => !entitlements.includes(p.id));
  return <>
    {flash && <div className="auth-service-message account-flash" role="status"><Info size={18}/><p>{flash}</p></div>}
    <section className="account-welcome"><span className="account-avatar"><UserRound size={28} strokeWidth={1.5}/></span><div><h2>Hello, {user.name}.</h2><p>Signed in as {user.email}</p></div><div className="account-actions"><button className="account-signin" onClick={leave} disabled={busy === 'all'}>Sign out <LogOut size={16}/></button></div></section>
    {owned.length > 0 && <section className="account-library" aria-labelledby="library-title">
      <div className="account-library-head"><h2 id="library-title">Your study library</h2><p>{owned.length === products.length ? 'The complete core collection: all three subjects.' : `${owned.length} subject${owned.length > 1 ? 's' : ''} in your stack.`}</p></div>
      <div className={`library-shelf library-count-${owned.length}`}>{owned.map(p => <Link key={p.id} href={learnPath[p.id] ?? '/'} className={`library-book ${p.color}`}>
        <span className="library-cover"><img src={p.image} width="380" height="530" alt=""/></span>
        <span className="library-meta"><small>{p.edition} · English medium</small><strong>{p.title}</strong><span>{p.subtitle}</span><em>Open {p.title} <ArrowRight size={14}/></em></span>
      </Link>)}</div>
      {notOwned.length > 0 && <p className="library-more">Want more? <Link href="/#subjects">Add {notOwned.map(p => p.title).join(' or ')} <ArrowRight size={13}/></Link></p>}
    </section>}
    <div className="account-sections">
      {owned.length === 0 && <article><BookOpen size={23} strokeWidth={1.5}/><h2>Your study library</h2><p>No subject packs yet. Packs you buy will appear here.</p><Link className="text-action" href="/#subjects">Explore subject packs <ArrowRight size={14}/></Link></article>}
      <article><ShoppingBag size={23} strokeWidth={1.5}/><h2>Your orders</h2><p>Order history will appear here when ordering opens.</p></article>
      <article className="account-devices"><Laptop size={23} strokeWidth={1.5}/><h2>Signed-in devices</h2><p>Your account can be signed in on up to 2 devices. Signing in on another device signs out the oldest one.</p>
        <ul className="device-list">{devices.map(d => <li key={d.id}><div><strong>{d.device}{d.current && <em> · This device</em>}</strong><small>Last active {when(d.lastSeenAt)}</small></div><button onClick={() => removeDevice(d)} disabled={busy === d.id}>{d.current ? 'Sign out' : 'Remove'}</button></li>)}</ul>
      </article>
    </div>
  </>;
}
