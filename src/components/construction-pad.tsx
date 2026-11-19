'use client';
import {useId,useState} from 'react';
import {parseExactAnswer} from '@/lib/exact-answer';
import styles from './real-number-workspace.module.css';
type Point={x:number;y:number};
export function ConstructionPad({value,onChange}:{value:string;onChange:(v:string)=>void}){
 const id=useId(),[mode,setMode]=useState<'segments'|'lines'>('lines');
 const rows=value.split('\n').map(line=>line.split(',').map(v=>parseExactAnswer(v)));
 const points:Point[]=rows.filter(v=>v.length===2&&v.every(n=>n!==null&&Math.abs(n)<=10000)).map(v=>({x:v[0]!,y:v[1]!}));
 const bound=Math.max(6,...points.flatMap(p=>[Math.abs(p.x),Math.abs(p.y)]))*1.2,scale=145/bound;
 const path:string[]=[];
 for(let i=1;i<points.length;i+=2){
  let a=points[i-1],b=points[i];
  if(mode==='lines'){
   const dx=b.x-a.x,dy=b.y-a.y,length=Math.hypot(dx,dy);
   if(length===0)continue;
   // Extend beyond the viewport even when the entered points are close together.
   const reach=4*bound;
   a={x:a.x-dx/length*reach,y:a.y-dy/length*reach};
   b={x:b.x+dx/length*reach,y:b.y+dy/length*reach};
  }
  path.push(`M${160+a.x*scale},${160-a.y*scale}L${160+b.x*scale},${160-b.y*scale}`);
 }
 return <details className={styles.solution}><summary>Open the graph construction pad</summary><p>Enter one x,y pair per line. Points 1–2 make the first line, points 3–4 the second. Use exact fractions or sqrt(...). For a polygon, choose segments and repeat shared endpoints in adjacent pairs. Record the interpretation in your written response.</p><label className={styles.field}>Your plotted points<textarea rows={5} value={value} onChange={e=>onChange(e.target.value)} placeholder={'0, 5\n5, 0\n0, 6\n3, 0'}/></label><label className={styles.field}>Connect as<select value={mode} onChange={e=>setMode(e.target.value as 'segments'|'lines')}><option value="lines">Extended lines</option><option value="segments">Segments</option></select></label><svg viewBox="0 0 320 320" role="img" aria-label={`Your construction: ${points.length} valid plotted points. Both axes use the same scale.`} style={{width:'100%',maxWidth:480,background:'white'}}><defs><clipPath id={id}><rect x="10" y="10" width="300" height="300"/></clipPath></defs><path d="M10 160H310M160 10V310" stroke="#7c8da3"/><g fontSize="10" fill="#34475b"><text x="306" y="153">x</text><text x="147" y="15">y</text><text x="149" y="172">O</text></g>{[-1,-.5,.5,1].map(t=><g key={t}><path d={`M${160+t*145} 157v6M157 ${160-t*145}h6`} stroke="#7c8da3"/><text x={160+t*145} y="178" textAnchor="middle" fontSize="9">{Number((t*bound).toPrecision(3))}</text><text x="164" y={160-t*145} fontSize="9">{Number((t*bound).toPrecision(3))}</text></g>)}<g clipPath={`url(#${id})`}>{path.map((d,i)=><path key={i} d={d} stroke={i%2?'#9b5b32':'#2f6fe4'} strokeWidth="2" fill="none"/>)}{points.map((p,i)=><g key={i}><circle cx={160+p.x*scale} cy={160-p.y*scale} r="3" fill="#1f2537"/><text x={165+p.x*scale} y={155-p.y*scale} fontSize="9">{i+1}</text></g>)}</g></svg><p className={styles.note}>Equal axis scales. Only valid coordinate pairs are drawn. This pad helps construct a graph; it does not grade its accuracy. Points save with this question. The line/segment display setting resets when you reopen it.</p></details>;
}
