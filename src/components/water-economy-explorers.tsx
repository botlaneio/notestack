'use client';

import {useState} from 'react';
import styles from './real-numbers-lesson.module.css';

export function WaterHarvestExplorer() {
  const [rain, setRain] = useState(20);
  const collected = rain * 50 * 0.8;
  return <section className={styles.explorer}>
    <h3>How much water could a roof collect?</h3>
    <label>Rainfall in millimetres <input type="range" min="0" max="100" value={rain} onChange={event => setRain(Number(event.target.value))}/></label>
    <p aria-live="polite">{rain} mm on a 50 m² roof could collect <strong>{collected.toLocaleString('en-IN')} litres</strong> at 80% collection efficiency.</p>
    <meter aria-label="Collected water in litres" min={0} max={4000} value={collected}/>
    <p>One millimetre of rain on one square metre supplies one litre. This example assumes the tank has enough space and four-fifths of the rain reaches it.</p>
  </section>;
}

const sectorShares = [[59, 13, 28], [14, 27, 59]];
export function SectorShareExplorer() {
  const [year, setYear] = useState(0);
  return <section className={styles.explorer}>
    <h3>Where did national income come from?</h3>
    <label>Graph year <select value={year} onChange={event => setYear(Number(event.target.value))}>
      <option value={0}>1950–51</option><option value={1}>2011–12</option>
    </select></label>
    <div aria-live="polite">{['Agriculture', 'Industry', 'Services'].map((sector,index) => <p key={sector}>
      {sector} · {sectorShares[year][index]}% <meter aria-label={sector+' share'} min={0} max={100} value={sectorShares[year][index]}/>
    </p>)}</div>
    <p>Each group of bars totals 100%. Change the year and trace which sector gained the largest share.</p>
  </section>;
}
