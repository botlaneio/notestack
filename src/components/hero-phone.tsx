import type {CSSProperties, ReactNode} from 'react';
import {Check} from 'lucide-react';
import styles from './hero-phone.module.css';

/*
 * Decorative product preview for the home hero: a phone showing a lesson, plus floating cards.
 * Built from small parts so each can be animated on its own. Animation hooks are CSS custom
 * properties set on the parts (--phone-tilt, --phone-scale, --progress, --card-tilt, --float-delay).
 * Every animation is switched off under prefers-reduced-motion.
 */

type Passthrough = {className?: string; style?: CSSProperties};
type CSSVars = CSSProperties & Record<`--${string}`, string | number>;

const cx = (...names: (string | false | undefined)[]) => names.filter(Boolean).join(' ');

export interface LessonStep {
  label: string;
  /** Number shown in the badge when the step is not done. */
  n: number;
  done?: boolean;
}

export const defaultSteps: LessonStep[] = [
  {label: 'Euclid’s division lemma', n: 5, done: true},
  {label: 'Irrational numbers', n: 6},
];

/** Hardware buttons: thin raised slivers on the rim. Each has its own class for animation. */
export function SideButtons() {
  return <>
    <span className={cx(styles.sideButton, styles.btnAction)}/>
    <span className={cx(styles.sideButton, styles.btnVolUp)}/>
    <span className={cx(styles.sideButton, styles.btnVolDown)}/>
    <span className={cx(styles.sideButton, styles.btnPower)}/>
  </>;
}

/** Pill-shaped camera cut-out with a small lens. */
export function CameraIsland({className}: {className?: string}) {
  return <span className={cx(styles.island, className)}><span className={styles.lens}/></span>;
}

/** Time, signal, wifi and battery, drawn as inline SVG. */
export function StatusBar({time = '9:41', className}: {time?: string; className?: string}) {
  return <div className={cx(styles.statusBar, className)}>
    <span className={styles.time}>{time}</span>
    <span className={styles.statusIcons}>
      <svg width="17" height="11" viewBox="0 0 17 11" fill="currentColor"><rect x="0" y="7" width="3" height="4" rx="0.8"/><rect x="4.5" y="5" width="3" height="6" rx="0.8"/><rect x="9" y="2.5" width="3" height="8.5" rx="0.8"/><rect x="13.5" y="0" width="3" height="11" rx="0.8"/></svg>
      <svg width="15" height="11" viewBox="0 0 15 11" fill="currentColor"><path d="M7.5 2.2c2.1 0 4 .8 5.5 2.1l1.2-1.3A9.8 9.8 0 0 0 7.5.4 9.8 9.8 0 0 0 .8 3l1.2 1.3a8 8 0 0 1 5.5-2.1Z"/><path d="M7.5 5.4c1.2 0 2.3.4 3.2 1.2l1.2-1.3a6.6 6.6 0 0 0-8.8 0l1.2 1.3c.9-.8 2-1.2 3.2-1.2Z"/><path d="M7.5 8.4c.4 0 .8.2 1.1.4L7.5 10 6.4 8.8c.3-.2.7-.4 1.1-.4Z"/></svg>
      <svg width="25" height="12" viewBox="0 0 25 12" fill="none"><rect x="0.5" y="0.5" width="21" height="11" rx="3.2" stroke="currentColor" opacity="0.4"/><rect x="2" y="2" width="16" height="8" rx="2" fill="currentColor"/><path d="M23 4v4c.8-.3 1.3-1.1 1.3-2S23.8 4.3 23 4Z" fill="currentColor" opacity="0.45"/></svg>
    </span>
  </div>;
}

/**
 * Phone body: metallic rim, black bezel, white screen with status bar, camera pill, glass glare and
 * home indicator. 3D tilt comes from --phone-tilt (a transform list), size from --phone-scale.
 */
export function PhoneFrame({tilt, animate = false, children, className, style}: Passthrough & {tilt?: string; animate?: boolean; children: ReactNode}) {
  const vars: CSSVars = {...style};
  if (tilt !== undefined) vars['--phone-tilt'] = tilt;
  return <div className={cx(styles.phone, animate && styles.intro, className)} style={vars}>
    <span className={styles.contactShadow}/>
    <SideButtons/>
    <div className={styles.rim}>
      <div className={styles.bezel}>
        <div className={styles.screen}>
          <StatusBar/>
          <CameraIsland/>
          <div className={styles.content}>{children}</div>
          <span className={styles.glare}/>
          {/* Intro only: dark screen that "powers on", and one sweep of light across the glass. */}
          <span className={styles.power}/>
          <span className={styles.sheen}/>
          <span className={styles.homeIndicator}/>
        </div>
      </div>
    </div>
  </div>;
}

/** Lesson progress bar. The fill width reads --progress (0 to 100). */
export function ProgressBar({value, animate = false, className, style}: Passthrough & {value: number; animate?: boolean}) {
  const pct = Math.max(0, Math.min(100, value));
  return <div className={cx(styles.progress, animate && styles.progressAnimate, className)} style={{...style, '--progress': `${pct}%`} as CSSVars}>
    <i/>
  </div>;
}

/** One outlined step row. `active` highlights the step the student is on. */
export function StepRow({step, active = false, index = 0, className, style}: Passthrough & {step: LessonStep; active?: boolean; /** Position in the list, used to stagger the intro (--i). */ index?: number}) {
  return <div className={cx(styles.step, step.done && styles.stepDone, active && styles.stepActive, className)} style={{...style, '--i': index} as CSSVars}>
    <b>{step.done ? <Check size={12} strokeWidth={3}/> : step.n}</b>{step.label}
  </div>;
}

export interface LessonScreenProps extends Passthrough {
  progress?: number;
  /** Index into `steps` of the highlighted step. */
  step?: number;
  steps?: LessonStep[];
  animate?: boolean;
}

/** Maths chapter 1 lesson, as it looks inside the app. */
export function LessonScreen({progress = 62, step = 1, steps = defaultSteps, animate = false, className, style}: LessonScreenProps) {
  const pct = Math.round(Math.max(0, Math.min(100, progress)));
  return <div className={cx(styles.lesson, animate && styles.lessonIntro, className)} style={style}>
    <small className={styles.eyebrow}>MATHS · CHAPTER 1</small>
    <strong className={styles.lessonTitle}>Real Numbers</strong>
    <ProgressBar value={progress} animate={animate}/>
    {/* The number is drawn by CSS (counter on --pct) so it can count up with the bar. */}
    <span className={styles.meta}>5 of 8 sections · <span className={styles.pct} style={{'--pct-final': pct} as CSSVars}/></span>
    <div className={styles.note}>
      <b>Euclid&apos;s division lemma</b>
      <p>For any two positive integers <i>a</i> and <i>b</i>, <i>a</i> = <i>bq</i> + <i>r</i>, where 0 ≤ <i>r</i> &lt; <i>b</i>.</p>
    </div>
    <div className={styles.steps}>{steps.map((s, i) => <StepRow key={s.label} step={s} index={i} active={i === step}/>)}</div>
    <div className={styles.next}>Next step</div>
  </div>;
}

export interface HeroPhoneProps extends Passthrough {
  progress?: number;
  step?: number;
  animate?: boolean;
  /** CSS transform list for the 3D tilt, e.g. "rotateY(-8deg) rotateX(4deg)". */
  tilt?: string;
}

/** Phone frame with the lesson screen inside. */
export function HeroPhone({progress = 62, step = 1, animate = true, tilt, className, style}: HeroPhoneProps) {
  return <PhoneFrame tilt={tilt} animate={animate} className={className} style={style}>
    <LessonScreen progress={progress} step={step} animate={animate}/>
  </PhoneFrame>;
}

export type FloatingCardVariant = 'quiz' | 'flash' | 'score';

export interface FloatingCardProps extends Passthrough {
  variant: FloatingCardVariant;
  /** Rotation in degrees, exposed as --card-tilt. */
  tilt?: number;
  animate?: boolean;
  /** Float animation delay in seconds, exposed as --float-delay. */
  delay?: number;
  /** When the pop-in starts, in seconds after page load (--intro-delay). The idle float starts after it. */
  introDelay?: number;
  /** Where the card pops in from, in px relative to its resting spot (--enter-x / --enter-y). Point it toward the phone. */
  enterFrom?: [number, number];
  /** Score card only: percentage shown in the ring. */
  score?: number;
}

/** A small card that floats beside the phone. */
export function FloatingCard({variant, tilt = 0, animate = true, delay = 0, introDelay = 0, enterFrom = [0, 12], score = 78, className, style}: FloatingCardProps) {
  const vars: CSSVars = {...style, '--card-tilt': `${tilt}deg`, '--float-delay': `${delay}s`, '--intro-delay': `${introDelay}s`, '--enter-x': `${enterFrom[0]}px`, '--enter-y': `${enterFrom[1]}px`};
  return <div className={cx(styles.float, styles[variant], animate && styles.floating, className)} style={vars}>
    {variant === 'quiz' && <>
      <small className={styles.eyebrow}>SCIENCE · LIGHT</small>
      <strong>Which mirror forms a virtual, enlarged image?</strong>
      <span className={styles.answer}>B · Concave, object inside F ✓</span>
    </>}
    {variant === 'flash' && <>
      <strong>Battle of Plassey</strong>
      <span>Tap to see the year</span>
    </>}
    {variant === 'score' && <>
      <span className={styles.ring} style={{'--score': `${score}%`} as CSSVars}><span>{score}%</span></span>
      <span className={styles.scoreText}><strong>Chapter check</strong><span>7 of 9 correct</span></span>
    </>}
  </div>;
}

/** The whole right-hand hero preview: phone plus three floating cards. Decorative only. */
export function HeroPreview({progress = 62, step = 1, animate = true, className, style}: Omit<HeroPhoneProps, 'tilt'>) {
  return <div className={cx(styles.preview, className)} style={style} aria-hidden="true">
    <HeroPhone progress={progress} step={step} animate={animate} className={styles.previewPhone}/>
    <FloatingCard variant="quiz" tilt={-4} animate={animate} delay={0} introDelay={1.1} enterFrom={[24, 10]} className={styles.posQuiz}/>
    <FloatingCard variant="flash" tilt={5} animate={animate} delay={1.2} introDelay={1.25} enterFrom={[-24, 10]} className={styles.posFlash}/>
    <FloatingCard variant="score" animate={animate} delay={2.4} introDelay={1.4} enterFrom={[-20, -14]} className={styles.posScore}/>
  </div>;
}
