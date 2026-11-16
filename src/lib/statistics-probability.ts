export type FrequencyClass={lower:number;upper:number;frequency:number};
export function groupedStatistics(rows:FrequencyClass[],assumedMean?:number,scale=1){
 if(!rows.length||!Number.isFinite(scale)||scale===0)throw new Error('Use classes and a non-zero finite scale.');
 if(rows.some((r,i)=>![r.lower,r.upper,r.frequency].every(Number.isFinite)||r.upper<=r.lower||r.frequency<0||!Number.isInteger(r.frequency)||(i>0&&Math.abs(r.lower-rows[i-1].upper)>1e-8)))throw new Error('Use ordered continuous classes and nonnegative integer frequencies.');
 const total=rows.reduce((n,r)=>n+r.frequency,0);if(total===0)throw new Error('At least one observation is needed.');
 const a=assumedMean??(rows[Math.floor(rows.length/2)].lower+rows[Math.floor(rows.length/2)].upper)/2;if(!Number.isFinite(a))throw new Error('Use a finite assumed mean.');
 let cumulative=0,weightedSum=0,deviationSum=0,stepSum=0;
 const table=rows.map(r=>{const midpoint=(r.lower+r.upper)/2,product=midpoint*r.frequency,deviation=midpoint-a,step=deviation/scale;cumulative+=r.frequency;weightedSum+=product;deviationSum+=r.frequency*deviation;stepSum+=r.frequency*step;return {...r,midpoint,product,deviation,step,cumulative}});
 const mean=weightedSum/total,j=table.findIndex(r=>r.cumulative>=total/2),medianRow=table[j],before=j?table[j-1].cumulative:0,median=medianRow.lower+(total/2-before)/medianRow.frequency*(medianRow.upper-medianRow.lower);
 const peak=Math.max(...rows.map(r=>r.frequency)),modalIndices=rows.map((r,i)=>r.frequency===peak?i:-1).filter(i=>i>=0),equalWidths=rows.every(r=>Math.abs((r.upper-r.lower)-(rows[0].upper-rows[0].lower))<1e-8);
 let mode:number|null=null,modalIndex:number|null=null;
 if(modalIndices.length===1&&equalWidths){const k=modalIndices[0],r=rows[k],f0=k?rows[k-1].frequency:0,f2=k+1<rows.length?rows[k+1].frequency:0,denominator=2*r.frequency-f0-f2;if(denominator>0){mode=r.lower+(r.frequency-f0)/denominator*(r.upper-r.lower);modalIndex=k}}
 return {total,table,weightedSum,mean,assumedMean:a,scale,deviationSum,stepSum,assumedResult:a+deviationSum/total,stepResult:a+scale*stepSum/total,median,medianIndex:j,mode,modalIndex,modalIndices,equalWidths};
}
export function recoverFrequencies(cumulative:number[]){let previous=0;return cumulative.map(v=>{if(!Number.isInteger(v)||v<previous)throw new Error('Cumulative counts must be nondecreasing nonnegative integers.');const f=v-previous;previous=v;return f})}
export const dicePairs=Array.from({length:36},(_,i)=>({first:Math.floor(i/6)+1,second:i%6+1}));
export function diceEvent(event:'sum7'|'sum8'|'same'|'at-least-one5') {const favourable=dicePairs.filter(p=>event==='sum7'?p.first+p.second===7:event==='sum8'?p.first+p.second===8:event==='same'?p.first===p.second:p.first===5||p.second===5);return {favourable,total:36,probability:favourable.length/36};}
export function coinSequences(tosses:number):string[]{if(!Number.isInteger(tosses)||tosses<1||tosses>3)throw new Error('Use one,two or three tosses.');return Array.from({length:2**tosses},(_,i)=>Array.from({length:tosses},(_,j)=>i&(1<<(tosses-j-1))?'T':'H').join(''));}
export function probability(favourable:number,total:number){if(!Number.isInteger(favourable)||!Number.isInteger(total)||total<1||favourable<0||favourable>total)throw new Error('Use valid finite outcome counts.');return favourable/total;}
