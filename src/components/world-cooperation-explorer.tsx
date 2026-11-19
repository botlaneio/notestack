'use client';

import {useState} from 'react';
import styles from './real-numbers-lesson.module.css';

const policyCases = [
  ['Human rights', 'A community reports discriminatory exclusion from a public service.', 'Identify the right, the evidence and the institution able to investigate or provide a remedy.'],
  ['Arms competition', 'Two States increase military spending in response to each other.', 'Examine escalation risk, resources, diplomacy and verifiable arms-control commitments.'],
  ['Development', 'A region seeks finance for health and transport.', 'Compare the terms, local priorities and effects of development cooperation.']
];
const organisations = [
  ['General Assembly', 'A forum for all UN member States', 'Each State has one vote. The Assembly discusses issues and approves the UN budget.'],
  ['Security Council', 'International peace and security', 'Five permanent and ten elected members operate under specific voting rules.'],
  ['Economic and Social Council', 'Economic, social and related cooperation', 'Its 54 members serve three-year terms. It studies development issues and coordinates cooperation with specialised agencies.'],
  ['Trusteeship Council', 'Supervision of trust territories', 'It suspended regular operations in 1994 after Palau, the last trust territory, became independent. It remains a principal organ under the Charter.'],
  ['Secretariat', 'Administration and implementation', 'The Secretary-General and international staff carry out the organisation’s day-to-day work and mandates.'],
  ['ICJ', 'Legal disputes between States', 'Jurisdiction and State consent matter. The Court also gives authorised advisory opinions.'],
  ['WHO', 'International public health', 'Health standards, surveillance and cooperation support national health systems.'],
  ['UNESCO', 'Education, science and culture', 'Heritage recognition and knowledge cooperation connect governments and communities.'],
  ['ILO', 'Decent work and labour standards', 'Governments, employers and workers participate in its tripartite system.'],
  ['IMF', 'Monetary cooperation', 'Surveillance, financing and technical assistance address macroeconomic and external-payment issues.']
];

export function WorldCooperationExplorer({chapter}:{chapter:number}) {
  const [index,setIndex] = useState(0);
  const [revealed,setRevealed] = useState(false);
  const cards = chapter===21 ? policyCases : organisations;
  const [name,setting,explanation] = cards[index];
  return <section className={styles.explorer}>
    <h3>{chapter===21?'Apply a policy principle':'Which institution fits the task?'}</h3>
    {chapter===22&&<div role="group" aria-label="Six principal organs of the United Nations">
      <p><strong>United Nations · six principal organs</strong></p>
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(min(100%,180px),1fr))',gap:10}}>
        {organisations.slice(0,6).map(([title,role],position)=><button key={title} onClick={()=>{setIndex(position);setRevealed(true);}} aria-pressed={index===position} style={{padding:12,textAlign:'left',border:'1px solid #9eb4ce',borderRadius:8,background:index===position?'#dce8fa':'white',color:'#193148'}}><strong>{title}</strong><span style={{display:'block',marginTop:6}}>{role}</span></button>)}
      </div>
      <p>Choose an organ to examine its role below.</p>
    </div>}
    <label>{chapter===21?'Global challenge':'Organisation'} <select value={index} onChange={event=>{setIndex(Number(event.target.value));setRevealed(false);}}>
      {chapter===21?cards.map(([title],position)=><option key={title} value={position}>{title}</option>):<><optgroup label="Principal UN organs">{cards.slice(0,6).map(([title],position)=><option key={title} value={position}>{title}</option>)}</optgroup><optgroup label="Specialised agencies and related institutions">{cards.slice(6).map(([title],position)=><option key={title} value={position+6}>{title}</option>)}</optgroup></>}
    </select></label>
    <div style={{padding:16,border:'1px solid #cbd8e9',borderRadius:8,background:'white',textAlign:'left'}}>
      <strong>{name}</strong><p>{setting}</p>
      <button className={styles.secondary} onClick={()=>setRevealed(!revealed)}>{revealed?'Hide explanation':'Explore the role'}</button>
      {revealed&&<p aria-live="polite">{explanation}</p>}
    </div>
  </section>;
}
