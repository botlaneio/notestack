'use client';

import {useState} from 'react';
import outline from '@/lib/india-outline-learning.json';
import {indiaPoint} from '@/lib/social-9-10';
import styles from './real-numbers-lesson.module.css';

type Example = {name:string; longitude:number; latitude:number; explanation:string};
const examples: Record<number,Example[]> = {
  25: [
    {name:'Rice · West Bengal',longitude:88,latitude:23,explanation:'Warm, moist growing conditions and suitable water management support paddy cultivation.'},
    {name:'Wheat · Punjab',longitude:75,latitude:31,explanation:'A cool rabi growing period and irrigation support wheat production.'},
    {name:'Coffee · Karnataka',longitude:75.7,latitude:12.4,explanation:'Southern uplands combine suitable climate, slopes and processing networks.'}
  ],
  26: [
    {name:'Iron ore · Sandur region',longitude:76.5,latitude:15.1,explanation:'Karnataka deposits connect mining with transport and steel-making networks.'},
    {name:'Coal · Damodar valley',longitude:86.4,latitude:23.7,explanation:'Coal resources helped shape industrial and power-generation activity.'},
    {name:'Gold · Hutti',longitude:76.7,latitude:16.2,explanation:'Hutti is an important Indian gold-mining centre in Karnataka.'}
  ],
  27: [
    {name:'Mumbai',longitude:72.9,latitude:19.1,explanation:'A major port and a Golden Quadrilateral metropolitan endpoint.'},
    {name:'Chennai',longitude:80.3,latitude:13.1,explanation:'Road, rail, port and airport connections link the city with its hinterland.'},
    {name:'Kolkata',longitude:88.4,latitude:22.6,explanation:'A river-port city associated in the textbook with tea exports.'}
  ],
  28: [
    {name:'Jamshedpur',longitude:86.2,latitude:22.8,explanation:'Iron and steel activity illustrates the importance of raw materials, transport and industrial links.'},
    {name:'Mumbai–Pune',longitude:73.3,latitude:18.8,explanation:'A diversified industrial region with capital, labour, transport and market connections.'},
    {name:'Bengaluru',longitude:77.6,latitude:13,explanation:'A knowledge-industry cluster supported by skills, research and communication networks.'}
  ],
  29: [
    {name:'Himalayan region',longitude:79,latitude:30.5,explanation:'Earthquake and slope hazards require appropriate planning, construction and current local guidance.'},
    {name:'Brahmaputra valley',longitude:92,latitude:26.2,explanation:'Flood exposure depends on rainfall, rivers, terrain, drainage and where people and assets are located.'},
    {name:'Odisha coast',longitude:85.8,latitude:19.8,explanation:'Cyclone warnings, shelters and evacuation planning support risk reduction.'}
  ]
};

export function GeographyRegionsExplorer({chapter}:{chapter:number}) {
  const [index,setIndex] = useState(0);
  const locations = examples[chapter];
  const location = locations[index];
  const point = indiaPoint(location.longitude,location.latitude);
  return <section className={styles.explorer}>
    <h3>Connect the place and the process</h3>
    <label>Regional example <select value={index} onChange={event=>setIndex(Number(event.target.value))}>
      {locations.map(({name},position)=><option key={name} value={position}>{name}</option>)}
    </select></label>
    <figure>
      <svg viewBox="0 0 400 300" role="img" aria-label={location.name+' on a generalised India locator'} style={{width:'100%',maxHeight:260}}>
        <path d={outline.paths.join(' ')} fill="#e2eadf" stroke="#7e9587" strokeWidth=".5" fillRule="evenodd"/>
        <circle cx={point.x} cy={point.y} r="6" fill="#b5662d" stroke="white" strokeWidth="2"/>
      </svg>
      <figcaption>Approximate representative location. <a href={outline.url}>Survey of India outline</a></figcaption>
    </figure>
    <p aria-live="polite">{location.explanation}</p>
    {chapter===29&&<p>For actual events, consult current <a href="https://mausam.imd.gov.in/">IMD warnings</a> and <a href="https://ndma.gov.in/">NDMA guidance</a>.</p>}
  </section>;
}
