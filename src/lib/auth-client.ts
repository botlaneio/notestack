'use client';

import {useCallback, useEffect, useState} from 'react';

export interface SessionUser {id: string; name: string; email: string; createdAt: number; emailVerified: boolean}
export interface ProgressEntry {path: string; subject: string; title: string | null; lastSeenAt: number; completedAt: number | null}
export interface DeviceSession {id: string; device: string; createdAt: number; lastSeenAt: number; current: boolean}
export type SignedOutReason = 'none' | 'expired' | 'device_limit' | 'signed_out' | 'password_reset' | 'unavailable';
export type SessionState =
  | {status: 'loading'}
  | {status: 'signed-in'; user: SessionUser; admin: boolean; devices: DeviceSession[]; entitlements: string[]; progress: ProgressEntry[]}
  | {status: 'signed-out'; reason: SignedOutReason};

export interface AuthResult {ok: boolean; status: number; code?: string; message?: string; errors?: Partial<Record<string, string>>; signedOutDevices?: number; data?: Record<string, unknown>}

const SESSION_EVENT = 'notestack:session-changed';

async function request(path: string, init: RequestInit = {}): Promise<{status: number; data: Record<string, unknown>}> {
  const res = await fetch(path, {
    ...init,
    credentials: 'same-origin',
    headers: {...(init.body !== undefined ? {'content-type': 'application/json'} : {}), ...(init.headers ?? {})},
  });
  const data = await res.json().catch(() => ({}));
  return {status: res.status, data: data as Record<string, unknown>};
}

function toResult(status: number, data: Record<string, unknown>): AuthResult {
  return {
    ok: status >= 200 && status < 300, status,
    code: data.code as string | undefined, message: data.message as string | undefined,
    errors: data.errors as AuthResult['errors'], signedOutDevices: data.signedOutDevices as number | undefined, data,
  };
}

function notify() {window.dispatchEvent(new Event(SESSION_EVENT));}

async function post(path: string, body: unknown): Promise<AuthResult> {
  try {
    const {status, data} = await request(path, {method: 'POST', body: JSON.stringify(body)});
    const result = toResult(status, data);
    if (result.ok) notify();
    return result;
  } catch {
    return {ok: false, status: 0, code: 'network', message: 'Could not reach NoteStack. Check your connection and try again.'};
  }
}

export const signUp = (values: {name: string; email: string; password: string}) => post('/api/auth/sign-up', values);
export const signIn = (values: {email: string; password: string}) => post('/api/auth/sign-in', values);
export const signOut = () => post('/api/auth/sign-out', {});
export const requestPasswordReset = (email: string) => post('/api/auth/forgot-password', {email});
export const resetPassword = (token: string, password: string) => post('/api/auth/reset-password', {token, password});

export const verifyEmailToken = (token: string) => post('/api/auth/verify-email', {token});
export const resendVerification = () => post('/api/auth/resend-verification', {});
export const changePassword = (currentPassword: string, newPassword: string) => post('/api/auth/change-password', {currentPassword, newPassword});
/** Saves that a chapter was opened (and, optionally, done or not done). Quiet: it does not refresh the page's session. */
export async function recordProgress(path: string, values: {title?: string; completed?: boolean} = {}): Promise<boolean> {
  try {
    const {status} = await request('/api/progress', {method: 'POST', body: JSON.stringify({path, ...values})});
    return status === 200;
  } catch {
    return false;
  }
}
export async function markChapter(path: string, completed: boolean): Promise<boolean> {
  const ok = await recordProgress(path, {completed});
  if (ok) notify();
  return ok;
}

// ---------- admin ----------
export interface AdminUser extends SessionUser {products: {productId: string; source: string; createdAt: number}[]; activeDevices: number; chaptersDone: number; lastSeenAt: number | null}
export async function adminSearch(q: string): Promise<{ok: boolean; users: AdminUser[]; message?: string}> {
  try {
    const {status, data} = await request(`/api/admin/users?q=${encodeURIComponent(q)}`);
    return {ok: status === 200, users: (data.users as AdminUser[]) ?? [], message: data.message as string | undefined};
  } catch {
    return {ok: false, users: [], message: 'Could not reach NoteStack. Check your connection and try again.'};
  }
}
export const adminGrant = (userId: string, productId: string) => post('/api/admin/grant', {userId, productId});
export const adminRevoke = (userId: string, productId: string) => post('/api/admin/revoke', {userId, productId});
export const adminSignOut = (userId: string) => post('/api/admin/sign-out', {userId});

/** /learn/<area>/<chapter>/… → the chapter's own address, or null when not on a chapter page. */
export function chapterPath(pathname: string): string | null {
  const m = pathname.match(/^\/learn\/(maths|science|social-science)\/([a-z0-9-]+)(?:\/|$)/);
  if (!m || m[2].startsWith('index')) return null;
  return `/learn/${m[1]}/${m[2]}/`;
}

export async function signOutDevice(id: string): Promise<AuthResult> {
  try {
    const {status, data} = await request(`/api/auth/devices/${id}`, {method: 'DELETE', body: '{}'});
    const result = toResult(status, data);
    if (result.ok) notify();
    return result;
  } catch {
    return {ok: false, status: 0, code: 'network'};
  }
}

export async function fetchSession(): Promise<SessionState> {
  try {
    const {status, data} = await request('/api/auth/session');
    if (status !== 200) return {status: 'signed-out', reason: 'unavailable'};
    if (!data.user) return {status: 'signed-out', reason: (data.reason as SignedOutReason) ?? 'none'};
    return {status: 'signed-in', user: data.user as SessionUser, admin: Boolean(data.admin), devices: (data.devices as DeviceSession[]) ?? [], entitlements: (data.entitlements as string[]) ?? [], progress: (data.progress as ProgressEntry[]) ?? []};
  } catch {
    return {status: 'signed-out', reason: 'unavailable'};
  }
}

/** Current session, refreshed after sign-in/out anywhere on the page and when the tab regains focus. */
export function useSession(): SessionState & {refresh: () => void} {
  const [state, setState] = useState<SessionState>({status: 'loading'});
  const refresh = useCallback(() => {fetchSession().then(setState);}, []);
  useEffect(() => {
    refresh();
    const onFocus = () => {if (document.visibilityState === 'visible') refresh();};
    window.addEventListener(SESSION_EVENT, refresh);
    document.addEventListener('visibilitychange', onFocus);
    return () => {
      window.removeEventListener(SESSION_EVENT, refresh);
      document.removeEventListener('visibilitychange', onFocus);
    };
  }, [refresh]);
  return {...state, refresh};
}

export const signedOutMessages: Record<SignedOutReason, string> = {
  none: '',
  expired: 'Your session expired. Sign in again to continue.',
  device_limit: 'You were signed out because this account was signed in on another device. Each account can be used on 2 devices at a time.',
  signed_out: 'You were signed out from another device.',
  password_reset: 'Your password was changed, so this device was signed out. Sign in with your new password.',
  unavailable: '',
};

/** Only allow redirects within this site after sign-in. */
export function safeNext(value: string | null | undefined): string {
  if (!value || !value.startsWith('/') || value.startsWith('//') || value.startsWith('/\\')) return '/account/';
  return value;
}
