import Link from 'next/link';
import styles from './real-number-workspace.module.css';
export function ChapterStudyNavigation({active,slug='real-numbers',title='Real Numbers',subject='maths'}:{active:'learn'|'practice'|'check'|'coverage';slug?:string;title?:string;subject?:'maths'|'science'}){
 return <nav className={styles.tabs} aria-label={`${title} study modes`}>{[['learn','Guided learning',`/learn/${subject}/${slug}/`],['practice','Textbook practice',`/learn/${subject}/${slug}/practice/`],['check',['proofs-in-mathematics','mathematical-modelling'].includes(slug)?'Appendix check':'Chapter check',`/learn/${subject}/${slug}/check/`],['coverage','Book coverage',`/learn/${subject}/${slug}/coverage/`]].map(([id,label,url])=><Link key={id} href={url} aria-current={active===id?'page':undefined}>{label}</Link>)}</nav>;
}

export const ChapterOneNavigation=ChapterStudyNavigation;
