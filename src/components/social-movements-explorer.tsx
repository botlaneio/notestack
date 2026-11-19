'use client';

import {useState} from 'react';
import styles from './real-numbers-lesson.module.css';

const movements = [
  ['Chipko', 'Garhwal Himalayas', 'Forest felling and local livelihoods', 'Villagers organised forest-protection campaigns and embraced trees.'],
  ['Appiko', 'Uttara Kannada, Karnataka', 'Forest protection and regeneration', 'Participants connected protection with growing trees and sustainable use.'],
  ['Narmada Bachao Andolan', 'Narmada basin', 'Displacement, rehabilitation and ecological impacts', 'Affected communities and campaigners challenged the distribution of costs and benefits.'],
  ['Self-help groups', 'Community organisations', 'Savings, opportunity and participation', 'Members use cooperation, finance and skills to pursue agreed aims.']
];

export function SocialMovementsExplorer({chapter}:{chapter:number}) {
  const [index,setIndex] = useState(0);
  const [year,setYear] = useState(2011);
  if(chapter===24) return <section className={styles.explorer}>
    <h3>Read the Census comparison</h3>
    <label>Reference year <select value={year} onChange={event=>setYear(Number(event.target.value))}>
      <option value={2001}>2001</option><option value={2011}>2011</option>
    </select></label>
    <p aria-live="polite">{year===2001?933:943} females per 1,000 males in the textbook’s national figures.</p>
    <meter aria-label="Females per 1,000 males, shown on a zero to 1,200 scale" min={0} max={1200} value={year===2001?933:943}/>
    <p>Record the year, population and denominator. The 2011 rural figure is 949 and the urban figure 928 per 1,000 males. Consider the populations being compared before explaining a difference.</p>
  </section>;
  const [name,place,issue,action] = movements[index];
  return <section className={styles.explorer}>
    <h3>Connect a movement with its aims</h3>
    <label>Movement <select value={index} onChange={event=>setIndex(Number(event.target.value))}>
      {movements.map(([title],position)=><option key={title} value={position}>{title}</option>)}
    </select></label>
    <dl style={{textAlign:'left'}}><dt><strong>{name}</strong></dt><dd>{place}</dd><dt>Issue</dt><dd>{issue}</dd><dt>Action</dt><dd>{action}</dd></dl>
    <p>What evidence would you seek about participation and outcomes?</p>
  </section>;
}
