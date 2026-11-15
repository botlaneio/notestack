import {build} from 'esbuild';
import fs from 'node:fs';
import assert from 'node:assert/strict';
import {IDS,normaliseBag,addPack,priceBag} from './src/store.mjs';
assert.deepEqual(normaliseBag(['science','science','unknown']),['science']);
assert.deepEqual(normaliseBag({science:1}),[]);
assert.deepEqual(addPack(['science'],'science'),['science']);
assert.equal(priceBag([]).total,0);
assert.equal(priceBag(['mathematics']).total,600);
assert.equal(priceBag(['mathematics','science']).total,1200);
assert.deepEqual(priceBag(IDS),{count:3,subtotal:1800,total:1500,saving:300});
assert.equal(priceBag([...IDS,'science']).total,1500);
const source=fs.readFileSync('src/main.jsx','utf8').replace(/createRoot\(document.getElementById\('root'\)\)\.render\([\s\S]*$/,`export function render(){ return <Theme theme={neutralTheme} mode="light"><App/></Theme>; }`);
await build({stdin:{contents:source,resolveDir:process.cwd()+'/src',loader:'jsx'},bundle:true,platform:'node',format:'esm',outfile:'.render-check.mjs',loader:{'.css':'empty'},external:['react','react-dom']});
try{
 const {render}=await import('./.render-check.mjs');const {renderToStaticMarkup}=await import('react-dom/server');const html=renderToStaticMarkup(render());
 assert(html.includes('Less searching.'));assert(html.includes('notestack'));assert(html.includes('VEDANT VENTURES'));assert(!html.includes('Full Marks'));assert(!html.includes('undefined'));
 assert.equal((html.match(/class="product"/g)||[]).length,3);assert.equal((html.match(/class="hero-book /g)||[]).length,3);
 const products=JSON.parse(fs.readFileSync('src/catalog.json'));assert.equal(products.length,3);
 const sampleContent=JSON.parse(fs.readFileSync('src/samples.json'));
 for(const p of products){assert(fs.existsSync('public'+p.image));assert.equal(p.price,600);const pdf=fs.readFileSync('public'+p.sampleFile);assert(pdf.subarray(0,5).toString()==='%PDF-');const s=sampleContent[p.id];assert(s);assert(s.practice.correct>=0&&s.practice.correct<s.practice.options.length);}
 const urls=[...html.matchAll(/href="(#.*?)"/g)].map(m=>m[1]);const ids=[...html.matchAll(/id="(.*?)"/g)].map(m=>m[1]);for(const u of urls){if(u!=='#')assert(ids.includes(u.slice(1)),`Missing anchor ${u}`)}
 console.log('PASS: bag validation/deduplication, single/bundle pricing, server render, brand, three products and hero covers, source-free assets, PDF samples, practice data and navigation anchors.');
}finally{fs.rmSync('.render-check.mjs',{force:true})}
