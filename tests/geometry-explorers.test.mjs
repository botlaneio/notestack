import test from 'node:test';
import assert from 'node:assert/strict';
import {pointDistance,internalSection,parallelSplit} from '../src/lib/maths-explorers.ts';
import {geometryChapters} from '../src/lib/maths-chapters-6-7.ts';
test('new scope is exactly textbook Chapters 6 and 7',()=>{
 assert.deepEqual(geometryChapters.map(c=>c.number),[6,7]);assert.equal(geometryChapters.reduce((n,c)=>n+c.steps.length,0),30);assert.equal(geometryChapters[0].sections.length,5);assert.equal(geometryChapters[1].sections.length,4);
});
test('distance is symmetric and handles signed, axis-aligned and coincident points',()=>{
 const a={x:-3,y:-2},b={x:1,y:1};assert.deepEqual(pointDistance(a,b),{dx:4,dy:3,squared:25,distance:5});assert.equal(pointDistance(b,a).distance,5);assert.equal(pointDistance(a,a).distance,0);assert.equal(pointDistance({x:-2,y:3},{x:-2,y:-5}).distance,8);assert.throws(()=>pointDistance({x:NaN,y:0},b));
});
test('internal section weighting gives the requested ratio and midpoint',()=>{
 const a={x:-3,y:-2},b={x:5,y:4};assert.deepEqual(internalSection(a,b,1,1),{x:1,y:1});
 for(const [m,n] of [[1,2],[2,1],[1,5],[5,1]]){const p=internalSection(a,b,m,n);assert.ok(Math.abs(pointDistance(a,p).distance/pointDistance(p,b).distance-m/n)<1e-12);assert.ok(p.x>a.x&&p.x<b.x);}
 assert.deepEqual(internalSection({x:2,y:1},{x:8,y:7},1,2),{x:4,y:3});
 for(const n of [0,-1,Infinity,NaN])assert.throws(()=>internalSection(a,b,1,n));
});
test('parallel cuts retain side totals and BPT ratios across the whole slider range',()=>{
 for(let percent=20;percent<=80;percent+=5){const s=parallelSplit(percent/100);assert.ok(Math.abs(s.ad+s.db-10)<1e-12);assert.ok(Math.abs(s.ae+s.ec-15)<1e-12);assert.ok(Math.abs(s.ad/s.db-s.ae/s.ec)<1e-12);assert.ok(Math.abs(s.ratio-s.ad/s.db)<1e-12);}
 for(const t of [0,1,-.5,NaN])assert.throws(()=>parallelSplit(t));
});
