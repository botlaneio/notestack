import styles from './logo-icon.module.css';

export interface LogoIconProps {
  size?: number;
  animated?: boolean;
  /** Omit when the icon appears next to the NoteStack wordmark. */
  label?: string;
  className?: string;
}

/** A server-renderable, CSS-animated stack of three pages. */
export function LogoIcon({size = 25, animated = true, label, className}: LogoIconProps) {
  return <svg
    xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    className={[styles.icon, animated ? styles.animated : '', className].filter(Boolean).join(' ')}
    role={label ? 'img' : undefined} aria-label={label} aria-hidden={label ? undefined : true} focusable="false"
  >
    <g className={`${styles.enter} ${styles.enterBottom}`}><g className={styles.bottom}><path d="m2 16 10 5 10-5"/></g></g>
    <g className={`${styles.enter} ${styles.enterMiddle}`}><g className={styles.middle}><path d="m2 12 10 5 10-5"/></g></g>
    <g className={`${styles.enter} ${styles.enterTop}`}><g className={styles.top}><path d="m12 3 10 5-10 5L2 8Z"/></g></g>
  </svg>;
}
