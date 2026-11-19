// Sends transactional email through Resend (https://resend.com).
// Needs the RESEND_API_KEY secret; EMAIL_FROM must use the domain verified in Resend.

export interface EmailEnv {
  RESEND_API_KEY?: string;
  EMAIL_FROM?: string;
}

export type FetchLike = (input: string, init: RequestInit) => Promise<Response>;

export function emailConfigured(env: EmailEnv): boolean {
  return typeof env.RESEND_API_KEY === 'string' && env.RESEND_API_KEY.length > 0;
}

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, c => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'}[c] as string));
}

export function resetEmail(name: string, link: string, minutes: number) {
  const first = name.split(' ')[0] || 'there';
  const subject = 'Reset your NoteStack password';
  const text = `Hi ${first},\n\nSomeone asked to reset the password for your NoteStack account. Open this link to choose a new password:\n\n${link}\n\nThe link works once and expires in ${minutes} minutes. Resetting your password signs you out on all other devices.\n\nIf you did not ask for this, you can ignore this email. Your password will not change.\n\nNoteStack`;
  const html = `<div style="font-family:Arial,sans-serif;max-width:480px;margin:0 auto;color:#182c42;line-height:1.6">
  <p style="font-size:22px;font-weight:700;margin:0 0 16px">notestack.</p>
  <p>Hi ${escapeHtml(first)},</p>
  <p>Someone asked to reset the password for your NoteStack account. Choose a new password with the button below.</p>
  <p style="margin:24px 0"><a href="${escapeHtml(link)}" style="background:#dd5145;color:#fff;padding:12px 20px;border-radius:7px;text-decoration:none;display:inline-block">Choose a new password</a></p>
  <p style="font-size:13px;color:#5f7282">The link works once and expires in ${minutes} minutes. Resetting your password signs you out on all other devices.</p>
  <p style="font-size:13px;color:#5f7282">If you did not ask for this, ignore this email. Your password will not change.</p>
  <p style="font-size:12px;color:#8795a1;word-break:break-all">If the button does not work, copy this link: ${escapeHtml(link)}</p>
</div>`;
  return {subject, text, html};
}

function layout(first: string, paragraphs: string[], button: {label: string; link: string} | null, footnotes: string[]): string {
  return `<div style="font-family:Arial,sans-serif;max-width:480px;margin:0 auto;color:#182c42;line-height:1.6">
  <p style="font-size:22px;font-weight:700;margin:0 0 16px">notestack.</p>
  <p>Hi ${escapeHtml(first)},</p>
  ${paragraphs.map(p => `<p>${escapeHtml(p)}</p>`).join('\n  ')}
  ${button ? `<p style="margin:24px 0"><a href="${escapeHtml(button.link)}" style="background:#dd5145;color:#fff;padding:12px 20px;border-radius:7px;text-decoration:none;display:inline-block">${escapeHtml(button.label)}</a></p>` : ''}
  ${footnotes.map(p => `<p style="font-size:13px;color:#5f7282">${escapeHtml(p)}</p>`).join('\n  ')}
  ${button ? `<p style="font-size:12px;color:#8795a1;word-break:break-all">If the button does not work, copy this link: ${escapeHtml(button.link)}</p>` : ''}
</div>`;
}

export function verifyEmail(name: string, link: string, hours: number) {
  const first = name.split(' ')[0] || 'there';
  const subject = 'Confirm your email for NoteStack';
  const text = `Hi ${first},\n\nWelcome to NoteStack. Please confirm this is your email address by opening this link:\n\n${link}\n\nThe link works for ${hours} hours. Confirming your email makes sure password reset links and purchase receipts reach you.\n\nIf you did not create a NoteStack account, you can ignore this email.\n\nNoteStack`;
  const html = layout(first, ['Welcome to NoteStack. Please confirm this is your email address.'], {label: 'Confirm my email', link}, [`The link works for ${hours} hours. Confirming makes sure password reset links and purchase receipts reach you.`, 'If you did not create a NoteStack account, ignore this email.']);
  return {subject, text, html};
}

/** Sent when a subject is unlocked for a student, for example after a payment taken by hand. */
export function unlockedEmail(name: string, subjects: string[], link: string) {
  const first = name.split(' ')[0] || 'there';
  const list = subjects.length > 1 ? `${subjects.slice(0, -1).join(', ')} and ${subjects[subjects.length - 1]}` : subjects[0];
  const subject = `${list} ${subjects.length > 1 ? 'are' : 'is'} now unlocked on NoteStack`;
  const text = `Hi ${first},\n\n${list} ${subjects.length > 1 ? 'are' : 'is'} now unlocked in your NoteStack account. Sign in and open your study library to start:\n\n${link}\n\nKeep this email as your confirmation. Your account can be signed in on up to 2 devices at a time.\n\nNoteStack`;
  const html = layout(first, [`${list} ${subjects.length > 1 ? 'are' : 'is'} now unlocked in your NoteStack account.`], {label: 'Open my study library', link}, ['Keep this email as your confirmation. Your account can be signed in on up to 2 devices at a time.']);
  return {subject, text, html};
}

export async function sendEmail(env: EmailEnv, message: {to: string; subject: string; text: string; html: string}, fetcher: FetchLike = fetch): Promise<boolean> {
  if (!emailConfigured(env)) return false;
  const res = await fetcher('https://api.resend.com/emails', {
    method: 'POST',
    headers: {authorization: `Bearer ${env.RESEND_API_KEY}`, 'content-type': 'application/json'},
    body: JSON.stringify({from: env.EMAIL_FROM || 'NoteStack <no-reply@notestack.shop>', to: [message.to], subject: message.subject, text: message.text, html: message.html}),
  });
  if (!res.ok) console.error('email_send_failed', res.status, await res.text().catch(() => ''));
  return res.ok;
}
