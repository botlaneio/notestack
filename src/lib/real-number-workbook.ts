import {checkField,type PracticeTask,textbookTasks} from './real-number-practice.ts';
export type Work = {answers:string[];draft:string;submitted:boolean;firstCorrect:boolean|null;solutionViewed:boolean;hints:number;checks:boolean[]};
export const blankWork=(task:PracticeTask):Work=>({answers:(task.fields??[]).map(()=>''),draft:'',submitted:false,firstCorrect:null,solutionViewed:false,hints:0,checks:(task.checklist??[]).map(()=>false)});
export function restoreWork(value:unknown,tasks:PracticeTask[]):Record<string,Work>{
 const result:Record<string,Work>={};if(!value||typeof value!=='object')return result;
 for(const task of tasks){const v=(value as Record<string,Partial<Work>>)[task.id];if(!v||typeof v!=='object')continue;const w=blankWork(task);w.answers=w.answers.map((_,i)=>typeof v.answers?.[i]==='string'?v.answers[i].slice(0,200):'');w.draft=typeof v.draft==='string'?v.draft.slice(0,12000):'';w.submitted=v.submitted===true&&(task.fields?w.answers.every(a=>a.trim()):w.draft.trim().length>=40);w.firstCorrect=typeof v.firstCorrect==='boolean'?v.firstCorrect:null;w.solutionViewed=v.solutionViewed===true;w.hints=Number.isInteger(v.hints)?Math.max(0,Math.min(task.hints.length,v.hints!)):0;w.checks=w.checks.map((_,i)=>v.checks?.[i]===true);result[task.id]=w;}return result;
}
export function calculationCorrect(task:PracticeTask,w:Work){return !!task.fields&&w.submitted&&task.fields.every((field,i)=>checkField(field,w.answers[i]??'').correct);}
export function proofReviewed(task:PracticeTask,w:Work){return !!task.checklist&&w.submitted&&w.draft.trim().length>=40&&w.solutionViewed&&w.checks.length===task.checklist.length&&w.checks.every(Boolean);}
export const inventory = [
 {ref:'1.1 · Introduction',title:'Rational and irrational real numbers; purpose of the chapter',ids:['real','prime'],tasks:[]},
 {ref:'1.2 · Prime products',title:'Building numbers, factor trees, repeated primes and prime powers; 32760 and 123456789',ids:['factor','powers'],tasks:['ex11-1-0','ex11-1-1','ex11-1-2','ex11-1-3','ex11-1-4']},
 {ref:'Theorem 1.1',title:'Existence and uniqueness of prime factorisation, apart from order',ids:['unique','powers'],tasks:[]},
 {ref:'Example 1',title:'Why 4ⁿ cannot end in zero',ids:['ends-zero'],tasks:['ex11-5']},
 {ref:'Example 2',title:'Prime-factor HCF/LCM of 6 and 20; verify the two-number identity',ids:['hcf','lcm','product-identity'],tasks:['ex11-2-0','ex11-2-1','ex11-2-2']},
 {ref:'Example 3',title:'HCF of 96 and 404; derive LCM from the product identity',ids:['derive-lcm'],tasks:['ex11-4']},
 {ref:'Example 4 and remark',title:'HCF/LCM of 6, 72 and 120; why the product identity is not general for three numbers',ids:['three-numbers','product-identity'],tasks:['ex11-3-0','ex11-3-1','ex11-3-2']},
 {ref:'Exercise 1.1 · 6',title:'Prove both expressions composite by factoring a common divisor',ids:['composite-sum','composite-factorial'],tasks:['ex11-6-a','ex11-6-b']},
 {ref:'Exercise 1.1 · 7',title:'Common-return-time application; distinguish LCM from HCF',ids:['apply'],tasks:['ex11-7']},
 {ref:'1.3 · Foundations',title:'Lowest-terms assumption, coprimality and proof by contradiction',ids:['lowest-terms','proof'],tasks:[]},
 {ref:'Theorem 1.2 and its additional proof',title:'A prime divisor of a positive integer square divides the integer; proof from uniqueness',ids:['lemma','lemma-proof'],tasks:['proof-lemma']},
 {ref:'Theorem 1.3',title:'Complete contradiction proof for √2',ids:['proof'],tasks:['proof-sqrt2']},
 {ref:'Example 5',title:'Complete proof for √3 and extension to √p for prime p',ids:['proof3','sqrt-prime'],tasks:['proof-sqrt3']},
 {ref:'Example 6',title:'Irrationality of 5 − √3; rational shifts and differences',ids:['rational-shift'],tasks:['proof-shift','ex12-3-iii']},
 {ref:'Example 7',title:'Irrationality of 3√2; non-zero rational products and quotients',ids:['rational-scale','reciprocal'],tasks:['proof-scale','ex12-3-i','ex12-3-ii']},
 {ref:'Exercise 1.2 · 1–2',title:'Full √5 proof and isolating √5 from 3 + 2√5',ids:['sqrt5-full','extend'],tasks:['ex12-1','ex12-2']},
 {ref:'1.4 · Summary',title:'Retrieve the theorem, prime-square result and irrationality reasoning',ids:['exit-factor','exit-hcf','exit-proof'],tasks:[]},
];
export const textbookReferences=textbookTasks.map(task=>({id:task.id,reference:task.reference,title:task.title}));
