import {build} from 'esbuild';
import fs from 'node:fs';
import assert from 'node:assert/strict';
const source=fs.readFileSync('src/main.jsx','utf8').replace(/createRoot\(document.getElementById\('root'\)\)\.render\([\s\S]*$/,`export function render(){ return <Theme theme={neutralTheme} mode="light"><App/></Theme>; }`);
await build({stdin:{contents:source,resolveDir:process.cwd()+'/src',loader:'jsx'},bundle:true,platform:'node',format:'esm',outfile:'/workspace/sites/fullmarks/.render-check.mjs',loader:{'.css':'empty'},external:['react','react-dom']});
const {render}=await import('./.render-check.mjs');
const {renderToStaticMarkup}=await import('react-dom/server');
const html=renderToStaticMarkup(render());
assert(html.includes('A little practice.'));
assert.equal((html.match(/class="product"/g)||[]).length,8);
assert.equal((html.match(/class="hero-book /g)||[]).length,3);
assert(!html.includes('undefined'));
const products=JSON.parse(fs.readFileSync('src/catalog.json'));
assert.equal(products.length,8);
for(const p of products){assert(fs.existsSync('public'+p.image));assert(p.url.startsWith('https://www.fmpl.in/products/'));assert(p.price>0);assert([2026,2027].includes(p.year));}
assert.equal(products.find(p=>p.title==='Mathematics Basic').year,2026);
fs.unlinkSync('.render-check.mjs');
console.log('PASS: server render, eight cards, three hero covers, source URLs, prices, edition labels and local assets.');
