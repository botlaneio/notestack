import Link from 'next/link';
import styles from './real-number-workspace.module.css';
export function ChapterStudyNavigation({active,slug='real-numbers',title='Real Numbers'}:{active:'learn'|'practice'|'check'|'coverage';slug?:string;title?:string}){
 return <nav className={styles.tabs} aria-label={`${title} study modes`}>{[['learn','Guided learning',`/learn/maths/${slug}/`],['practice','Textbook practice',`/learn/maths/${slug}/practice/`],['check','Chapter check',`/learn/maths/${slug}/check/`],['coverage','Book coverage',`/learn/maths/${slug}/coverage/`]].map(([id,label,url])=><Link key={id} href={url} aria-current={active===id?'page':undefined}>{label}</Link>)}</nav>;
}

export const ChapterOneNavigation=ChapterStudyNavigation;
