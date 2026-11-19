import Link from 'next/link';
import {ArrowLeft, BookOpen, Layers, Check} from 'lucide-react';
import type {ReactNode} from 'react';
import {Brand} from '@/components/brand';
import {products} from '@/lib/catalog';

export default function AuthLayout({children}: {children: ReactNode}) {
  return <div className="auth-shell">
    <div className="auth-main">
      <header className="auth-header"><Link href="/" aria-label="NoteStack home"><Brand/></Link><Link href="/shop/" className="auth-back"><ArrowLeft size={14}/><span>Back to store</span></Link></header>
      <main className="auth-content">{children}</main>
      <footer className="auth-footer"><span>A project by <strong>VEDANT VENTURES</strong></span><Link href="/shop/#faqs">Questions? Start here <span aria-hidden="true">↗</span></Link></footer>
    </div>
    <aside className="auth-aside" aria-label="The NoteStack core collection">
      <div className="auth-aside-grid"/>
      <div className="auth-aside-heading"><span className="section-kicker">ONE SUBJECT. ONE CHAPTER. ONE STEP AT A TIME.</span><h2>A home for<br/>your study stack.</h2><p>Make room for the next<br/>“I understand it.”</p></div>
      <div className="auth-book-scene">{products.map((p,i)=><img key={p.id} src={p.image} width="380" height="530" alt={`${p.title} subject pack`} className={`auth-book auth-book-${i}`}/>)}</div>
      <div className="auth-aside-card"><span><BookOpen size={21}/></span><div><strong>The core collection</strong><small>Mathematics · Science · Social Science</small></div><Layers size={20}/></div>
      <div className="auth-aside-bottom"><span><Check size={13}/>Karnataka SSLC</span><span><Check size={13}/>Class 10</span><span><Check size={13}/>English medium</span></div>
    </aside>
  </div>;
}
