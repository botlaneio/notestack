import type {Metadata} from 'next';
import type {ReactNode} from 'react';
import '@astryxdesign/core/reset.css';
import '@astryxdesign/core/astryx.css';
import '@astryxdesign/theme-neutral/theme.css';
import './globals.css';
import './design-system.css';
import {Providers} from './providers';

export const metadata: Metadata = {
  title: {default: 'NoteStack — Make room for understanding', template: '%s | NoteStack'},
  description: 'Karnataka SSLC Class 10 study packs for Mathematics, Science and Social Science in English medium. A Vedant Ventures project.',
  icons: {icon: '/notestack/favicon.svg'},
};

export default function RootLayout({children}: {children: ReactNode}) {
  return <html lang="en" data-theme="light"><body><Providers>{children}</Providers></body></html>;
}
