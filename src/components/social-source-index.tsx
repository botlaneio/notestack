import entriesByChapter from '@/lib/social-source-index.json';
import styles from './real-numbers-lesson.module.css';

const sourceEntries: Record<string, {page: number; title: string; taskId: string}[]> = entriesByChapter;

export function SocialSourceIndex({chapter, slug}: {chapter: number; slug: string}) {
  const entries = sourceEntries[chapter];
  if (!entries) return null;

  return <details className={styles.explorer}>
    <summary style={{cursor:'pointer', minHeight:44}}>Textbook pictures, sidebars and activities</summary>
    <ul>{entries.map(entry => <li key={entry.page + entry.title}>
      <a href={`/learn/social-science/${slug}/practice/?task=${entry.taskId}`}>
        p. {entry.page} · {entry.title}
      </a>
    </li>)}</ul>
  </details>;
}
