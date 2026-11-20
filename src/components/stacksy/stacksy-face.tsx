import styles from './stacksy.module.css';

export type StacksyMood = 'hello' | 'thinking' | 'happy' | 'resting';

const NAVY = '#1f2a44';
const BLUSH = '#f4a6a6';

/** Stacksy, the Flashcard Friend: a white study card with a navy bookmark ribbon and cards fanned behind. */
export function StacksyFace({mood = 'hello', size = 72, wave = false}: {mood?: StacksyMood; size?: number; wave?: boolean}) {
  return <svg width={size} height={size} viewBox="0 0 120 120" aria-hidden="true" focusable="false" className={styles.face}>
    <rect x="32" y="22" width="70" height="82" rx="12" fill="#dfe4ee" transform="rotate(7 67 63)"/>
    {wave && <g className={styles.waveArm}>
      <path d="M95 62q9-3 11-14" stroke={NAVY} strokeWidth="4" fill="none" strokeLinecap="round"/>
      <circle cx="106" cy="44" r="5" fill="#fff" stroke={NAVY} strokeWidth="4"/>
    </g>}
    <g transform={mood === 'thinking' ? 'rotate(-6 60 59)' : undefined}>
      <rect x="24" y="16" width="72" height="86" rx="12" fill="#fff" stroke={NAVY} strokeWidth="4"/>
      <path d="M53 16h14v14l-7-5-7 5Z" fill={NAVY}/>
      {mood === 'hello' && <>
        <g className={styles.eye}><ellipse cx="47" cy="52" rx="4.5" ry="5.5" fill={NAVY}/></g>
        <g className={styles.eye}><ellipse cx="73" cy="52" rx="4.5" ry="5.5" fill={NAVY}/></g>
        <circle cx="39" cy="62" r="3.8" fill={BLUSH} opacity="0.85"/>
        <circle cx="81" cy="62" r="3.8" fill={BLUSH} opacity="0.85"/>
        <path d="M53 62q7 8 14 0" stroke={NAVY} strokeWidth="4" fill="none" strokeLinecap="round"/>
      </>}
      {mood === 'thinking' && <>
        <circle cx="49" cy="48" r="3.8" fill={NAVY}/>
        <circle cx="75" cy="48" r="3.8" fill={NAVY}/>
        <path d="M54 63h11" stroke={NAVY} strokeWidth="4" strokeLinecap="round"/>
        <circle className={styles.dot1} cx="44" cy="84" r="3" fill={NAVY}/>
        <circle className={styles.dot2} cx="56" cy="84" r="3" fill={NAVY}/>
        <circle className={styles.dot3} cx="68" cy="84" r="3" fill={NAVY}/>
      </>}
      {mood === 'happy' && <>
        <path d="M41 54q6-7 12 0M67 54q6-7 12 0" stroke={NAVY} strokeWidth="4" fill="none" strokeLinecap="round"/>
        <circle cx="39" cy="63" r="3.8" fill={BLUSH} opacity="0.85"/>
        <circle cx="81" cy="63" r="3.8" fill={BLUSH} opacity="0.85"/>
        <path d="M50 62q10 13 20 0Z" fill={NAVY}/>
      </>}
      {mood === 'resting' && <>
        <path d="M42 53q5 4 10 0M68 53q5 4 10 0" stroke={NAVY} strokeWidth="4" fill="none" strokeLinecap="round"/>
        <path d="M56 65h8" stroke={NAVY} strokeWidth="4" strokeLinecap="round"/>
      </>}
    </g>
  </svg>;
}

/** Bolder, simpler face for small sizes (chat bubbles, panel header). */
export function StacksyMini({size = 24, onNavy = false}: {size?: number; onNavy?: boolean}) {
  return <svg width={size} height={size} viewBox="0 0 120 120" aria-hidden="true" focusable="false" className={styles.face}>
    <rect x="20" y="12" width="80" height="96" rx="18" fill="#fff" stroke={onNavy ? '#fff' : NAVY} strokeWidth="10"/>
    {size >= 32 && <path d="M51 12h18v18l-9-6-9 6Z" fill={NAVY}/>}
    <ellipse cx="45" cy="56" rx="9" ry="10" fill={NAVY}/>
    <ellipse cx="75" cy="56" rx="9" ry="10" fill={NAVY}/>
    <path d="M46 78q14 14 28 0" stroke={NAVY} strokeWidth="10" fill="none" strokeLinecap="round"/>
  </svg>;
}
