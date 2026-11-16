/** Maximum regions with general-position circle points, not a proof of the formula. */
export function circleRegions(n:number){if(!Number.isInteger(n)||n<1||n>20)throw new Error('Use 1–20 points.');return 1+n*(n-1)/2+(n<4?0:n*(n-1)*(n-2)*(n-3)/24);}
export function captureEstimate(marked:number,sample:number,recaptured:number):number|null{
 if(![marked,sample,recaptured].every(Number.isSafeInteger)||marked<1||sample<1||recaptured<0||recaptured>sample||recaptured>marked)throw new Error('Use positive whole counts with recaptured no larger than either marked or sample.');
 return recaptured===0?null:marked*sample/recaptured;
}
export function rabbitPairs(month:number){if(!Number.isInteger(month)||month<0||month>40)throw new Error('Use a month from 0–40.');let a=1,b=1;for(let n=2;n<=month;n++){[a,b]=[b,a+b]}return month===0?1:b;}
export function principalMonthRate(interest:number,principals:number[]){if(!Number.isFinite(interest)||interest<0||!principals.length||principals.some(p=>!Number.isFinite(p)||p<=0))throw new Error('Use nonnegative interest and positive principals.');return interest*1200/principals.reduce((a,b)=>a+b,0);}
export function forecastPercentages(values:number[]){if(values.length<2||values.some(v=>!Number.isFinite(v)||v<0||v>100))throw new Error('Enter at least two percentages from 0 to 100.');const n=values.length,xbar=(n+1)/2,mean=values.reduce((a,b)=>a+b,0)/n;let top=0,bottom=0;values.forEach((y,i)=>{top+=(i+1-xbar)*(y-mean);bottom+=(i+1-xbar)**2});const slope=top/bottom,trend=mean+slope*(n+1-xbar);return {mean,slope,trend,inRange:trend>=0&&trend<=100};}
