'use client';

import {useCallback, useEffect, useState} from 'react';

export interface SessionUser {id: string; name: string; email: string; createdAt: number}
export interface DeviceSession {id: string; device: string; createdAt: number; lastSeenAt: number; current: boolean}
export type SignedOutReason = 'none' | 'expired' | 'device_limit' | 'signed_out' | 'password_reset' | 'unavailable';
export type SessionState =
  | {status: 'loading'}
  | {status: 'signed-in'; user: SessionUser; devices: DeviceSession[]; entitlements: string[]}
  | {status: 'signed-out'; reason: SignedOutReason};

export interface AuthResult {ok: boolean; status: number; code?: string; message?: string; errors?: Partial<Record<'name' | 'email' | 'password', string>>; signedOutDevices?: number}

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
    errors: data.errors as AuthResult['errors'], signedOutDevices: data.signedOutDevices as number | undefined,
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
    return {status: 'signed-in', user: data.user as SessionUser, devices: (data.devices as DeviceSession[]) ?? [], entitlements: (data.entitlements as string[]) ?? []};
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
