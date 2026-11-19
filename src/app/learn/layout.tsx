import type {ReactNode} from 'react';
import {StudentBadge} from '@/components/auth/account-link';

export default function LearnLayout({children}: {children: ReactNode}) {
  return <>{children}<StudentBadge/></>;
}
