'use client';

import {useState} from 'react';
import styles from './real-numbers-lesson.module.css';

const timelines: Record<number, [number, string, string][]> = {
  17: [[1856,'Annexation of Awadh','Political grievances joined military and economic discontent.'],[1857,'Meerut and Delhi','The May uprising spread to major northern centres.'],[1858,'Crown rule','Company government gave way to direct Crown administration.']],
  18: [[1885,'Congress founded','An organisation connected earlier political associations.'],[1905,'Bengal partition','Swadeshi and boycott widened mobilisation.'],[1919,'Rowlatt and Amritsar','Repression intensified opposition.'],[1920,'Non-Cooperation','Withdrawal of cooperation became a mass strategy.'],[1930,'Salt Satyagraha','The march to Dandi challenged the salt law.'],[1942,'Quit India','Arrests were followed by widespread resistance.'],[1947,'Independence and partition','Political freedom came alongside displacement and violence.']],
  19: [[1947,'Independence','Refugee rehabilitation and integration demanded action.'],[1950,'Republic','The Constitution came into effect.'],[1954,'French settlements transfer','Indian administration began in the principal French settlements.'],[1956,'State reorganisation','Major changes followed linguistic and administrative demands.'],[1961,'Goa liberated','Portuguese rule ended following Operation Vijay.'],[1962,'Legal French transfer','The legal transfer followed the earlier administrative change.']],
  20: [[1914,'First World War begins','The Sarajevo crisis escalated through alliances and rivalries.'],[1918,'Armistice','The principal fighting ended.'],[1919,'Versailles','Peace terms shaped the interwar settlement.'],[1939,'War begins in Europe','Germany invaded Poland.'],[1945,'Second World War ends','The United Nations and a changed world order followed.']]
};

export function FreedomTimelineExplorer({chapter}:{chapter:number}) {
  const [index,setIndex] = useState(0);
  const events = timelines[chapter];
  const [year,title,detail] = events[index];
  return <section className={styles.explorer}>
    <h3>Connect the sequence</h3>
    <label>Historical event <select value={index} onChange={event=>setIndex(Number(event.target.value))}>
      {events.map(([date,name],position)=><option key={date} value={position}>{date} · {name}</option>)}
    </select></label>
    <ol>{events.map(([date,name],position)=><li key={date} style={{fontWeight:position===index?700:400}}>{date} — {name}</li>)}</ol>
    <p aria-live="polite"><strong>{year} · {title}</strong> {detail}</p>
  </section>;
}
