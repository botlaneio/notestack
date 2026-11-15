import test from 'node:test';
import assert from 'node:assert/strict';
import {IDS,normaliseBag,addPack,priceBag} from '../src/lib/cart.mjs';

test('only valid subject packs are retained and cannot be added twice',()=>{
 assert.deepEqual(normaliseBag(['science','science','unknown']),['science']);
 assert.deepEqual(normaliseBag({science:1}),[]);
 assert.deepEqual(addPack(['science'],'science'),['science']);
});
test('single subjects and the complete collection use the configured prices',()=>{
 assert.equal(priceBag([]).total,0);
 assert.equal(priceBag(['science']).total,600);
 assert.equal(priceBag(['science','mathematics']).total,1200);
 assert.deepEqual(priceBag(IDS),{count:3,subtotal:1800,total:1500,saving:300});
 assert.equal(priceBag([...IDS,'science']).total,1500);
});
