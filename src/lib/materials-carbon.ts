export const activitySeries=['K','Na','Ca','Mg','Al','Zn','Fe','Pb','H','Cu','Hg','Ag','Au'];
export const displacementMetals=['Zn','Fe','Cu','Ag'] as const;
export function predictsDisplacement(metal:string,saltMetal:string){if(!displacementMetals.includes(metal as typeof displacementMetals[number])||!displacementMetals.includes(saltMetal as typeof displacementMetals[number]))throw new Error('This aqueous model is limited to Zn,Fe,Cu,Ag.');return activitySeries.indexOf(metal)<activitySeries.indexOf(saltMetal);}
export const ionicPairs=[{metal:'Na',anion:'Cl',protons:[11,17],valence:[1,7],charges:[1,-1],formula:'NaCl'},{metal:'Mg',anion:'Cl',protons:[12,17],valence:[2,7],charges:[2,-1],formula:'MgCl2'},{metal:'Na',anion:'O',protons:[11,8],valence:[1,6],charges:[1,-2],formula:'Na2O'},{metal:'Mg',anion:'O',protons:[12,8],valence:[2,6],charges:[2,-2],formula:'MgO'}];
export function ionicRatio(positive:number,negative:number){if(!Number.isInteger(positive)||positive<=0||!Number.isInteger(negative)||negative>=0)throw new Error('Use positive cation and negative anion integer charges.');const gcd=(a:number,b:number):number=>b?gcd(b,a%b):a;const d=gcd(positive,-negative);return {cations:-negative/d,anions:positive/d,electrons:positive*(-negative/d)};}
export function hydrocarbon(family:'alkane'|'alkene'|'alkyne',n:number){if(!['alkane','alkene','alkyne'].includes(family)||!Number.isInteger(n)||n<(family==='alkane'?1:2)||n>10)throw new Error('Use a valid simple acyclic series and carbon count.');const order=family==='alkane'?1:family==='alkene'?2:3;const bonds=Array.from({length:Math.max(0,n-1)},(_,i)=>i===0?order:1);const hydrogens=Array.from({length:n},(_,i)=>4-(bonds[i-1]??0)-(bonds[i]??0));const h=hydrogens.reduce((a,b)=>a+b,0);return {formula:`C${n===1?'':n}H${h}`,hydrogens,bonds,mass:12*n+h};}
export function corrosionPrediction(oxygen:boolean,moisture:boolean,coating:'none'|'paint'|'scratched-paint'|'zinc-scratched'){if(!['none','paint','scratched-paint','zinc-scratched'].includes(coating))throw new Error('Unknown coating.');return {conditionsPresent:oxygen&&moisture,barrier:coating==='paint',sacrificial:coating==='zinc-scratched',rustExpected:oxygen&&moisture&&coating!=='paint'&&coating!=='zinc-scratched'};}
export const extractionRoutes=[
 {metal:'Zn',group:'Middle-series source example',steps:['Concentrate the ore:remove gangue by suitable property differences.','For ZnS:roast with oxygen,2ZnS+3O2→2ZnO+2SO2;for ZnCO3:calcine,ZnCO3→ZnO+CO2.','Reduce suitable oxide:ZnO+C→Zn+CO;then purify as needed.']},
 {metal:'Hg',group:'Low-series source example',steps:['Begin with a suitable concentrated HgS ore.','The source pathway forms oxide:2HgS+3O2→2HgO+2SO2.','On further heating:2HgO→2Hg+O2. Toxic industrial chemistry,not a student heating task.']},
 {metal:'Na',group:'High-series source example',steps:['Prepare an appropriate molten salt,not aqueous brine.','At cathode:Na⁺+e⁻→Na;at anode:2Cl⁻→Cl2+2e⁻.','Electrolytic extraction obtains metal from a compound;it is different from refining an already obtained metal.']},
 {metal:'Al',group:'High-series source example',steps:['Prepare a suitable purified oxide-containing industrial feed.','Electrolytic reduction is used;ordinary carbon reduction is not the source route for Al2O3.','Do not confuse this extraction with anodising,which makes a protective oxide layer.']},
 {metal:'Cu',group:'Extraction and refining are separate',steps:['The source sulphide route includes2Cu2S+3O2→2Cu2O+2SO2.','Then2Cu2O+Cu2S→6Cu+SO2 illustrates the source extraction.','For refining:impure Cu anode,pure Cu cathode,suitable Cu²⁺ electrolyte;insoluble impurities form anode mud.']}
];
export type LewisAtom={symbol:string;x:number;y:number;lone:number[]};
export type LewisModel={name:string;atoms:LewisAtom[];bonds:[number,number,number][];valence:number};
const a=(symbol:string,x:number,y:number,lone:number[]=[]):LewisAtom=>({symbol,x,y,lone});
export const lewisModels:LewisModel[]=[
 {name:'H2',atoms:[a('H',140,130),a('H',260,130)],bonds:[[0,1,1]],valence:2},
 {name:'Cl2',atoms:[a('Cl',140,130,[Math.PI,Math.PI/2,-Math.PI/2]),a('Cl',260,130,[0,Math.PI/2,-Math.PI/2])],bonds:[[0,1,1]],valence:14},
 {name:'O2',atoms:[a('O',140,130,[Math.PI/2,-Math.PI/2]),a('O',260,130,[Math.PI/2,-Math.PI/2])],bonds:[[0,1,2]],valence:12},
 {name:'N2',atoms:[a('N',140,130,[Math.PI]),a('N',260,130,[0])],bonds:[[0,1,3]],valence:10},
 {name:'H2O',atoms:[a('O',200,110,[-Math.PI/2,Math.PI]),a('H',110,210),a('H',290,210)],bonds:[[0,1,1],[0,2,1]],valence:8},
 {name:'NH3',atoms:[a('N',200,100,[-Math.PI/2]),a('H',80,150),a('H',200,225),a('H',320,150)],bonds:[[0,1,1],[0,2,1],[0,3,1]],valence:8},
 {name:'CH4',atoms:[a('C',200,130),a('H',200,30),a('H',80,130),a('H',320,130),a('H',200,230)],bonds:[[0,1,1],[0,2,1],[0,3,1],[0,4,1]],valence:8},
 {name:'CO2',atoms:[a('O',80,130,[Math.PI/2,-Math.PI/2]),a('C',200,130),a('O',320,130,[Math.PI/2,-Math.PI/2])],bonds:[[0,1,2],[1,2,2]],valence:16},
 {name:'S8',atoms:Array.from({length:8},(_,i)=>{const angle=2*Math.PI*i/8;return a('S',200+78*Math.cos(angle),130+78*Math.sin(angle),[angle-.32,angle+.32])}),bonds:Array.from({length:8},(_,i)=>[i,(i+1)%8,1] as [number,number,number]),valence:48}
];
export function lewisElectronCount(m:LewisModel){return {sharedPairs:m.bonds.reduce((n,b)=>n+b[2],0),lonePairs:m.atoms.reduce((n,a)=>n+a.lone.length,0),electrons:2*m.bonds.reduce((n,b)=>n+b[2],0)+2*m.atoms.reduce((n,a)=>n+a.lone.length,0)};}
export const alkaneIsomers={4:[['Butane','CH3CH2CH2CH3'],['2-methylpropane','(CH3)3CH']],5:[['Pentane','CH3CH2CH2CH2CH3'],['2-methylbutane','CH3CH(CH3)CH2CH3'],['2,2-dimethylpropane','C(CH3)4']]};

lewisModels.push({name:'CH2O (methanal)',atoms:[a('C',200,130),a('O',320,130,[Math.PI/2,-Math.PI/2]),a('H',200,30),a('H',80,130)],bonds:[[0,1,2],[0,2,1],[0,3,1]],valence:12});
lewisModels.push({name:'C2H2 (ethyne)',atoms:[a('C',140,130),a('C',260,130),a('H',40,130),a('H',360,130)],bonds:[[0,1,3],[0,2,1],[1,3,1]],valence:10});
lewisModels.push({name:'C2H4 (ethene)',atoms:[a('C',140,130),a('C',260,130),a('H',70,50),a('H',70,210),a('H',330,50),a('H',330,210)],bonds:[[0,1,2],[0,2,1],[0,3,1],[1,4,1],[1,5,1]],valence:12});
lewisModels.push({name:'C2H6 (ethane)',atoms:[a('C',140,130),a('C',260,130),a('H',70,50),a('H',40,130),a('H',70,210),a('H',330,50),a('H',360,130),a('H',330,210)],bonds:[[0,1,1],[0,2,1],[0,3,1],[0,4,1],[1,5,1],[1,6,1],[1,7,1]],valence:14});
const ringAtoms=Array.from({length:5},(_,i)=>a('C',200+60*Math.cos(2*Math.PI*i/5),130+60*Math.sin(2*Math.PI*i/5)));
for(let i=0;i<5;i++)for(const offset of [-.3,.3]){const angle=2*Math.PI*i/5+offset;ringAtoms.push(a('H',200+112*Math.cos(angle),130+112*Math.sin(angle)))}
lewisModels.push({name:'C5H10 (cyclopentane)',atoms:ringAtoms,bonds:Array.from({length:5},(_,i)=>[[i,(i+1)%5,1],[i,5+2*i,1],[i,6+2*i,1]] as [number,number,number][]).flat(),valence:30});
