'use client';

import {useState} from 'react';
import {sourceMapReadings, textbookMaps} from '@/lib/source-map-reading';
import styles from './real-numbers-lesson.module.css';

export function SourceMapReading({chapter}:{chapter:number}) {
  const [checked,setChecked] = useState<string[]>([]);
  const map = sourceMapReadings.find(item=>item.chapter===chapter);
  if (!map) return null;
  return <details className={styles.explorer}>
    <summary style={{cursor:'pointer',minHeight:44}}>Read the full textbook map · {map.title}</summary>
    {textbookMaps[chapter].map(figure=>{
      const url = `/maps/${figure.file}.webp`;
      return <figure key={figure.file} style={{margin:'1rem 0'}}>
        <h4>{figure.title}</h4>
        <a href={url} target="_blank" rel="noreferrer" aria-label={`Enlarge ${figure.title} in a new tab`}>
          <img src={url} alt={figure.description} loading="lazy" style={{display:'block',width:'100%',maxWidth:640,height:'auto'}}/>
        </a>
        <figcaption>{figure.description} <small>KTBS Class 10 Social Science, p. {figure.page}.</small></figcaption>
        <a href={url} target="_blank" rel="noreferrer">Open full-size map ↗</a>
      </figure>;
    })}
    <fieldset><legend>Chapter geography checklist</legend>{map.layers.map(layer=><label key={layer} style={{display:'flex',gap:8,textAlign:'left',margin:'12px 0'}}>
      <input type="checkbox" checked={checked.includes(layer)} onChange={event=>setChecked(previous=>event.target.checked?[...previous,layer]:previous.filter(value=>value!==layer))}/>{layer}
    </label>)}</fieldset>
    <ol>{map.questions.map(question=><li key={question}>{question}</li>)}</ol>
    <p>{checked.length} of {map.layers.length} map layers inspected in this session. Compare your annotations with the source and ask a teacher to review the completed map.</p>
    <p>Reference maps are available from <a href="https://surveyofindia.gov.in/pages/outline-maps-of-india" target="_blank" rel="noreferrer">Survey of India</a>.</p>
  </details>;
}
