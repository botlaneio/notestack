'use client';
import {useState} from 'react';
import {indiaPoint} from '@/lib/social-9-10';
import outline from '@/lib/india-outline-learning.json';
import styles from './real-numbers-lesson.module.css';

const comparisons = {
  12: [
    ['Alluvial', 'River deposition', 'Transported sediment builds plains and deltas. Compare the Ganga plain with a nearby upland.'],
    ['Black', 'Weathering and clay', 'Clay-rich regur retains moisture. Cotton is one crop associated with the Deccan region.'],
    ['Red', 'Iron compounds', 'Iron oxides colour weathered peninsular soils. Ragi and oilseeds are textbook examples.'],
    ['Laterite', 'Leaching', 'Heavy rain washes soluble materials through the soil profile.'],
    ['Desert', 'Dry conditions', 'Sparse cover and wind influence sandy soils in western Rajasthan.'],
    ['Mountain', 'Slope and elevation', 'Organic litter, drainage and slope position produce local differences.']
  ],
  13: [
    ['Evergreen', 'Persistent moisture', 'A dense canopy persists as individual trees renew leaves at different times.'],
    ['Deciduous', 'Seasonal moisture', 'Many trees shed leaves during the dry season, reducing water loss.'],
    ['Grassland', 'Seasonally dry plains', 'Grasses dominate alongside scattered trees.'],
    ['Mangrove', 'Tidal estuary', 'Salt and waterlogging favour specialised roots and salt-tolerant plants.'],
    ['Desert', 'Scarce water', 'Thorn scrub, reduced leaves and deep roots occur in arid landscapes.'],
    ['Himalayan', 'Changing elevation', 'Vegetation changes with altitude from forest belts to alpine shrubs and meadows.']
  ]
};
const soilSites = [['Ganga plain',83,25],['Deccan, Maharashtra',76,20],['Southern Karnataka',77,13],['Western Ghats',75,14],['Western Rajasthan',71,27],['Himachal Himalaya',77,32]] as const;
const vegetationSites = [['Meghalaya',91.5,25.4],['Central India',80,22],['Interior Deccan',77,18],['Sundarbans',89,22],['Thar region',71,27],['Himalayan uplands',79,30.5]] as const;
function RegionalExample({site}:{site:readonly [string,number,number]}) {
  const [place,longitude,latitude]=site;
  const point=indiaPoint(longitude,latitude);
  return <figure><svg viewBox="0 0 400 300" role="img" aria-label={place+' on a generalised India outline'} style={{width:'100%',maxHeight:260}}><path d={outline.paths.join(' ')} fill="#e1eadf" stroke="#839888" strokeWidth=".45" fillRule="evenodd"/><circle cx={point.x} cy={point.y} r="6" fill="#a65322" stroke="white" strokeWidth="2"/></svg><figcaption>Regional example · {place}. The dot marks an approximate location. <a href={outline.url}>Survey of India outline</a></figcaption></figure>;
}
export function LandscapeExplorer({chapter}:{chapter:number}) {
  const [rain,setRain]=useState(118);
  const [index,setIndex]=useState(0);
  if(chapter===11) return <section className={styles.explorer}><h3>Read a rainfall map key</h3><label>Annual rainfall in centimetres <input type="range" min="0" max="350" value={rain} onChange={e=>setRain(Number(e.target.value))}/></label><meter aria-label="Annual rainfall on a 0 to 350 centimetre scale" min={0} max={350} value={rain} style={{width:"100%"}}/><p aria-live="polite">{rain} cm falls in the <strong>{rain<50?'low':rain<=250?'moderate':'heavy'}</strong> rainfall band.</p><p>Move to 50 and 250 cm to find the two boundaries in the book’s legend.</p></section>;
  const rows=comparisons[chapter===12?12:13];
  return <section className={styles.explorer}><label>{chapter===12?'Explore a soil group':'Explore a vegetation group'} <select value={index} onChange={e=>setIndex(Number(e.target.value))}>{rows.map(([name],i)=><option key={name} value={i}>{name}</option>)}</select></label><RegionalExample site={(chapter===12?soilSites:vegetationSites)[index]}/><p aria-live="polite"><strong>{rows[index][1]}</strong> → {rows[index][2]}</p></section>;
}
