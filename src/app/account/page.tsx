import type {Metadata} from 'next';
import Link from 'next/link';
import {ArrowLeft, ArrowRight} from 'lucide-react';
import {Brand} from '@/components/brand';
import {AccountView} from '@/components/auth/account-view';
export const metadata: Metadata = {title: 'Your account'};
export default function AccountPage() {
 return <div className="account-page wrap">
   <header className="account-header"><Link href="/" aria-label="NoteStack home"><Brand/></Link><Link className="text-action" href="/"><ArrowLeft size={15}/>Back to home</Link></header>
   <main><span className="section-kicker">YOUR NEXT CHAPTER, IN ONE PLACE</span><h1>Your NoteStack account.</h1><p className="account-intro">A place for your study journey, from choosing your subjects to coming back for the next chapter.</p>
     <AccountView/>
     <Link className="text-action" href="/#subjects">Explore subject packs<ArrowRight size={16}/></Link>
   </main>
 </div>;
}
