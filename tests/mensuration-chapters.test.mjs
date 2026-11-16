import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {mensurationChapters} from '../src/lib/maths-chapters-11-12.ts';
import {sectorMeasures,compositeMeasures,capsuleCylinderHeight,cylinderWithConicalCavity,massInKg} from '../src/lib/mensuration.ts';
import {checkField} from '../src/lib/real-number-practice.ts';
import {blankWork,restoreWork,proofReviewed,calculationCorrect} from '../src/lib/real-number-workbook.ts';
const data=JSON.parse(fs.readFileSync(new URL('../src/lib/mensuration-practice-data.json',import.meta.url)));
const close=(a,b)=>assert.ok(Math.abs(a-b)<=1e-10*Math.max(1,Math.abs(b)),`${a} != ${b}`);
const task=(n,ref)=>data.chapters[n].find(t=>t.reference===ref);
test('this batch is exactly Chapters 11 and 12, including all source questions, parts and numbered examples',()=>{
 assert.deepEqual(mensurationChapters.map(c=>c.number),[11,12]);const counts={11:{'11.1':20},12:{'12.1':9,'12.2':8}},exampleCounts={11:2,12:7};
 for(const c of mensurationChapters){const ts=data.chapters[c.number];assert.equal(new Set(ts.map(t=>t.id)).size,ts.length);
  for(const [ref,count] of Object.entries(counts[c.number]))assert.equal(ts.filter(t=>t.reference.startsWith('Exercise '+ref)).length,count,ref);
  for(let n=1;n<=exampleCounts[c.number];n++)assert.equal(ts.filter(t=>t.reference===`Example ${n}`).length,1);
  assert.equal(data.checks[c.number].length,7);assert.equal(new Set([...ts,...data.checks[c.number]].map(t=>t.id)).size,ts.length+7);
  for(const t of [...ts,...data.checks[c.number]]){assert.ok(t.prompt.length>20&&t.solution.length>0);assert.ok(!!t.fields!==!!t.checklist);
   if(t.fields){assert.equal(new Set(t.fields.map(f=>f.label)).size,t.fields.length);for(const f of t.fields){assert.ok(Number.isFinite(f.answer));assert.equal(checkField(f,String(f.answer)).correct,true,t.id)}}
   else{const w={...blankWork(t),draft:'A long answer is not by itself evidence of correct mathematics.',submitted:true};assert.equal(proofReviewed(t,w),false);assert.equal(calculationCorrect(t,w),false)}
  }
 }
 for(const q of ['1','2','3','4(i)','4(ii)','5(i)','5(ii)','5(iii)','6(i)','6(ii)','7','8(i)','8(ii)','9(i)','9(ii)','10','11','12','13','14'])assert.ok(task(11,'Exercise 11.1 · '+q));
});
test('sector and segment complements, lengths, areas and special-angle triangles agree',()=>{
 for(const r of [1,3.5,7,21,28])for(const angle of [15,30,45,60,90,120,150,180]){
  const m=sectorMeasures(r,angle,22/7);close(m.sector+m.majorSector,m.disc);close(m.segment+m.majorSegment,m.disc);close(m.sector-m.segment,m.triangle);close(m.arc/(2*(22/7)*r),angle/360);close(m.sectorPerimeter,m.arc+2*r);assert.ok(m.segment>=0&&m.segment<=m.sector);
 }
 close(sectorMeasures(10,90,3.14).segment,28.5);close(sectorMeasures(21,60,22/7).triangle,441*Math.sqrt(3)/4);close(sectorMeasures(21,120,22/7).triangle,441*Math.sqrt(3)/4);assert.equal(sectorMeasures(7,180,22/7).triangle,0);
 for(const args of [[0,60],[5,0],[5,181],[5,60,0],[5,NaN]])assert.throws(()=>sectorMeasures(...args));
});
test('joining changes exposed faces without changing the combined volume',()=>{
 for(const kind of ['toy','capsule','cone-cylinder'])for(const r of [1,2.5,7])for(const h of [2,6,12]){
  const m=compositeMeasures(kind,r,h,22/7),disc=(22/7)*r*r;close(m.separateArea-m.joinedArea,m.hiddenArea);close(m.hiddenArea,2*m.joins*disc);assert.ok(m.volume>0&&m.joinedArea>0);
  const expected=kind==='toy'?disc*h/3+2*disc*r/3:kind==='capsule'?disc*h+4*disc*r/3:disc*h+disc*h/3;close(m.volume,expected);
 }
 close(compositeMeasures('toy',3.5,12,22/7).joinedArea,214.5);close(compositeMeasures('capsule',2.5,9,22/7).joinedArea,220);close(compositeMeasures('toy',1,1,Math.PI).volume,Math.PI);
 for(const args of [['toy',0,3],['capsule',2,-1],['other',2,3]])assert.throws(()=>compositeMeasures(...args));
});
test('capsule axial length, cavity boundary and mass conversion preserve their distinct quantities',()=>{
 assert.equal(capsuleCylinderHeight(14,5),9);close(capsuleCylinderHeight(5,2.8),2.2);assert.throws(()=>capsuleCylinderHeight(2,3));
 const cavity=cylinderWithConicalCavity(.7,2.4,22/7);close(cavity.slant,2.5);close(cavity.area,17.6);close(cavity.volume,2*(22/7)*.7**2*2.4/3);
 close(massInKg(111532.8,8),892.2624);close(massInKg(88,5),.44);assert.throws(()=>massInKg(-1,5));
});
test('source calculations respect prescribed π, root approximations, shape interpretation and final precision',()=>{
 const f=(n,ref,i=0)=>task(n,ref).fields[i].answer;
 close(f(11,'Exercise 11.1 · 1'),132/7);close(f(11,'Exercise 11.1 · 2'),77/8);close(f(11,'Exercise 11.1 · 5(iii)'),231-441*Math.sqrt(3)/4);
 close(f(11,'Exercise 11.1 · 6(i)'),3.14*225/6-225*1.73/4);close(f(11,'Exercise 11.1 · 6(ii)'),3.14*225-f(11,'Exercise 11.1 · 6(i)'));
 close(f(11,'Exercise 11.1 · 7'),3.14*144/3-144*1.73/4);close(f(11,'Exercise 11.1 · 8(ii)'),3.14*(100-25)/4);close(f(11,'Exercise 11.1 · 11'),2*115/360*(22/7)*625);close(f(11,'Exercise 11.1 · 13',1),((22/7)*784-6*1.7*784/4)*.35);
 close(f(12,'Exercise 12.1 · 2'),572);close(f(12,'Exercise 12.1 · 4',1),332.5);assert.equal(f(12,'Exercise 12.1 · 8'),Math.round(cylinderWithConicalCavity(.7,2.4,22/7).area));close(f(12,'Exercise 12.1 · 9'),374);
 const syrup=45*.3*((22/7)*1.4**2*2.2+4/3*(22/7)*1.4**3);close(syrup,338.184);assert.equal(f(12,'Exercise 12.2 · 3'),Math.round(syrup));
 close(f(12,'Exercise 12.2 · 4'),Math.round((525-4/3*(22/7)*.5**2*1.4)*100)/100);close(f(12,'Exercise 12.2 · 5'),(.25/3*25*8)/(4/3*.5**3));close(f(12,'Exercise 12.2 · 6'),massInKg(3.14*(12**2*220+8**2*60),8));close(f(12,'Exercise 12.2 · 7'),(22/7)*(60**2*180-60**2*120/3-2*60**3/3));
 assert.match(task(12,'Exercise 12.2 · 8').solution.join(' '),/346.51/);assert.match(task(12,'Example 1').solution.join(' '),/39.6/);assert.match(task(12,'Example 4').solution.join(' '),/bottom/);
});
test('new chapter records restore only their own question IDs and explicit proof-review state',()=>{
 const t=task(12,'Exercise 12.1 · 5'),w={...blankWork(t),draft:'I subtract the flat circular opening and add the curved hemisphere.'};assert.deepEqual(restoreWork({[t.id]:w,other:w},[t]),{[t.id]:w});assert.equal(proofReviewed(t,w),false);
});
