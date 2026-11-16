import {lewisModels} from '@/lib/materials-carbon';
import {LewisDiagram,ValenceDots} from './materials-carbon-explorers';
import styles from './science-explorers.module.css';
export function MaterialsCarbonObservation({chapter,reference}:{chapter:number;reference:string}){
 if(chapter===3&&reference==='In-text · p13 Q1(i)')return <figure className={styles.diagram}><div style={{display:'flex',flexWrap:'wrap',justifyContent:'center'}}><ValenceDots symbol="Na" count={1} charge=""/><ValenceDots symbol="O" count={6} charge=""/><ValenceDots symbol="Mg" count={2} charge=""/></div><figcaption>Outer-shell dots only:Na1,O6,Mg2. Dot placement can rotate,but electron counts and pairing must remain correct.</figcaption></figure>;
 if(chapter===3&&reference.startsWith('Activity 3.13'))return <figure className={styles.diagram}><div className={styles.swatches}>{[['Solid','Ions fixed in a lattice'],['Molten','Ions can migrate'],['Aqueous,if soluble','Dissolved ions can migrate']].map(([a,b])=><div className={styles.swatch} key={a}><strong>{a}</strong><span>{b}</span></div>)}</div><figcaption>Ionic-state conductivity model. Having charge is not the same as having mobile charge carriers;solubility must be checked.</figcaption></figure>;
 if(chapter===3&&reference.startsWith('Activity 3.14'))return <figure className={styles.diagram}><div className={styles.swatches}>{[['A · air and water','Rust expected'],['B · oxygen excluded','Boiled water + oil barrier'],['C · moisture excluded','Dry-air control']].map(([a,b])=><div className={styles.swatch} key={a}><strong>{a}</strong><span>{b}</span></div>)}</div><figcaption>Three source rusting controls,schematic rather than measured results. The comparison depends on effectively excluding the stated factor.</figcaption></figure>;
 if(chapter!==4)return null;
 const name=reference==='In-text · p25 Q1'?'CO2':reference==='In-text · p25 Q2'?'S8':reference==='In-text · p32 Q3'?'C5H10 (cyclopentane)':reference==='In-text · p33 Q5(ii)'?'CH2O (methanal)':null;
 if(!name)return null;const model=lewisModels.find(m=>m.name===name)!;
 return <figure className={styles.diagram}><LewisDiagram model={model}/><figcaption>{name} · redrawn Lewis/connectivity model. Blue pairs are shared;grey pairs are lone pairs. This is not a3D geometry model. Explain electron counts and bond orders in your own response.</figcaption></figure>;
}
