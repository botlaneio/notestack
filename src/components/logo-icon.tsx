import styles from './logo-icon.module.css';

export interface LogoIconProps {
  size?: number;
  animated?: boolean;
  /** Omit when the icon appears next to the NoteStack wordmark. */
  label?: string;
  className?: string;
}

/** A server-renderable, CSS-animated card stack: two cards topped by a V. */
export function LogoIcon({size = 25, animated = true, label, className}: LogoIconProps) {
  return <svg
    xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24"
    fill="currentColor"
    className={[styles.icon, animated ? styles.animated : '', className].filter(Boolean).join(' ')}
    role={label ? 'img' : undefined} aria-label={label} aria-hidden={label ? undefined : true} focusable="false"
  >
    <g className={`${styles.enter} ${styles.enterBottom}`}><g className={styles.top}><rect x="4" y="2" width="16" height="4" rx="1.5" opacity="0.4"/></g></g>
    <g className={`${styles.enter} ${styles.enterMiddle}`}><g className={styles.middle}><rect x="4" y="7" width="16" height="4" rx="1.5" opacity="0.7"/></g></g>
    <g className={`${styles.enter} ${styles.enterTop}`}><g className={styles.bottom}><path d="M5.5 12h13a1.5 1.5 0 0 1 1.3 2.25l-6.5 7a1.5 1.5 0 0 1-2.6 0l-6.5-7A1.5 1.5 0 0 1 5.5 12Z"/></g></g>
  </svg>;
}
