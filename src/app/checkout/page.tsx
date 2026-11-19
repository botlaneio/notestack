import type {Metadata} from 'next';
import Link from 'next/link';
import {ArrowLeft, ArrowRight} from 'lucide-react';
import {Brand} from '@/components/brand';

export const metadata: Metadata = {title: 'Ordering information'};

export default function CheckoutPage() {
  return <main className="launch-page wrap">
    <Link href="/" aria-label="NoteStack home"><Brand/></Link>
    <div className="section-kicker">THE CORE COLLECTION IS IN PREPARATION</div>
    <h1>A good study pack takes a little preparation.</h1>
    <p>We’re getting the Mathematics, Science and Social Science packs ready for Karnataka SSLC Class 10. Orders will open once the material, delivery details and payment service are ready.</p>
    <p>Your bag stays saved on this browser. In the meantime, explore the sample notes and find the subjects you need.</p>
    <nav aria-label="Continue browsing">
      <Link className="text-action" href="/shop/"><ArrowLeft size={16}/>Back to the store</Link>
      <Link className="text-action" href="/shop/#sample">Read sample notes<ArrowRight size={16}/></Link>
    </nav>
  </main>;
}
