import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {acuteRatios,heightFromElevation,circleTangents,specialAngleTable} from '../src/lib/trigonometry.ts';
import {partTwoChapters} from '../src/lib/maths-chapters-8-10.ts';
import {checkField} from '../src/lib/real-number-practice.ts';
import {blankWork,restoreWork,proofReviewed,calculationCorrect} from '../src/lib/real-number-workbook.ts';
const data=JSON.parse(fs.readFileSync(new URL('../src/lib/part-two-practice-data.json',import.meta.url)));
const close=(a,b)=>assert.ok(Math.abs(a-b)<=1e-10*Math.max(1,Math.abs(b)),`${a} != ${b}`);
const task=(n,ref)=>data.chapters[n].find(t=>t.reference===ref);
test('next three chapters follow the supplied Part 2 contents, with every exercise subpart and example',()=>{
 assert.deepEqual(partTwoChapters.map(c=>c.number),[8,9,10]);
 const manifests={8:{'8.1':18,'8.2':15,'8.3':16},9:{'9.1':15},10:{'10.1':7,'10.2':13}},examples={8:12,9:7,10:3};
 for(const c of partTwoChapters){
  const tasks=data.chapters[c.number];assert.equal(new Set(tasks.map(t=>t.id)).size,tasks.length);
  for(const [ref,count] of Object.entries(manifests[c.number]))assert.equal(tasks.filter(t=>t.reference.startsWith(`Exercise ${ref}`)).length,count,ref);
  for(let n=1;n<=examples[c.number];n++)assert.equal(tasks.filter(t=>t.reference===`Example ${n}`).length,1);
  assert.equal(data.checks[c.number].length,7);assert.equal(new Set([...tasks,...data.checks[c.number]].map(t=>t.id)).size,tasks.length+7);
  for(const t of [...tasks,...data.checks[c.number]]){
   assert.ok(t.prompt.length>20&&t.solution.length>0);assert.ok(!!t.fields!==!!t.checklist);
   if(t.fields){assert.equal(new Set(t.fields.map(f=>f.label)).size,t.fields.length);for(const f of t.fields){assert.ok(Number.isFinite(f.answer));assert.equal(checkField(f,String(f.answer)).correct,true)}}
   else {const w={...blankWork(t),submitted:true,draft:'A long response could still contain a mathematical mistake.'};assert.equal(proofReviewed(t,w),false);assert.equal(calculationCorrect(t,w),false)}
  }
 }
 for(const roman of ['i','ii','iii','iv','v','vi','vii','viii','ix','x'])assert.ok(task(8,`Exercise 8.3 · 4(${roman})`));
 for(const ref of ['Theorem 10.1','Theorem 10.2'])assert.ok(task(10,ref));
});
test('acute ratio explorer preserves identities, reciprocity and complementary references',()=>{
 for(let a=5;a<=85;a+=5){const r=acuteRatios(a),c=acuteRatios(90-a);close(r.sin**2+r.cos**2,1);close(r.sin/r.cos,r.tan);close(r.sin*r.cosec,1);close(r.cos*r.sec,1);close(r.tan*r.cot,1);close(r.sin,c.cos);close(r.cos,c.sin);close(r.sec**2-r.tan**2,1)}
 for(const bad of [0,90,-5,100,NaN,Infinity])assert.throws(()=>acuteRatios(bad));
 assert.equal(specialAngleTable[0].cot,'Undefined');assert.equal(specialAngleTable[0].cosec,'Undefined');assert.equal(specialAngleTable[4].tan,'Undefined');assert.equal(specialAngleTable[4].sec,'Undefined');assert.equal(specialAngleTable[0].sin,'0');assert.equal(specialAngleTable[4].cos,'0');
});
test('heights use horizontal distance, acute elevation and the rise above eye level',()=>{
 close(heightFromElevation(28.5,45,1.5).total,30);close(heightFromElevation(15,60).rise,15*Math.sqrt(3));
 for(const args of [[0,45],[-1,45],[5,0],[5,90],[5,30,-1]])assert.throws(()=>heightFromElevation(...args));
 const first=heightFromElevation(20,30,1.5),second=heightFromElevation(20,60,1.5);assert.ok(second.total>first.total);close(first.total-first.rise,1.5);
});
test('tangent geometry is continuous at contact and every external contact satisfies perpendicularity',()=>{
 assert.equal(circleTangents(3,0).count,0);assert.deepEqual(circleTangents(3,3),{count:1,contacts:[{x:3,y:0}],length:0});
 for(let d=3.25;d<=9;d+=.25){const t=circleTangents(3,d);assert.equal(t.count,2);for(const p of t.contacts){close(p.x*p.x+p.y*p.y,9);close(p.x*(d-p.x)+p.y*(-p.y),0);close(Math.hypot(d-p.x,p.y),t.length)}close(t.contacts[0].y,-t.contacts[1].y)}
 close(circleTangents(5,13).length,12);for(const args of [[0,3],[-1,3],[3,-1],[3,NaN]])assert.throws(()=>circleTangents(...args));
});
test('exact source calculations retain eye heights, full versus partial lengths and all original data',()=>{
 const f=(n,ref,i=0)=>task(n,ref).fields[i].answer;
 close(f(8,'Exercise 8.1 · 3'),Math.sqrt(7)/4);close(f(8,'Exercise 8.1 · 4'),15/17);close(f(8,'Exercise 8.2 · 1(v)'),67/12);
 close(f(9,'Exercise 9.1 · 2'),8*Math.sqrt(3));close(f(9,'Exercise 9.1 · 6'),19*Math.sqrt(3));close(f(9,'Exercise 9.1 · 8'),.8*(Math.sqrt(3)+1));close(f(9,'Exercise 9.1 · 10',1),20);close(f(9,'Exercise 9.1 · 10',2),60);close(f(9,'Exercise 9.1 · 14'),58*Math.sqrt(3));close(f(9,'Exercise 9.1 · 15'),3);
 close(f(10,'Exercise 10.1 · 3'),Math.sqrt(119));close(f(10,'Exercise 10.2 · 3'),50);close(f(10,'Exercise 10.2 · 7'),8);close(f(10,'Exercise 10.2 · 12'),15);close(f(10,'Exercise 10.2 · 12',1),13);
 for(const ref of ['Exercise 8.3 · 4(iii)','Exercise 8.3 · 4(vii)','Exercise 8.3 · 4(x)'])assert.match(task(8,ref).solution.join(' '),/45°/);
 assert.match(task(8,'Exercise 8.3 · 4(vi)').solution.join(' '),/positive/);
});
test('source identity models agree numerically throughout their stated acute domains',()=>{
 // This validates authored algebra, not student proof text; student responses remain explicitly ungraded.
 for(const deg of [10,20,30,40,50,60,70,80]){
  const {sin:a,cos:b,tan:t,cot:u,sec:v,cosec:w}=acuteRatios(deg);
  close((w-u)**2,(1-b)/(1+b));close(b/(1+a)+(1+a)/b,2*v);close(t/(1-u)+u/(1-t),1+v*w);close((1+v)/v,a*a/(1-b));close((b-a+1)/(b+a-1),w+u);close(Math.sqrt((1+a)/(1-a)),v+t);close((a-2*a**3)/(2*b**3-b),t);close((a+w)**2+(b+v)**2,7+t*t+u*u);close((w-a)*(v-b),1/(t+u));close((1+t*t)/(1+u*u),t*t);close(((1-t)/(1-u))**2,t*t);
 }
});
test('new chapter drafts restore only their own IDs and do not fabricate calculation or proof completion',()=>{
 const t=task(10,'Theorem 10.2'),w={...blankWork(t),draft:'My draft explaining the RHS congruence argument.'};assert.deepEqual(restoreWork({[t.id]:w,foreign:w},[t]),{[t.id]:w});assert.equal(proofReviewed(t,w),false);assert.equal(calculationCorrect(t,w),false);
});
