import Link from 'next/link';
import styles from './real-number-workspace.module.css';
export function ChapterOneNavigation({active}:{active:'learn'|'practice'|'check'|'coverage'}){
 return <nav className={styles.tabs} aria-label="Real Numbers study modes">{[['learn','Guided learning','/learn/maths/real-numbers/'],['practice','Textbook practice','/learn/maths/real-numbers/practice/'],['check','Chapter check','/learn/maths/real-numbers/check/'],['coverage','Book coverage','/learn/maths/real-numbers/coverage/']].map(([id,label,url])=><Link key={id} href={url} aria-current={active===id?'page':undefined}>{label}</Link>)}</nav>;
}
