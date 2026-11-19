import type {Metadata} from 'next';
import Link from 'next/link';
import {ArrowLeft} from 'lucide-react';
import {Brand} from '@/components/brand';
import {AdminView} from '@/components/auth/admin-view';
export const metadata: Metadata = {title: 'Admin', robots: {index: false}};
export default function AdminPage() {
  return <div className="account-page wrap">
    <header className="account-header"><Link href="/" aria-label="NoteStack home"><Brand/></Link><Link className="text-action" href="/account/"><ArrowLeft size={15}/>Back to your account</Link></header>
    <main><span className="section-kicker">HOUSE ACCOUNT</span><h1>Students and access.</h1><p className="account-intro">Find a student by email or name, unlock subjects after a payment, remove access after a refund, or sign them out everywhere.</p>
      <AdminView/>
    </main>
  </div>;
}
