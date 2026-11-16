import test from 'node:test';
import assert from 'node:assert/strict';
import {chapters,newChapters} from '../src/lib/maths-chapters.ts';
import {freshProgress,recordAnswer,restoreProgress} from '../src/lib/real-numbers.ts';
import {quadratic,arithmeticProgression,lineCases} from '../src/lib/maths-explorers.ts';
test('all fourteen supplied chapters have complete navigable section coverage and valid checks',()=>{
 assert.deepEqual(chapters.map(c=>c.number),[1,2,3,4,5,6,7,8,9,10,11,12,13,14]);assert.equal(new Set(chapters.map(c=>c.slug)).size,14);
 for(const c of chapters){assert.ok(c.steps.length>=12);assert.equal(new Set(c.steps.map(s=>s.id)).size,c.steps.length);for(let i=0;i<c.sections.length;i++)assert.ok(c.steps.some(s=>s.section===i));for(const s of c.steps){assert.ok(s.options[s.correct]);assert.equal(s.feedback.length,s.options.length);assert.equal(s.hints.length,2);assert.ok(s.feedback.every(f=>f.length>15));}}
});
test('every chapter earns and restores completion using its own question set',()=>{
 for(const c of chapters){let p=freshProgress();for(const s of c.steps)p=recordAnswer(p,s.id,s.correct,c.steps);p.position=c.steps.length;assert.deepEqual(restoreProgress(p,c.steps),p);const id=c.steps[0].id;p.attempts[id].answer=null;assert.equal(restoreProgress(p,c.steps).position,0);}
});
test('new chapter answers are graded by their chapter, preserving retry evidence',()=>{
 for(const c of newChapters){const s=c.steps[0];let p=recordAnswer(freshProgress(),s.id,(s.correct+1)%s.options.length,c.steps);p=recordAnswer(p,s.id,s.correct,c.steps);assert.equal(p.attempts[s.id].wrong,true);assert.equal(p.attempts[s.id].answer,s.correct);}
});
test('polynomial and discriminant explorers handle two, repeated and no real roots',()=>{
 assert.deepEqual(quadratic(1,0,-4),{discriminant:16,roots:[-2,2],count:2});assert.equal(quadratic(1,0,0).count,1);assert.equal(quadratic(1,0,4).count,0);
 assert.deepEqual(quadratic(2,-5,2).roots,[.5,2]);assert.equal(quadratic(2,3,4).discriminant,-23);assert.throws(()=>quadratic(0,2,3));
});
test('AP explorer computes increasing, decreasing, constant and first-term-only sums',()=>{
 assert.deepEqual(arithmeticProgression(2,3,8),{terms:[2,5,8,11,14,17,20,23],last:23,sum:100});assert.equal(arithmeticProgression(18,-4,6).last,-2);assert.equal(arithmeticProgression(7,0,10).sum,70);assert.deepEqual(arithmeticProgression(-3,5,1),{terms:[-3],last:-3,sum:-3});
 for(const n of [0,-1,2.5,Infinity,1001])assert.throws(()=>arithmeticProgression(1,2,n));
});
test('graph line presets faithfully represent intersecting, parallel and coincident equations',()=>{
 assert.deepEqual(lineCases[0].intersection,[2,2]);assert.equal(lineCases[0].m*2+lineCases[0].c,4-2);assert.equal(lineCases[1].m,-1);assert.notEqual(lineCases[1].c,4);assert.equal(lineCases[2].m,-1);assert.equal(lineCases[2].c,4);
});
