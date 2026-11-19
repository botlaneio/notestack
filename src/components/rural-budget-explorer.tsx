'use client';

import {useState} from 'react';
import styles from './real-numbers-lesson.module.css';

const localRoles = [
  ['Grama Panchayat', 'Village-level priorities', 'Water, sanitation, roads and local services can be discussed through community participation and local plans.'],
  ['Taluk Panchayat', 'Intermediate coordination', 'Activities spanning village areas need coordination with the institutions and departments responsible.'],
  ['Zilla Panchayat', 'District-level development', 'District planning links resources, programmes and priorities across the district.']
];

export function RuralBudgetExplorer({chapter}:{chapter:number}) {
  const [level,setLevel] = useState(0);
  const [expenditure,setExpenditure] = useState(120);
  if(chapter===30) return <section className={styles.explorer}>
    <h3>Connect the Panchayat levels</h3>
    <label>Institution <select value={level} onChange={event=>setLevel(Number(event.target.value))}>
      {localRoles.map(([name],index)=><option key={name} value={index}>{name}</option>)}
    </select></label>
    <ol>{localRoles.map(([name],index)=><li key={name} style={{fontWeight:level===index?700:400}}>{name}</li>)}</ol>
    <p aria-live="polite"><strong>{localRoles[level][1]}</strong> · {localRoles[level][2]}</p>
  </section>;
  const fiscal = expenditure - 90 - 10;
  const primary = fiscal - 5;
  return <section className={styles.explorer}>
    <h3>Calculate the financing gap</h3>
    <label>Illustrative expenditure <input type="range" min="100" max="150" value={expenditure} onChange={event=>setExpenditure(Number(event.target.value))}/></label>
    <p>Revenue receipts are 90 units, non-debt capital receipts 10 and interest payments 5.</p>
    <p aria-live="polite">Fiscal deficit = {expenditure} − 90 − 10 = <strong>{fiscal}</strong> units. Primary deficit = {fiscal} − 5 = <strong>{primary}</strong> units.</p>
    <meter aria-label="Fiscal deficit in illustrative units" min={0} max={50} value={fiscal}/>
    <p>This model reports expenditure exceeding non-debt receipts as a positive fiscal deficit. A negative primary result means a primary surplus under this convention.</p>
  </section>;
}
