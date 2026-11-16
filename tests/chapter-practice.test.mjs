import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {parseExactAnswer} from '../src/lib/exact-answer.ts';
import {checkField} from '../src/lib/real-number-practice.ts';
import {blankWork,restoreWork,proofReviewed,calculationCorrect} from '../src/lib/real-number-workbook.ts';
import {newChapters} from '../src/lib/maths-chapters.ts';
import {restoreSavedProgress} from '../src/lib/real-numbers.ts';
const data=JSON.parse(fs.readFileSync(new URL('../src/lib/chapter-practice-data.json',import.meta.url)));
test('exact arithmetic supports fractions, roots and precedence without executing input',()=>{
 for(const [s,v] of [['2*sqrt(3)/3',2*Math.sqrt(3)/3],['−2/7',-2/7],['(3-sqrt(3))/2',(3-Math.sqrt(3))/2],['-2^2',-4],['2^-2',.25],['√(32)',Math.sqrt(32)],['1/3+2/3',1]])assert.equal(parseExactAnswer(s),v);
 for(const s of ['','NaN','Infinity','1/0','sqrt(-1)','Math.sqrt(2)','process.exit()','alert(1)','2**3','1e9','2;3','2^1000','('.repeat(30)+'1'+')'.repeat(30)])assert.equal(parseExactAnswer(s),null,s);
 assert.equal(checkField({label:'Surd',answer:Math.sqrt(2),kind:'expression'},'sqrt(2)').correct,true);
 assert.equal(checkField({label:'Surd',answer:Math.sqrt(2),kind:'expression'},'1.41').correct,false);
});
const manifests={2:{'2.1':6,'2.2':12},3:{'3.1':17,'3.2':13,'3.3':9},4:{'4.1':12,'4.2':11,'4.3':8},5:{'5.1':28,'5.2':30,'5.3':35,'5.4':5},6:{'6.1':7,'6.2':13,'6.3':27},7:{'7.1':14,'7.2':10}};
test('every source exercise subpart and numbered worked example has a unique activity',()=>{
 const exampleCounts={2:5,3:10,4:9,5:16,6:8,7:10};
 for(const [n,groups] of Object.entries(manifests)){
  const tasks=data.chapters[n];assert.equal(new Set(tasks.map(t=>t.id)).size,tasks.length);
  for(const [ref,count] of Object.entries(groups))assert.equal(tasks.filter(t=>t.reference.startsWith(`Exercise ${ref}`)).length,count,`${ref} source manifest`);
  for(let i=1;i<=exampleCounts[n];i++)assert.equal(tasks.filter(t=>new RegExp(`^Example ${i}(?:$| ·)`).test(t.reference)).length,1,`Chapter ${n} Example ${i}`);
  assert.equal(data.checks[n].length,7);
  for(const t of [...tasks,...data.checks[n]]){
   assert.ok(t.solution.length>0&&t.prompt.length>10,t.id);assert.ok(!!t.fields!==!!t.checklist,t.id);
   if(t.fields){assert.equal(new Set(t.fields.map(f=>f.label)).size,t.fields.length,t.id+' unique labels');for(const f of t.fields){assert.ok(Number.isFinite(f.answer),t.id);assert.equal(checkField(f,String(f.answer)).correct,true,t.id)}}
   else {assert.ok(t.checklist.length>=1,t.id);const w={...blankWork(t),draft:'A substantial response can still be mathematically wrong.',submitted:true};assert.equal(proofReviewed(t,w),false);assert.equal(calculationCorrect(t,w),false)}
  }
 }
});
test('source edge cases retain all valid answers and exact values',()=>{
 const task=(n,ref)=>data.chapters[n].find(t=>t.reference===ref);
 assert.equal(task(5,'Exercise 5.3 · 7').fields[0].answer,1661);
 assert.ok(task(5,'Exercise 5.4 Optional · 2').solution.join(' ').includes('76'));
 assert.ok(task(5,'Exercise 5.4 Optional · 2').solution.join(' ').includes('20'));
 assert.equal(task(7,'Exercise 7.2 · 10').fields[2].answer,24);
 assert.equal(task(7,'Exercise 7.2 · 3').fields[0].answer,Math.sqrt(61));
 assert.deepEqual(data.chapters[2].filter(t=>t.graphCase!==undefined).map(t=>t.fields[0].answer),[0,1,3,2,4,3]);
 assert.ok(task(6,'Theorem 6.3').solution.join(' ').includes('parallelogram'));
});
test('expansions migrate old position by stable ID and revisit genuinely new checks',()=>{
 for(const c of newChapters){
  const index=3;const p=restoreSavedProgress({version:1,position:index,attempts:{}},c.steps,c.legacyIds);
  assert.equal(c.steps[p.position].id,c.legacyIds[index]);
  const attempts=Object.fromEntries(c.steps.filter(t=>c.legacyIds.includes(t.id)).map(t=>[t.id,{answer:t.correct,wrong:false,hints:0}]));
  const done=restoreSavedProgress({version:1,position:c.legacyIds.length,attempts},c.steps,c.legacyIds);
  assert.ok(done.position<c.steps.length);assert.ok(!c.legacyIds.includes(c.steps[done.position].id));
 }
});
test('construction points persist alongside written drafts and restore only known tasks',()=>{
 const t=data.chapters[3][0];const w={...blankWork(t),draft:'My reasoning draft',plot:'0,5\n5,0\n0,6\n3,0'};
 assert.deepEqual(restoreWork({[t.id]:w,unknown:w},[t]),{[t.id]:w});
});
