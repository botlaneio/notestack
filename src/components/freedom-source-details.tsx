'use client';

import {useState} from 'react';
import Link from 'next/link';
import {useSourceDetails} from './guide-steps-context';

export function FreedomSourceDetails() {
  const details = useSourceDetails();
  const [index,setIndex] = useState(0);
  const detail = details[index];
  if (!detail) return null;
  return <details style={{marginTop:20,textAlign:'left',minWidth:0,overflowWrap:'anywhere'}}>
    <summary style={{minHeight:44,cursor:'pointer'}}>Explore the source sidebars and leader accounts</summary>
    <label style={{display:'block',minWidth:0}}>Source page detail <select style={{display:'block',width:'100%',maxWidth:'100%',minWidth:0,boxSizing:'border-box'}} value={index} onChange={event=>setIndex(Number(event.target.value))}>
      {details.map((item,position)=><option key={item.id} value={position}>p{item.page} · {item.title}</option>)}
    </select></label>
    <article aria-live="polite" style={{padding:16,border:'1px solid #cbd8e9',background:'white',borderRadius:8}}>
      <h4>{detail.title}</h4>
      {detail.explanation.map(paragraph=><p key={paragraph}>{paragraph}</p>)}
      <Link href={'/learn/social-science/the-freedom-struggle/practice/?task='+detail.id}>Write and review your explanation →</Link>
    </article>
  </details>;
}
