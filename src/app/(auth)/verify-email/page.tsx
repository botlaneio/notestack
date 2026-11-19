import type {Metadata} from 'next';
import {VerifyEmailView} from '@/components/auth/verify-email-view';
export const metadata: Metadata = {title: 'Confirm your email', robots: {index: false}};
export default function VerifyEmailPage() {return <VerifyEmailView/>;}
