import type {Metadata} from 'next';
import type {ReactNode} from 'react';
import '@astryxdesign/core/reset.css';
import '@astryxdesign/core/astryx.css';
import '@astryxdesign/theme-neutral/theme.css';
import './globals.css';
import './theme-v2.css';
import {Providers} from './providers';
import {Stacksy} from '@/components/stacksy/stacksy';

export const metadata: Metadata = {
  title: {default: 'NoteStack — Make room for understanding', template: '%s | NoteStack'},
  description: 'Karnataka SSLC Class 10 study packs for Mathematics, Science and Social Science in English medium. A Vedanta Ventures project.',
  icons: {icon: '/notestack/favicon.svg'},
};

export default function RootLayout({children}: {children: ReactNode}) {
  return <html lang="en" data-theme="light"><body><Providers>{children}<Stacksy/></Providers></body></html>;
}
