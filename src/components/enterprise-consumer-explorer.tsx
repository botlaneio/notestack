'use client';

import {useState} from 'react';
import styles from './real-numbers-lesson.module.css';

const ventureQuestions = [
  ['Opportunity', 'Who needs the product or service, and what problem does it solve?'],
  ['Resources', 'Which skills, equipment, people and finance would the venture need?'],
  ['Costs and customers', 'What would delivery cost, and how would customers find and pay for it?'],
  ['Risk and learning', 'Which assumptions could be tested on a small scale before committing more resources?']
];
const packetFields = [
  ['Brand', 'Khojati', 'The manufacturer area also names Khojati Ayurved Pharma.'],
  ['Printed MRP', '₹30', 'The source prints ₹31 outside Maharashtra, inclusive of taxes.'],
  ['Manufactured', 'FEB 13', 'The printed month and year refer to February 2013.'],
  ['Expiry', 'JAN 16', 'The printed month and year refer to January 2016.']
];

export function EnterpriseConsumerExplorer({chapter}:{chapter:number}) {
  const [index,setIndex] = useState(0);
  if(chapter===32) return <section className={styles.explorer}>
    <h3>Build an enterprise plan</h3>
    <label>Planning question <select value={index} onChange={event=>setIndex(Number(event.target.value))}>
      {ventureQuestions.map(([name],position)=><option key={name} value={position}>{name}</option>)}
    </select></label>
    <p aria-live="polite"><strong>{ventureQuestions[index][0]}</strong> · {ventureQuestions[index][1]}</p>
    <p>Apply each question to a fictional repair service or another classroom enterprise idea.</p>
  </section>;
  return <section className={styles.explorer}>
    <h3>Read the source packet</h3>
    <label>Label detail <select value={index} onChange={event=>setIndex(Number(event.target.value))}>
      {packetFields.map(([name],position)=><option key={name} value={position}>{name}</option>)}
    </select></label>
    <div style={{border:'1px solid #cbd8e9',borderRadius:8,padding:18,background:'white',textAlign:'left'}}>
      <p>Textbook label · tri-Phalanjan</p>
      <dl>{packetFields.map(([name,value],position)=><div key={name} style={{fontWeight:position===index?700:400,marginBottom:12}}><dt>{name}</dt><dd>{value}</dd></div>)}</dl>
    </div>
    <p aria-live="polite">{packetFields[index][2]}</p>
    <p>The transcription preserves the dates and prices in the historical picture on page 150.</p>
  </section>;
}
