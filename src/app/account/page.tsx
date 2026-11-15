import type {Metadata} from 'next';
import Link from 'next/link';
import {ArrowLeft, ArrowRight, BookOpen, ShoppingBag, UserRound, Bookmark} from 'lucide-react';
import {Brand} from '@/components/brand';
export const metadata: Metadata = {title: 'Your account'};
export default function AccountPage() {
 return <div className="account-page wrap">
   <header className="account-header"><Link href="/" aria-label="NoteStack home"><Brand/></Link><Link className="text-action" href="/"><ArrowLeft size={15}/>Back to store</Link></header>
   <main><span className="section-kicker">YOUR NEXT CHAPTER, IN ONE PLACE</span><h1>Your NoteStack account.</h1><p className="account-intro">A place for your study journey, from choosing your subjects to coming back for the next chapter.</p>
     <section className="account-welcome"><span className="account-avatar"><UserRound size={28} strokeWidth={1.5}/></span><div><h2>Let’s start with you.</h2><p>Sign in or create an account when account access opens.</p></div><div className="account-actions"><Link className="account-signin" href="/sign-in">Sign in <ArrowRight size={16}/></Link><Link href="/sign-up">Create account ↗</Link></div></section>
     <div className="account-sections">{[[BookOpen,'Your study library','Your subject materials will live here once account access and purchases are available.'],[ShoppingBag,'Your orders','Order history will be available when ordering opens.'],[Bookmark,'Your saved packs','Explore the store and save the subjects you want to come back to.']].map(([Icon,title,description])=>{const Glyph=Icon as typeof BookOpen;return <article key={title as string}><Glyph size={23} strokeWidth={1.5}/><h2>{title as string}</h2><p>{description as string}</p></article>})}</div>
     <p className="account-status">Account access is not open yet. You can explore subjects and read free samples in the meantime.</p><Link className="text-action" href="/#subjects">Explore subject packs<ArrowRight size={16}/></Link>
   </main>
 </div>;
}
