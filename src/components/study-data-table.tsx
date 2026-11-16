import type {PracticeTask} from '@/lib/real-number-practice';
import styles from './study-data-table.module.css';
export function StudyDataTable({table}:{table:NonNullable<PracticeTask['table']>}){
 return <div className={styles.wrap}><p className={styles.note}>Scroll the table sideways on a narrow screen if needed.</p><div className={styles.scroll} tabIndex={0} role="region" aria-label={table.caption??'Question data table'}><table><caption>{table.caption??'Question data'}</caption><thead><tr>{table.headers.map((h,i)=><th scope="col" key={`${i}-${h}`}>{h}</th>)}</tr></thead><tbody>{table.rows.map((row,i)=><tr key={i}>{row.map((cell,j)=>j===0?<th scope="row" key={j}>{cell}</th>:<td key={j}>{cell}</td>)}</tr>)}</tbody></table></div></div>;
}
