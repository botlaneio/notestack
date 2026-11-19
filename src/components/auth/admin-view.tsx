'use client';

import Link from 'next/link';
import {useCallback, useEffect, useState, type FormEvent} from 'react';
import {Info, LogOut, MailCheck, Search, X} from 'lucide-react';
import {adminGrant, adminRevoke, adminSearch, adminSignOut, useSession, type AdminUser} from '@/lib/auth-client';

const PACKS: [string, string][] = [['mathematics', 'Maths'], ['science', 'Science'], ['social-science', 'Social Science'], ['core-collection', 'All three']];
const packName = (id: string) => PACKS.find(([p]) => p === id)?.[1] ?? id;
const date = (ms: number) => new Intl.DateTimeFormat('en-IN', {day: 'numeric', month: 'short', year: 'numeric'}).format(ms);

export function AdminView() {
  const session = useSession();
  const [query, setQuery] = useState('');
  const [users, setUsers] = useState<AdminUser[] | null>(null);
  const [busy, setBusy] = useState<string | null>(null);
  const [note, setNote] = useState('');
  const isAdmin = session.status === 'signed-in' && session.admin;

  const search = useCallback(async (q: string) => {
    const result = await adminSearch(q);
    if (!result.ok) setNote(result.message ?? 'Could not load students.');
    setUsers(result.users);
  }, []);
  useEffect(() => {if (isAdmin) void search('');}, [isAdmin, search]);

  async function act(key: string, run: () => Promise<{ok: boolean; message?: string; data?: Record<string, unknown>}>, success: (data: Record<string, unknown>) => string) {
    setBusy(key);
    const result = await run();
    setBusy(null);
    setNote(result.ok ? success(result.data ?? {}) : result.message ?? 'That did not work. Please try again.');
    await search(query);
  }

  if (session.status === 'loading') return <p className="admin-empty">Loading…</p>;
  if (session.status === 'signed-out') return <div className="auth-service-message account-flash"><Info size={18}/><p>Sign in with the house account to use this page. <Link href="/sign-in/?next=/admin/">Sign in</Link></p></div>;
  if (!isAdmin) return <div className="auth-service-message account-flash"><Info size={18}/><p>This page is only for the NoteStack house account.{session.user.email === 'admin@botlane.io' && !session.user.emailVerified ? ' Confirm the email address first, using the link sent to it (or “Send the link again” on your account page).' : ''}</p></div>;

  return <section className="admin">
    <form className="admin-search" role="search" onSubmit={(e: FormEvent) => {e.preventDefault(); void search(query);}}>
      <Search size={17}/><input aria-label="Search students by email or name" placeholder="Search by email or name" value={query} onChange={e => setQuery(e.target.value)}/>
      <button type="submit">Search</button>
    </form>
    {note && <div className="auth-service-message admin-note" role="status"><Info size={18}/><p>{note}</p><button type="button" aria-label="Dismiss" onClick={() => setNote('')}><X size={14}/></button></div>}
    {users === null ? <p className="admin-empty">Loading students…</p> : users.length === 0 ? <p className="admin-empty">No students match “{query}”.</p> : <>
      <p className="admin-count">{users.length === 25 ? 'Showing the 25 newest matches. Search to narrow down.' : `${users.length} student${users.length === 1 ? '' : 's'}`}</p>
      <ul className="admin-list">{users.map(u => {
        const has = new Set(u.products.map(p => p.productId));
        return <li key={u.id}>
          <div className="admin-who">
            <strong>{u.name}</strong>
            <span>{u.email}{u.emailVerified ? <em className="ok"><MailCheck size={12}/> confirmed</em> : <em>not confirmed</em>}</span>
            <small>Joined {date(u.createdAt)} · {u.activeDevices} device{u.activeDevices === 1 ? '' : 's'} signed in{u.lastSeenAt ? ` · last active ${date(u.lastSeenAt)}` : ''} · {u.chaptersDone} chapter{u.chaptersDone === 1 ? '' : 's'} done</small>
          </div>
          <div className="admin-owned">
            {u.products.length === 0 ? <span className="admin-none">No packs</span> : u.products.map(p => <span key={p.productId} className="admin-chip" title={`Added ${date(p.createdAt)} (${p.source})`}>
              {packName(p.productId)}
              <button type="button" aria-label={`Remove ${packName(p.productId)} from ${u.email}`} disabled={busy !== null} onClick={() => {if (window.confirm(`Remove ${packName(p.productId)} from ${u.email}?`)) void act(`r${u.id}${p.productId}`, () => adminRevoke(u.id, p.productId), () => `Removed ${packName(p.productId)} from ${u.email}.`);}}><X size={12}/></button>
            </span>)}
          </div>
          <div className="admin-actions">
            {PACKS.filter(([id]) => !has.has(id) && !(id !== 'core-collection' && has.has('core-collection'))).map(([id, label]) => <button key={id} type="button" disabled={busy !== null} onClick={() => act(`g${u.id}${id}`, () => adminGrant(u.id, id), data => {const added = (data.added as string[] | undefined) ?? []; return added.length ? `Unlocked ${label} for ${u.email}.${data.emailed ? ' They were emailed.' : ''}` : `${u.email} already had ${label}.`;})}>Unlock {label}</button>)}
            <button type="button" className="admin-signout" disabled={busy !== null || u.activeDevices === 0} onClick={() => act(`s${u.id}`, () => adminSignOut(u.id), data => `Signed ${u.email} out of ${data.signedOutDevices ?? 0} device(s).`)}><LogOut size={13}/>Sign out everywhere</button>
          </div>
        </li>;
      })}</ul>
    </>}
  </section>;
}
