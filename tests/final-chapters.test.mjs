import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {finalChapters} from '../src/lib/maths-chapters-13-14.ts';
import {groupedStatistics,recoverFrequencies,dicePairs,diceEvent,coinSequences,probability} from '../src/lib/statistics-probability.ts';
import {checkField} from '../src/lib/real-number-practice.ts';
import {blankWork,restoreWork,proofReviewed,calculationCorrect} from '../src/lib/real-number-workbook.ts';
const data=JSON.parse(fs.readFileSync(new URL('../src/lib/final-chapters-practice-data.json',import.meta.url)));
const close=(a,b)=>assert.ok(Math.abs(a-b)<=1e-10*Math.max(1,Math.abs(b)),`${a} != ${b}`);
const task=(n,ref)=>data.chapters[n].find(t=>t.reference===ref);
test('final batch is exactly Statistics and Probability with all source exercise parts, examples and tables',()=>{
 assert.deepEqual(finalChapters.map(c=>c.number),[13,14]);const groups={13:{'13.1':9,'13.2':6,'13.3':7},14:{'14.1':57}};
 for(const c of finalChapters){const ts=data.chapters[c.number];assert.equal(new Set(ts.map(t=>t.id)).size,ts.length);
  for(const [ref,n]of Object.entries(groups[c.number]))assert.equal(ts.filter(t=>t.reference.startsWith('Exercise '+ref)).length,n);
  for(let n=1;n<=(c.number===13?8:13);n++)assert.equal(ts.filter(t=>new RegExp(`^Example ${n}(?:$| ·)`).test(t.reference)).length,1);
  assert.equal(data.checks[c.number].length,7);assert.equal(new Set([...ts,...data.checks[c.number]].map(t=>t.id)).size,ts.length+7);
  for(const t of [...ts,...data.checks[c.number]]){assert.ok(t.prompt.length>20&&t.solution.length>0,t.id);assert.ok(!!t.fields!==!!t.checklist,t.id);
   if(t.fields){assert.equal(new Set(t.fields.map(f=>f.label)).size,t.fields.length);for(const f of t.fields){assert.ok(Number.isFinite(f.answer));assert.equal(checkField(f,String(f.answer)).correct,true,t.id)}}
   else {const w={...blankWork(t),submitted:true,draft:'A substantial explanation can still contain mathematical errors.'};assert.equal(proofReviewed(t,w),false);assert.equal(calculationCorrect(t,w),false)}
   if(t.table){assert.ok(t.table.headers.length>=2);assert.ok(t.table.rows.every(r=>r.length===t.table.headers.length),t.id)}
  }
 }
 assert.equal(data.chapters[13].filter(t=>t.reference.startsWith('Exercise')&&t.table).length,22);
 assert.ok(task(14,'Exercise 14.1 · 20 · additional, not for examination'));
 for(const n of [10,11])assert.ok(task(14,`Example ${n} · additional, not for examination`));
});
test('all three grouped mean methods agree for changing assumptions, scales and unequal widths',()=>{
 const rows=[{lower:0,upper:5,frequency:4},{lower:5,upper:15,frequency:8},{lower:15,upper:30,frequency:12},{lower:30,upper:50,frequency:6}];
 for(const a of [-10,0,20,50])for(const h of [1,3,10,20]){const m=groupedStatistics(rows,a,h);close(m.mean,m.assumedResult);close(m.mean,m.stepResult);assert.equal(m.mode,null);assert.equal(m.equalWidths,false);assert.equal(m.total,30)}
 for(const r of [[],[{lower:0,upper:10,frequency:0}],[{lower:10,upper:0,frequency:3}],[{lower:0,upper:10,frequency:-1}],[{lower:0,upper:10,frequency:1.5}]])assert.throws(()=>groupedStatistics(r));
 assert.throws(()=>groupedStatistics([{lower:0,upper:10,frequency:1}],0,0));
});
test('median and mode use the correct frequencies, continuous boundaries and a single modal class',()=>{
 const rows=[4,10,6].map((frequency,i)=>({lower:i*10,upper:(i+1)*10,frequency}));const m=groupedStatistics(rows);assert.equal(m.median,16);assert.equal(m.mode,16);assert.equal(m.medianIndex,1);assert.equal(m.modalIndex,1);assert.deepEqual(m.table.map(r=>r.cumulative),[4,14,20]);
 const tied=groupedStatistics([4,12,12,9,3].map((frequency,i)=>({lower:i*10,upper:(i+1)*10,frequency})));assert.equal(tied.mode,null);assert.deepEqual(tied.modalIndices,[1,2]);
 assert.deepEqual(recoverFrequencies([2,6,24,45,78,89,92,98,100]),[2,4,18,21,33,11,3,6,2]);assert.throws(()=>recoverFrequencies([3,2]));assert.throws(()=>recoverFrequencies([1.5]));
 const leaves=[3,5,9,12,5,4,2].map((frequency,i)=>({lower:117.5+i*9,upper:126.5+i*9,frequency}));assert.equal(groupedStatistics(leaves).median,146.75);
});
test('source Statistics values retain exact intermediate sums and explicitly requested rounding',()=>{
 const f=(ref,label)=>task(13,ref).fields.find(v=>v.label.startsWith(label)).answer;
 assert.equal(f('Exercise 13.1 · 1','Mean'),8.1);assert.equal(f('Exercise 13.1 · 2','Mean'),545.2);assert.equal(f('Exercise 13.1 · 3','Missing'),20);assert.equal(f('Exercise 13.1 · 7','Mean'),.099);assert.equal(f('Exercise 13.1 · 8','Mean'),12.48);
 assert.equal(f('Exercise 13.2 · 1','Mean'),35.38);assert.equal(f('Exercise 13.2 · 2','Mode'),65.63);assert.equal(f('Exercise 13.3 · 1','Mean'),137.06);assert.equal(f('Exercise 13.3 · 1','Mode'),135.77);assert.equal(f('Exercise 13.3 · 2','x'),8);assert.equal(f('Exercise 13.3 · 2','y'),7);assert.equal(f('Example 8','x'),9);assert.equal(f('Example 8','y'),15);
 assert.equal(f('Example 2','Mean'),39.71);assert.match(task(13,'Example 2').solution.join(' '),/1390/);assert.doesNotMatch(task(13,'Example 2').solution.join(' '),/1370/);
 assert.match(task(13,'13.4 · Boundaries and empirical relation').solution.join(' '),/approximation/);
});
test('ordered dice enumeration gives every sum probability and avoids overlap double counting',()=>{
 assert.equal(dicePairs.length,36);assert.equal(new Set(dicePairs.map(p=>`${p.first},${p.second}`)).size,36);
 const counts=Array.from({length:11},(_,i)=>dicePairs.filter(p=>p.first+p.second===i+2).length);assert.deepEqual(counts,[1,2,3,4,5,6,5,4,3,2,1]);
 assert.equal(diceEvent('sum8').favourable.length,5);assert.equal(diceEvent('sum7').favourable.length,6);assert.equal(diceEvent('same').favourable.length,6);assert.equal(diceEvent('at-least-one5').favourable.length,11);
 close(counts.reduce((sum,n)=>sum+probability(n,36),0),1);assert.equal(probability(0,6),0);assert.equal(probability(6,6),1);for(const args of [[-1,6],[7,6],[1,0],[1.5,6]])assert.throws(()=>probability(...args));
});
test('coin sequences preserve order and repeated trials have the correct elementary count',()=>{
 assert.deepEqual(coinSequences(2),['HH','HT','TH','TT']);const three=coinSequences(3);assert.equal(three.length,8);assert.equal(three.filter(s=>s.includes('H')).length,7);assert.equal(three.filter(s=>new Set(s).size===1).length,2);assert.throws(()=>coinSequences(0));assert.throws(()=>coinSequences(4));
});
test('source Probability answers account for replacement, faces rather than labels and optional uniform area',()=>{
 const p=ref=>task(14,'Exercise 14.1 · '+ref).fields[0].answer;
 close(p('10(i)'),100/180);close(p('10(ii)'),170/180);close(p('14(i)'),2/52);close(p('14(ii)'),12/52);close(p('14(iii)'),6/52);close(p('15(ii)(a)'),1/4);assert.equal(p('15(ii)(b)'),0);close(p('17(ii)'),15/19);close(p('18(i)'),81/90);close(p('19(i)'),2/6);close(p('23'),6/8);close(p('24(i)'),25/36);close(p('24(ii)'),11/36);close(p('20 · additional, not for examination'),1/24);
 assert.equal(task(14,'Exercise 14.1 · 22(i)').fields.length,11);close(task(14,'Exercise 14.1 · 22(i)').fields.reduce((n,f)=>n+f.answer,0),1);
 assert.match(task(14,'Exercise 14.1 · 2(iii)').solution.join(' '),/random guess/);assert.match(task(14,'Exercise 14.1 · 25(ii)').solution.join(' '),/justification/);
});
test('Statistics and Probability records restore only their own known IDs and preserve drafts without grading them',()=>{
 const t=task(14,'Exercise 14.1 · 25(i)'),w={...blankWork(t),draft:'I distinguish HT and TH as ordered elementary outcomes.'};assert.deepEqual(restoreWork({[t.id]:w,foreign:w},[t]),{[t.id]:w});assert.equal(proofReviewed(t,w),false);
});
