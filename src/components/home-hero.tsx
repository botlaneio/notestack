'use client';

import Link from 'next/link';
import {useEffect, useRef, useState, type ReactNode} from 'react';
import {BookOpen, Calculator, Check, ChevronDown, ChevronLeft, ChevronRight, FileText, FlaskConical, Globe2, Layers, ListChecks, Lock, Menu, PenLine, PlayCircle, RotateCw, ScrollText, ShoppingBag, X, type LucideIcon} from 'lucide-react';
import {Brand} from './brand';
import {AccountLink} from '@/components/auth/account-link';
import {useSession} from '@/lib/auth-client';
import {HeroPreview} from './hero-phone';
import {HeroCountdown} from './hero-countdown';
import styles from './home-hero.module.css';

interface TopBarProps {
  /** Kept so existing callers still type-check; the top bar no longer has a search box. */
  query?: string;
  onQuery?: (value: string) => void;
  onSearch?: () => void;
  bagCount: number;
  onBag: () => void;
  onSaved?: () => void;
}

const SUBJECT_IDS = ['mathematics', 'science', 'social-science'];

interface MenuItem {href: string; label: string; free: string; paid: string; icon: LucideIcon; tone: string}

const studyTools: MenuItem[] = [
  {href: '/learn/maths/', label: 'Guided chapters', free: 'Chapter 1 of every subject is free', paid: 'Every chapter, step by step', icon: BookOpen, tone: 'toneBlue'},
  {href: '/learn/maths/real-numbers/practice/', label: 'Practice questions', free: 'Free for chapter 1', paid: 'Board-style questions with answers', icon: PenLine, tone: 'toneGreen'},
  {href: '/flashcards/', label: 'Flashcards', free: 'One free deck in every subject', paid: 'A deck for every chapter', icon: Layers, tone: 'tonePurple'},
  {href: '/board-papers/', label: 'Past board papers', free: 'Chapter 1 questions are free', paid: 'Full papers as timed mock tests', icon: ScrollText, tone: 'toneBlue'},
  {href: '/learn/maths/real-numbers/check/', label: 'Chapter checks', free: 'Free for chapter 1', paid: 'See what you know after each chapter', icon: ListChecks, tone: 'toneOrange'},
  {href: '#sample', label: 'Free sample notes', free: 'A PDF for every subject', paid: 'A PDF for every subject', icon: FileText, tone: 'tonePurple'},
];

const subjects: MenuItem[] = [
  {href: '/learn/maths/', label: 'Mathematics', free: 'Chapter 1 free · Real Numbers', paid: 'All chapters unlocked', icon: Calculator, tone: 'toneBlue'},
  {href: '/learn/science/', label: 'Science', free: 'Chapter 1 free · Chemical Reactions', paid: 'All chapters unlocked', icon: FlaskConical, tone: 'toneGreen'},
  {href: '/learn/social-science/', label: 'Social Science', free: 'Chapter 1 free · Advent of Europeans', paid: 'All chapters unlocked', icon: Globe2, tone: 'toneOrange'},
];

/** Who is looking: a visitor, a signed-in student without every subject, or a student who owns everything. */
function useAccess() {
  const session = useSession();
  const signedIn = session.status === 'signed-in';
  const owned = signedIn ? (session.admin ? SUBJECT_IDS : session.entitlements) : [];
  const ownsAll = SUBJECT_IDS.every(id => owned.includes(id));
  const lastChapter = signedIn ? [...session.progress].sort((a, b) => b.lastSeenAt - a.lastSeenAt)[0] : undefined;
  return {status: session.status, signedIn, ownsAll, owned, lastChapter};
}

function MenuList({items, isOpen, close, subjectIds}: {items: MenuItem[]; isOpen: (i: number) => boolean; close: () => void; subjectIds?: string[]}) {
  return <ul className={styles.menuList}>{items.map((item, i) => {
    const Icon = item.icon;
    const unlocked = isOpen(i);
    return <li key={item.label}>
      <Link href={item.href} onClick={close} className={styles.menuItem}>
        <span className={`${styles.menuIcon} ${styles[item.tone]}`}><Icon size={18}/></span>
        <span className={styles.menuText}><strong>{item.label}</strong><small>{unlocked ? item.paid : item.free}</small></span>
        {!unlocked && subjectIds && <Lock size={14} className={styles.menuLock} aria-label="Chapters after the first are locked"/>}
      </Link>
    </li>;
  })}</ul>;
}

/** A top-bar dropdown that opens on click and closes on Escape or an outside click. */
function Dropdown({label, children}: {label: string; children: (close: () => void) => ReactNode}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {if (!ref.current?.contains(e.target as Node)) setOpen(false);};
    const onKey = (e: KeyboardEvent) => {if (e.key === 'Escape') setOpen(false);};
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {document.removeEventListener('mousedown', onDown); document.removeEventListener('keydown', onKey);};
  }, [open]);
  return <div className={styles.dropdown} ref={ref}>
    <button type="button" className={styles.dropdownButton} aria-expanded={open} onClick={() => setOpen(!open)}>
      {label}<ChevronDown size={16} className={open ? styles.chevronOpen : undefined}/>
    </button>
    {open && <div className={styles.dropdownPanel}>{children(() => setOpen(false))}</div>}
  </div>;
}

/** White top bar. Visitors see every study tool with what is free; owners see the same menu without locks. */
export function HomeTopBar({bagCount, onBag}: TopBarProps) {
  const [open, setOpen] = useState(false);
  // Clear over the hero at the top of the page; frosted once the page scrolls.
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener('scroll', onScroll, {passive: true});
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  const access = useAccess();
  const toolOpen = () => access.ownsAll;
  const subjectOpen = (i: number) => access.owned.includes(SUBJECT_IDS[i]);
  const close = () => setOpen(false);
  const continueLink = access.lastChapter && <Link href={access.lastChapter.path} onClick={close} className={styles.continue}>
    <PlayCircle size={18}/><span><small>Continue where you left off</small><strong>{access.lastChapter.title ?? 'Your last chapter'}</strong></span>
  </Link>;
  const unlockButton = access.signedIn && !access.ownsAll && <a href="#bundle" onClick={close} className={styles.unlock}>Unlock all subjects · ₹999</a>;

  return <header className={styles.bar} data-scrolled={scrolled || open || undefined}>
    <div className={styles.barInner}>
      <a href="#" aria-label="NoteStack home" className={styles.logo}><Brand small animated/></a>
      <nav className={styles.links} aria-label="Main navigation">
        <Dropdown label="Resources">{c => <MenuList items={studyTools} isOpen={toolOpen} close={c}/>}</Dropdown>
        <Dropdown label="Subjects">{c => <>
          <MenuList items={subjects} isOpen={subjectOpen} close={c} subjectIds={SUBJECT_IDS}/>
          {access.lastChapter && <div className={styles.menuFooter}>{continueLink}</div>}
        </>}</Dropdown>
        <a href="#bundle" className={styles.plainLink}>Pricing</a>
      </nav>
      <div className={styles.actions}>
        <button type="button" className={styles.iconButton} onClick={onBag} aria-label={`Open bag, ${bagCount} subject packs`}>
          <ShoppingBag size={20}/>{bagCount > 0 && <b className={styles.count}>{bagCount}</b>}
        </button>
        {unlockButton && <span className={styles.hideMedium}>{unlockButton}</span>}
        {access.status === 'signed-in'
          ? <span className={styles.account}><AccountLink/></span>
          : <span className={styles.authButtons}>
              <Link href="/sign-in/" className={`${styles.ghost} ${styles.hideSmall}`}>Log in</Link>
              <Link href="/sign-up/" className={styles.solid}>Sign up free</Link>
            </span>}
        <button type="button" className={`${styles.iconButton} ${styles.menuButton}`} onClick={() => setOpen(!open)} aria-label="Toggle navigation" aria-expanded={open}>
          {open ? <X size={22}/> : <Menu size={22}/>}
        </button>
      </div>
    </div>
    {open && <nav className={styles.mobileNav} aria-label="Mobile navigation">
      {continueLink}
      <span className={styles.mobileHeading}>Resources</span>
      <MenuList items={studyTools} isOpen={toolOpen} close={close}/>
      <span className={styles.mobileHeading}>Subjects</span>
      <MenuList items={subjects} isOpen={subjectOpen} close={close} subjectIds={SUBJECT_IDS}/>
      <a href="#bundle" onClick={close} className={styles.mobileLink}>Pricing</a>
      {access.status !== 'signed-in'
        ? <div className={styles.mobileAuth}><Link href="/sign-in/" className={styles.ghost}>Log in</Link><Link href="/sign-up/" className={styles.solid}>Sign up free</Link></div>
        : unlockButton}
    </nav>}
  </header>;
}

/** Split hero: headline, actions and exam countdown on the left; a phone lesson preview on the right. Then the study-mode cards. */
export function HomeHero({onBrowse}: {onBrowse: () => void}) {
  const rail = useRef<HTMLDivElement>(null);
  const scroll = (dir: number) => rail.current?.scrollBy({left: dir * rail.current.clientWidth * 0.6, behavior: 'smooth'});
  return <>
    <section className={styles.hero}>
      <div className={styles.heroInner}>
        <div className={styles.copy}>
          <span className={styles.kicker}><span aria-hidden="true"/>Karnataka SSLC · Class 10 · English medium</span>
          <h1 className={styles.title}>Your SSLC boards,<br/>one chapter at a time.</h1>
          <p className={styles.lead}>Guided chapters, board-style practice and flashcards for Maths, Science and Social Science. Made to fit your phone.</p>
          <div className={styles.cta}>
            <Link className={styles.primary} href="/learn/maths/">Start with a free chapter</Link>
            <button type="button" className={styles.secondary} onClick={onBrowse}>See subject packs</button>
          </div>
          <ul className={styles.checks}>
            <li><Check size={16}/>First chapter free</li>
            <li><Check size={16}/>₹399 per subject</li>
            <li><Check size={16}/>₹999 for all three</li>
          </ul>
          <HeroCountdown/>
        </div>
        <HeroPreview className={styles.preview}/>
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
        <Link href="/flashcards/" className={`${styles.card} ${styles.revision}`}>
          <h3>Quick revision</h3><p>Flashcards for key terms, formulas and dates.</p>
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
    </section>
  </>;
}
