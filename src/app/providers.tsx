'use client';

import Link from 'next/link';
import {Theme} from '@astryxdesign/core/theme';
import {LinkProvider} from '@astryxdesign/core/Link';
import {neutralTheme} from '@astryxdesign/theme-neutral/built';
import type {ReactNode} from 'react';

export function Providers({children}: {children: ReactNode}) {
  return <Theme theme={neutralTheme} mode="light">
    <LinkProvider component={Link}>{children}</LinkProvider>
  </Theme>;
}
