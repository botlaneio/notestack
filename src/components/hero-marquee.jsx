'use client';
import {useState} from 'react';
import {Layers,Pause,Play} from 'lucide-react';
import {products} from '@/lib/catalog';
import styles from './hero-marquee.module.css';
const panels=[{id:'collection',title:'The core collection',caption:<>THREE SUBJECTS.<br/>ONE FOCUSED START.</>,detail:'Mathematics · Science · Social Science'},...products.map(p=>({id:p.id,title:p.title,caption:<>ONE SUBJECT.<br/>A CLEARER NEXT STEP.</>,detail:'Notes · Question bank · Revision',product:p}))];
function Panel({panel,duplicate}){
 const cover=(p,className)=><img key={p.id} src={p.image} width="380" height="530" alt={duplicate?'':`NoteStack ${p.title} SSLC 2027 subject pack cover`} className={className} loading="eager" decoding="async"/>;
 return <div className={`${styles.slide} ${panel.product?styles.single:''}`} data-subject={panel.id} role={duplicate?undefined:'group'} aria-label={duplicate?undefined:panel.title}>
 <div className="hero-grid"/><div className="art-circle"/><span className="art-caption-top">{panel.caption}</span>
 <div className="hero-books">{panel.product?cover(panel.product,styles.subjectCover):[products[2],products[0],products[1]].map((p,i)=>cover(p,`hero-book hero-book-${i}`))}</div>
 <div className="hero-sticker"><span><Layers size={21}/></span><div><strong>{panel.title}</strong><small>{panel.detail}</small></div></div><span className="art-index">{panel.product?'SUBJECT PACK':'01 — 03'} / CLASS 10</span><span className="art-plus">+</span></div>;
}
export function HeroMarquee(){
 const [paused,setPaused]=useState(false);
 return <div className={`hero-art ${styles.marquee}`} aria-label="Explore the NoteStack core collection"><div className={styles.viewport} tabIndex={0} aria-label="Collection artwork. When reduced motion is enabled, scroll to explore all four panels."><div className={styles.track} style={{animationPlayState:paused?'paused':undefined}}>{panels.map(panel=><Panel key={panel.id} panel={panel}/>)}<div className={styles.duplicates} aria-hidden="true">{panels.map(panel=><Panel key={panel.id} panel={panel} duplicate/>)}</div></div></div><button className={styles.pause} type="button" aria-label={paused?'Play hero marquee':'Pause hero marquee'} aria-pressed={paused} onClick={()=>setPaused(p=>!p)}>{paused?<Play size={13}/>:<Pause size={13}/>}<span>{paused?'Play':'Pause'}</span></button></div>;
}
