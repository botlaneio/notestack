type Sketch={points:Record<string,[number,number]>;paths:string[];aux?:string[]};
const cut:Sketch={points:{A:[120,30],B:[40,210],C:[300,210],D:[80,120],E:[210,120]},paths:['ABC A','DE']};
const median:Sketch={points:{A:[100,30],B:[30,200],C:[270,200],D:[150,200]},paths:['ABCA'],aux:['AD']};
export function GeometryBookSketch({reference}:{reference:string}){
 let sketch:Sketch|undefined;
 if(reference.startsWith('Theorem 6.1')||reference.startsWith('Theorem 6.2')||reference==='Example 1'||reference.startsWith('Exercise 6.2 · 1'))sketch=cut;
 if(reference==='Exercise 6.2 · 3')sketch={points:{A:[25,120],B:[160,25],C:[300,120],D:[165,220],M:[92.5,72.5],N:[95,170],L:[162.5,120]},paths:['ABCD A','AC','MLN']};
 if(reference==='Exercise 6.2 · 4')sketch={points:{A:[110,25],B:[25,210],C:[310,210],D:[67.5,117.5],E:[167.5,210],F:[96.25,210]},paths:['ABCA','DE','AE','DF']};
 if(reference==='Exercise 6.2 · 5')sketch={points:{P:[140,20],Q:[20,215],R:[310,215],O:[165,155],D:[152.5,87.5],E:[80,117.5],F:[225,117.5]},paths:['PQRP','PO','EF','ED','DF','QOR']};
 if(reference==='Exercise 6.2 · 6')sketch={points:{P:[140,20],Q:[20,215],R:[310,215],O:[165,155],A:[153.75,94.25],B:[99.75,182],C:[230.25,182]},paths:['PQRP','PO','QOR','ABC','AC']};
 if(reference==='Exercise 6.3 · 4')sketch={points:{Q:[25,215],T:[185,25],R:[315,215],P:[145,72.5],S:[255,215]},paths:['QTRQ','PR','PS']};
 if(reference==='Exercise 6.3 · 6')sketch={points:{A:[160,20],B:[30,215],C:[290,215],D:[95,117.5],E:[225,117.5]},paths:['ABCA','DE','BE','CD']};
 if(reference.startsWith('Exercise 6.3 · 7'))sketch={points:{A:[25,210],B:[310,210],C:[145,25],D:[183,67.6],E:[145,210],P:[145,101.9]},paths:['ABCA','AD','CE']};
 if(reference.startsWith('Exercise 6.3 · 9'))sketch={points:{A:[20,210],B:[190,210],C:[190,30],M:[130,93.529],P:[253.322,210]},paths:['ABCA','AMP']};
 if(reference==='Exercise 6.3 · 11')sketch={points:{A:[170,20],B:[105,210],C:[235,210],D:[170,210],E:[25,210],F:[213,145.7]},paths:['ABCA','EC','AD','EF']};
 if(['Exercise 6.3 · 12','Exercise 6.3 · 14','Exercise 6.3 · 16'].includes(reference))sketch=median;
 if(!sketch)return null;
 const path=(names:string)=>names.replace(/\s/g,'').split('').map((name,i)=>`${i?'L':'M'}${sketch!.points[name]?.join(',')}`).join(' ');
 return <figure><svg viewBox="0 0 340 250" role="img" aria-label={`Labelled construction for ${reference}. The full incidences and conditions are stated in the question.`} style={{width:'100%',maxWidth:480,background:'#f6f7fb',borderRadius:14}}>{sketch.paths.map((p,i)=><path key={i} d={path(p)} stroke="#2f6fe4" strokeWidth="2" fill="none"/>)}{sketch.aux?.map((p,i)=><path key={i} d={path(p)} stroke="#9b5b32" strokeDasharray="5 4" fill="none"/>)}{Object.entries(sketch.points).map(([name,[x,y]])=><g key={name}><circle cx={x} cy={y} r="2.5" fill="#1f2537"/><text x={x+5} y={y-7} fontSize="13" fill="#1f2537">{name}</text></g>)}</svg><figcaption>Original labelled schematic. Use the stated measurements and angle conditions; do not measure the drawing. Auxiliary lines appear dashed.</figcaption></figure>;
}
