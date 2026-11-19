import type {Metadata} from 'next';
import Link from 'next/link';
import {ArrowLeft, ArrowRight} from 'lucide-react';
import {Brand} from '@/components/brand';

export const metadata: Metadata = {title: 'Payments'};

export default function CheckoutPage() {
  return <main className="launch-page wrap">
    <Link href="/" aria-label="NoteStack home"><Brand/></Link>
    <div className="section-kicker">ONLINE PAYMENT OPENS SOON</div>
    <h1>Payments are almost ready.</h1>
    <p>Online payment for the Mathematics, Science and Social Science packs isn’t open yet. Prices are ₹399 per subject, or ₹999 for all three.</p>
    <p>Your bag stays saved on this browser. Until payment opens, create a free account and start with the first chapter of any subject.</p>
    <nav aria-label="Continue browsing">
      <Link className="text-action" href="/"><ArrowLeft size={16}/>Back to the homepage</Link>
      <Link className="text-action" href="/sign-up/">Create a free account<ArrowRight size={16}/></Link>
    </nav>
  </main>;
}
