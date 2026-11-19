'use client';

import Link from 'next/link';
import {useRef, useState} from 'react';
import {Check, ChevronLeft, ChevronRight, Heart, Menu, RotateCw, Search, ShoppingBag, X} from 'lucide-react';
import {Brand} from './brand';
import {AccountLink} from '@/components/auth/account-link';
import styles from './home-hero.module.css';

interface TopBarProps {
  query: string;
  onQuery: (value: string) => void;
  onSearch: () => void;
  bagCount: number;
  onBag: () => void;
  onSaved: () => void;
}

const navLinks = [
  {href: '/learn/maths/', label: 'Maths'},
  {href: '/learn/science/', label: 'Science'},
  {href: '/learn/social-science/', label: 'Social Science'},
  {href: '#bundle', label: 'Pricing'},
];

/** White top bar: logo, subject links, pill search, account, saved and bag. */
export function HomeTopBar({query, onQuery, onSearch, bagCount, onBag, onSaved}: TopBarProps) {
  const [open, setOpen] = useState(false);
  return <header className={styles.bar}>
    <div className={styles.barInner}>
      <a href="#" aria-label="NoteStack home" className={styles.logo}><Brand small/></a>
      <nav className={styles.links} aria-label="Main navigation">
        {navLinks.map(l => <Link key={l.href} href={l.href}>{l.label}</Link>)}
      </nav>
      <form className={styles.search} role="search" onSubmit={e => {e.preventDefault(); onSearch();}}>
        <Search size={18} aria-hidden="true"/>
        <input type="search" value={query} onChange={e => onQuery(e.target.value)} placeholder="Search subjects, e.g. Science" aria-label="Search subject packs"/>
      </form>
      <div className={styles.actions}>
        <button type="button" className={styles.iconButton} onClick={onSaved} aria-label="Saved packs"><Heart size={20}/></button>
        <button type="button" className={styles.iconButton} onClick={onBag} aria-label={`Open bag, ${bagCount} subject packs`}>
          <ShoppingBag size={20}/>{bagCount > 0 && <b className={styles.count}>{bagCount}</b>}
        </button>
        <span className={styles.account}><AccountLink/></span>
        <button type="button" className={`${styles.iconButton} ${styles.menuButton}`} onClick={() => setOpen(!open)} aria-label="Toggle navigation" aria-expanded={open}>
          {open ? <X size={22}/> : <Menu size={22}/>}
        </button>
      </div>
    </div>
    {open && <nav className={styles.mobileNav} aria-label="Mobile navigation">
      <form className={styles.mobileSearch} role="search" onSubmit={e => {e.preventDefault(); setOpen(false); onSearch();}}>
        <Search size={18} aria-hidden="true"/>
        <input type="search" value={query} onChange={e => onQuery(e.target.value)} placeholder="Search subjects" aria-label="Search subject packs"/>
      </form>
      {navLinks.map(l => <Link key={l.href} href={l.href} onClick={() => setOpen(false)}>{l.label}</Link>)}
    </nav>}
  </header>;
}

/** Centred headline, one primary action, and a swipeable row of study-mode cards. */
export function HomeHero({onBrowse}: {onBrowse: () => void}) {
  const rail = useRef<HTMLDivElement>(null);
  const scroll = (dir: number) => rail.current?.scrollBy({left: dir * rail.current.clientWidth * 0.6, behavior: 'smooth'});
  return <>
    <section className={styles.hero}>
      <span className={styles.kicker}><span aria-hidden="true"/>Karnataka SSLC · Class 10 · English medium</span>
      <h1 className={styles.title}>How do you want to study for your boards?</h1>
      <p className={styles.lead}>Guided chapters, practice questions and quick revision for Maths, Science and Social Science, made to fit your phone.</p>
      <div className={styles.cta}>
        <Link className={styles.primary} href="/learn/maths/">Start with a free chapter</Link>
        <button type="button" className={styles.textLink} onClick={onBrowse}>See the subject packs</button>
      </div>
    </section>

    <section className={styles.railWrap} aria-label="Ways to study">
      <button type="button" className={`${styles.arrow} ${styles.arrowLeft}`} aria-label="Previous" onClick={() => scroll(-1)}><ChevronLeft size={20}/></button>
      <div className={styles.rail} ref={rail}>
        <Link href="/learn/maths/" className={`${styles.card} ${styles.maths}`}>
          <h3>Guided chapters</h3><p>Every idea, one step at a time.</p>
          <div className={styles.panel} aria-hidden="true">
            <small>MATHS · CHAPTER 1</small><strong>Real Numbers</strong>
            <div className={styles.progress}><i/></div>
            <div className={styles.row}><span>5 of 8 sections</span><span>62%</span></div>
            <div className={styles.option}><b><Check size={12}/></b>Euclid&apos;s division lemma</div>
            <div className={styles.option}><b>6</b>Irrational numbers</div>
          </div>
        </Link>
        <Link href="/learn/science/" className={`${styles.card} ${styles.science}`}>
          <h3>Question practice</h3><p>Board-style questions with answers.</p>
          <div className={styles.panel} aria-hidden="true">
            <small>SCIENCE · LIGHT</small><strong>Which mirror forms a virtual, enlarged image?</strong>
            <div className={styles.option}><b>A</b>Convex mirror</div>
            <div className={`${styles.option} ${styles.correct}`}><b>B</b>Concave mirror, object inside F</div>
            <div className={styles.option}><b>C</b>Plane mirror</div>
          </div>
        </Link>
        <Link href="/learn/social-science/" className={`${styles.card} ${styles.revision}`}>
          <h3>Quick revision</h3><p>Key terms and dates to remember.</p>
          <div className={styles.panel} aria-hidden="true">
            <small>SOCIAL SCIENCE · HISTORY</small>
            <div className={styles.flash}>Battle of Plassey<span>Tap to see the year</span></div>
            <div className={styles.row}><span>Card 4 of 20</span><RotateCw size={14}/></div>
          </div>
        </Link>
        <button type="button" onClick={onBrowse} className={`${styles.card} ${styles.social}`}>
          <h3>Chapter checks</h3><p>See what you know after every chapter.</p>
          <div className={styles.panel} aria-hidden="true">
            <small>MATHS · CHAPTER CHECK</small>
            <div className={styles.score}><div className={styles.ring}><span>78%</span></div><div><strong>Nicely done</strong><div className={styles.row}><span>7 of 9 correct</span></div></div></div>
            <div className={styles.row}><span>Weakest: Trigonometry</span></div>
          </div>
        </button>
      </div>
      <button type="button" className={`${styles.arrow} ${styles.arrowRight}`} aria-label="Next" onClick={() => scroll(1)}><ChevronRight size={20}/></button>
      <ul className={styles.strip}>
        <li><Check size={16}/>First chapter of every subject free</li>
        <li><Check size={16}/>₹399 per subject</li>
        <li><Check size={16}/>₹999 for all three</li>
      </ul>
    </section>
  </>;
}
