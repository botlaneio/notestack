export type AuthMode = 'sign-in' | 'sign-up' | 'forgot-password';
export type AuthField = 'name' | 'email' | 'password';
export interface AuthValues {name: string; email: string; password: string}
export type AuthErrors = Partial<Record<AuthField, string>>;

export function validateAuthForm(mode: AuthMode, values: AuthValues): AuthErrors {
  const errors: AuthErrors = {};
  if (mode === 'sign-up' && values.name.trim().length < 2) {
    errors.name = 'Enter your full name.';
  }
  if (!values.email.trim()) {
    errors.email = 'Enter your email address.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
    errors.email = 'Enter a valid email address, such as name@example.com.';
  }
  if (mode !== 'forgot-password') {
    if (!values.password) errors.password = 'Enter your password.';
    else if (mode === 'sign-up' && values.password.length < 8) {
      errors.password = 'Use at least 8 characters for your password.';
    }
  }
  return errors;
}

export const authUnavailableMessages: Record<AuthMode, string> = {
  'sign-in': 'Sign-in is not available yet. Account access will open when NoteStack launches.',
  'sign-up': 'Account registration is not open yet. No account has been created and your details have not been submitted.',
  'forgot-password': 'Password recovery is not available yet. No reset email has been sent.',
};
