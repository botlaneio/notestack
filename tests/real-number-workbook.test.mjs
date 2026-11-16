import test from 'node:test';
import assert from 'node:assert/strict';
import {textbookTasks,independentTasks,primeFactors,hcfLcm,checkField} from '../src/lib/real-number-practice.ts';
import {inventory,blankWork,restoreWork,calculationCorrect,proofReviewed} from '../src/lib/real-number-workbook.ts';
import {steps,pilotSteps,restoreSavedProgress} from '../src/lib/real-numbers.ts';
test('audit maps every source exercise subpart, all examples and theorem statements',()=>{
 assert.equal(textbookTasks.length,21);assert.equal(textbookTasks.filter(t=>t.fields).length,13);assert.equal(textbookTasks.filter(t=>t.checklist).length,8);
 for(let i=1;i<=7;i++)assert.ok(inventory.some(row=>row.ref.startsWith(`Example ${i}`)));
 for(let i=1;i<=3;i++)assert.ok(inventory.some(row=>row.ref.startsWith(`Theorem 1.${i}`)));
 const mapped=new Set(inventory.flatMap(row=>row.tasks));for(const task of textbookTasks)assert.ok(mapped.has(task.id),task.id);
 for(const row of inventory)for(const id of row.ids)assert.ok(steps.some(s=>s.id===id),id);
 assert.equal(new Set(textbookTasks.map(t=>t.id)).size,21);assert.equal(steps.length,30);
});
test('source calculation values and safe prime-factor checking',()=>{
 assert.deepEqual(primeFactors(7429),[17,19,23]);assert.deepEqual(primeFactors(5005),[5,7,11,13]);assert.deepEqual(hcfLcm([510,92]),{hcf:2,lcm:23460});assert.deepEqual(hcfLcm([12,15,21]),{hcf:3,lcm:420});
 const f={label:'Factors',answer:360,kind:'factors'};for(const s of ['2^3*3^2*5','5 × 3² × 2³','2*2*2*3*3*5'])assert.equal(checkField(f,s).correct,true,s);
 for(const s of ['36*10','2^3*3*5','2^99','360','(()=>360)()','NaN','2**3*3**2*5'])assert.equal(checkField(f,s).correct,false,s);
 assert.equal(checkField({label:'LCM',answer:22338},'22338').correct,true);assert.equal(checkField({label:'LCM',answer:22338},'22338 minutes').correct,false);
 for(const task of [...textbookTasks,...independentTasks])if(task.fields){const w=blankWork(task);w.answers=task.fields.map(f=>f.kind==='factors'?primeFactors(f.answer).join('*'):String(f.answer));w.submitted=true;assert.ok(calculationCorrect(task,w),task.id);}
});
test('proof work is never graded by text matching and needs explicit review',()=>{
 const task=textbookTasks.find(t=>t.id==='ex12-1');const w=blankWork(task);w.draft='This is long enough to be a draft, but it is not a valid proof.';w.submitted=true;
 assert.equal(calculationCorrect(task,w),false);assert.equal(proofReviewed(task,w),false);w.solutionViewed=true;w.checks=w.checks.map(()=>true);assert.equal(proofReviewed(task,w),true);w.draft='short';assert.equal(proofReviewed(task,w),false);
});
test('workbook drafts restore safely and retain per-mode support history',()=>{
 const task=textbookTasks[0],w=blankWork(task);w.answers=['2²*5*7'];w.submitted=true;w.firstCorrect=true;w.hints=1;assert.deepEqual(restoreWork({[task.id]:w},textbookTasks)[task.id],w);
 assert.deepEqual(restoreWork(null,textbookTasks),{});const t=restoreWork({[task.id]:{answers:[{}],draft:12,hints:900}},textbookTasks)[task.id];assert.equal(t.answers[0],'');assert.equal(t.draft,'');assert.equal(t.hints,2);assert.equal(t.submitted,false);
});
test('legacy Chapter 1 progress migrates by question ID and cannot skip new coverage',()=>{
 const attempts=Object.fromEntries(pilotSteps.map(s=>[s.id,{answer:s.correct,wrong:false,hints:0}]));const p=restoreSavedProgress({version:1,position:pilotSteps.length,attempts},steps);assert.equal(Object.keys(p.attempts).length,15);assert.equal(steps[p.position].id,'powers');assert.notEqual(p.position,steps.length);
 const mid=restoreSavedProgress({version:1,position:3,attempts:{}},steps);assert.equal(steps[mid.position].id,pilotSteps[3].id);
 const reordered=restoreSavedProgress({version:1,position:1,attempts:{},sequence:['real','derive-lcm']},steps);assert.equal(steps[reordered.position].id,'derive-lcm');
});
