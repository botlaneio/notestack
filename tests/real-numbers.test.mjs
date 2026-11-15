import test from 'node:test';
import assert from 'node:assert/strict';
import {steps,freshProgress,restoreProgress,recordAnswer} from '../src/lib/real-numbers.ts';
test('chapter checks have unique IDs, valid answers and specific feedback',()=>{
 assert.equal(new Set(steps.map(s=>s.id)).size,steps.length);
 for(const s of steps){assert.ok(s.options[s.correct]);assert.equal(s.feedback.length,s.options.length);assert.equal(s.hints.length,2);}
});
test('retry keeps revision evidence after a correct answer',()=>{
 const s=steps[0];let p=recordAnswer(freshProgress(),s.id,0);p=recordAnswer(p,s.id,s.correct);
 assert.equal(p.attempts[s.id].wrong,true);assert.equal(p.attempts[s.id].answer,s.correct);
 assert.equal(recordAnswer(p,s.id,-1),p);assert.equal(recordAnswer(p,'unknown',0),p);
});
test('restore rejects stale and malformed state and cannot fabricate completion',()=>{
 for(const v of [null,{},[],{version:2},'bad'])assert.deepEqual(restoreProgress(v),freshProgress());
 const p=restoreProgress({version:1,position:steps.length,attempts:{real:{answer:99,wrong:true,hints:100}}});
 assert.equal(p.position,0);assert.deepEqual(p.attempts,{});
 const q=restoreProgress({version:1,position:-10,attempts:{real:{answer:1,wrong:false,hints:12}}});assert.equal(q.position,0);assert.equal(q.attempts.real.hints,2);
});
test('complete progress and hint history survive reload',()=>{
 let p=freshProgress();for(const s of steps)p=recordAnswer(p,s.id,s.correct);p.position=steps.length;p.attempts.real.hints=1;
 assert.deepEqual(restoreProgress(JSON.parse(JSON.stringify(p))),p);
});
