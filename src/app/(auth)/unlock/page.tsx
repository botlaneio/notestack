import type {Metadata} from 'next';
import {UnlockView} from '@/components/auth/unlock-view';
export const metadata: Metadata = {title: 'Unlock this chapter', robots: {index: false}};
export default function UnlockPage() {return <UnlockView/>;}
