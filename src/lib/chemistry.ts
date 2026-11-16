export type ChemicalEquation={id:string;title:string;formulas:string[];left:number;coefficients:number[];condition:string;types:string[]};
export const equationModels:ChemicalEquation[]=[
 {id:'magnesium',title:'Magnesium and oxygen',formulas:['Mg','O2','MgO'],left:2,coefficients:[2,1,2],condition:'Burning magnesium in air (teacher demonstration)',types:['Combination','Oxidation','Exothermic']},
 {id:'steam',title:'Iron and steam',formulas:['Fe','H2O','Fe3O4','H2'],left:2,coefficients:[3,4,1,4],condition:'Water is steam; heating conditions apply',types:['Displacement','Redox']},
 {id:'water',title:'Electrolysis of water',formulas:['H2O','H2','O2'],left:1,coefficients:[2,2,1],condition:'Electrical energy input',types:['Decomposition','Electrolytic']},
 {id:'lead',title:'Lead nitrate decomposition',formulas:['Pb(NO3)2','PbO','NO2','O2'],left:1,coefficients:[2,2,4,1],condition:'Heating; toxic source demonstration, not a home activity',types:['Decomposition','Thermal']},
 {id:'precipitate',title:'A white precipitate',formulas:['Na2SO4','BaCl2','BaSO4','NaCl'],left:2,coefficients:[1,1,1,2],condition:'Aqueous reactants; BaSO4 is insoluble',types:['Double displacement','Precipitation']},
 {id:'neutral',title:'Sulphuric acid and sodium hydroxide',formulas:['H2SO4','NaOH','Na2SO4','H2O'],left:2,coefficients:[1,2,1,2],condition:'Aqueous acid and base',types:['Neutralisation']},
 {id:'silver',title:'Silver chloride in light',formulas:['AgCl','Ag','Cl2'],left:1,coefficients:[2,2,1],condition:'Sunlight supplies energy',types:['Decomposition','Photochemical']}
];
/** Syntactic atom counting for the neutral formulae in these lessons, not a chemical-validity oracle. */
export function formulaAtoms(formula:string):Record<string,number>{
 if(!formula||formula.length>160)throw new Error('Use a non-empty neutral formula.');
 const total:Record<string,number>={};
 for(const part of formula.replaceAll('·','.').split('.')){
  const leading=part.match(/^(\d+)/),multiplier=leading?Number(leading[1]):1;let i=leading?leading[1].length:0;
  if(!multiplier||multiplier>1000||i===part.length)throw new Error('Invalid formula multiplier.');
  const number=()=>{const start=i;while(i<part.length&&/\d/.test(part[i]))i++;const n=start===i?1:Number(part.slice(start,i));if(n<1||n>1000)throw new Error('Invalid atom count.');return n;};
  function group(nested=false):Record<string,number>{const out:Record<string,number>={};let terms=0;while(i<part.length&&part[i]!==')'){
   if(part[i]==='('){i++;const inner=group(true);if(part[i]!==')')throw new Error('Unclosed group.');i++;const n=number();for(const [e,c]of Object.entries(inner))out[e]=(out[e]??0)+c*n;}
   else{const token=part.slice(i).match(/^[A-Z][a-z]?/);if(!token)throw new Error('Invalid neutral formula.');i+=token[0].length;const n=number();out[token[0]]=(out[token[0]]??0)+n;}terms++;
  }if(!terms||(!nested&&i<part.length))throw new Error('Unexpected or empty group.');return out;}
  const atoms=group();if(i!==part.length)throw new Error('Unexpected closing parenthesis.');for(const [e,c]of Object.entries(atoms))total[e]=(total[e]??0)+c*multiplier;
 }return total;
}
export function balanceStatus(formulas:string[],left:number,coefficients:number[]){
 if(left<1||left>=formulas.length||!Number.isInteger(left)||coefficients.length!==formulas.length||coefficients.some(c=>!Number.isInteger(c)||c<1||c>100))throw new Error('Use a coefficient from 1 to 100 for every species.');
 const lhs:Record<string,number>={},rhs:Record<string,number>={};formulas.forEach((f,i)=>{const dest=i<left?lhs:rhs;for(const [e,n]of Object.entries(formulaAtoms(f)))dest[e]=(dest[e]??0)+n*coefficients[i];});
 const rows=[...new Set([...Object.keys(lhs),...Object.keys(rhs)])].sort().map(element=>({element,left:lhs[element]??0,right:rhs[element]??0}));
 const gcd=(a:number,b:number):number=>b?gcd(b,a%b):a;return {rows,balanced:rows.every(r=>r.left===r.right),smallest:coefficients.reduce(gcd)===1};
}
export function pHProfile(pH:number){if(!Number.isFinite(pH)||pH<0||pH>14)throw new Error('This model uses pH 0–14 at 25°C.');return {nature:pH<7?'Acidic':pH>7?'Basic':'Neutral',hydronium:10**(-pH),hydroxide:10**(pH-14),litmus:pH<4.5?'Red':pH>8.3?'Blue':'Purple / transition',phenolphthalein:pH<8.2?'Colourless':pH<10?'Pale pink / transition':'Pink',methylOrange:pH<3.1?'Red':pH<=4.4?'Orange / transition':'Yellow'};}
export function neutralisationUnits(acid:number,base:number){if(![acid,base].every(n=>Number.isInteger(n)&&n>=0&&n<=100))throw new Error('Use whole model units from 0–100.');const reacted=Math.min(acid,base);return {waterFormed:reacted,acidRemaining:acid-reacted,baseRemaining:base-reacted,nature:acid===base?'Neutral':acid>base?'Acidic':'Basic'};}
export const saltModels=[
 {formula:'NaCl',name:'Sodium chloride',acid:'HCl — strong acid',base:'NaOH — strong base',nature:'Neutral',use:'Common salt; raw material for chlor-alkali chemicals.'},
 {formula:'KNO3',name:'Potassium nitrate',acid:'HNO3 — strong acid',base:'KOH — strong base',nature:'Neutral',use:'A source example of a neutral salt solution.'},
 {formula:'AlCl3',name:'Aluminium chloride',acid:'HCl — strong acid',base:'Al(OH)3 — weak/amphoteric hydroxide',nature:'Acidic',use:'A source example showing salt need not mean neutral.'},
 {formula:'ZnSO4',name:'Zinc sulphate',acid:'H2SO4 — strong acid',base:'Zn(OH)2 — weak/amphoteric hydroxide',nature:'Acidic',use:'Compare with other sulphate-family salts.'},
 {formula:'CuSO4',name:'Copper(II) sulphate',acid:'H2SO4 — strong acid',base:'Cu(OH)2 — weak base',nature:'Acidic',use:'Blue hydrated crystals and the iron-displacement example.'},
 {formula:'CH3COONa',name:'Sodium acetate',acid:'CH3COOH — weak acid',base:'NaOH — strong base',nature:'Basic',use:'Compare with sodium chloride: same cation, different solution behaviour.'},
 {formula:'Na2CO3',name:'Sodium carbonate',acid:'H2CO3 — weak acid',base:'NaOH — strong base',nature:'Basic',use:'Its decahydrate is washing soda; hardness removal and cleaning uses.'},
 {formula:'NaHCO3',name:'Sodium hydrogencarbonate',acid:'H2CO3 — weak acid, partial neutralisation',base:'NaOH — strong base',nature:'Mildly basic',use:'Baking soda; part of baking powder and source CO2-generation examples.'}
];
