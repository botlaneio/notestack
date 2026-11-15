export function quadratic(a:number,b:number,c:number){
 if(![a,b,c].every(Number.isFinite)||a===0)throw new Error('A quadratic needs finite coefficients and a non-zero leading coefficient.');
 const discriminant=b*b-4*a*c;
 const roots=discriminant<0?[]:discriminant===0?[-b/(2*a)]:[(-b-Math.sqrt(discriminant))/(2*a),(-b+Math.sqrt(discriminant))/(2*a)].sort((x,y)=>x-y);
 return {discriminant,roots,count:roots.length};
}
export const lineCases = [
 {label:'Intersecting',second:'y = x',m:1,c:0,intersection:[2,2],description:'One solution: (2, 2). The two lines meet once.'},
 {label:'Parallel',second:'x + y = 1',m:-1,c:1,intersection:null,description:'No solution. The distinct parallel lines never meet.'},
 {label:'Coincident',second:'2x + 2y = 8',m:-1,c:4,intersection:null,description:'Infinitely many solutions. Both equations describe the same line.'},
];
export function arithmeticProgression(a:number,d:number,n:number){
 if(!Number.isFinite(a)||!Number.isFinite(d)||!Number.isInteger(n)||n<1||n>1000)throw new Error('Use finite a and d and a positive integer n up to 1000.');
 const last=a+(n-1)*d;
 return {terms:Array.from({length:n},(_,i)=>a+i*d),last,sum:n*(a+last)/2};
}
export type Point = {x:number;y:number};
function finitePoint(point:Point){if(!Number.isFinite(point.x)||!Number.isFinite(point.y))throw new Error('Coordinates must be finite.');}
export function pointDistance(a:Point,b:Point){finitePoint(a);finitePoint(b);const dx=b.x-a.x,dy=b.y-a.y;return {dx,dy,squared:dx*dx+dy*dy,distance:Math.hypot(dx,dy)};}
export function internalSection(a:Point,b:Point,m:number,n:number):Point{
 finitePoint(a);finitePoint(b);if(!Number.isFinite(m)||!Number.isFinite(n)||m<=0||n<=0)throw new Error('Internal division needs positive finite ratio parts.');
 return {x:(m*b.x+n*a.x)/(m+n),y:(m*b.y+n*a.y)/(m+n)};
}
export function parallelSplit(t:number){
 if(!Number.isFinite(t)||t<=0||t>=1)throw new Error('The parallel cut must lie strictly between A and the base.');
 return {ad:10*t,db:10*(1-t),ae:15*t,ec:15*(1-t),ratio:t/(1-t)};
}
