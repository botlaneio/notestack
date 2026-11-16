export function acuteRatios(degrees:number){
 if(!Number.isFinite(degrees)||degrees<=0||degrees>=90)throw new Error('Use an acute angle strictly between 0° and 90°.');
 const radians=degrees*Math.PI/180,sin=Math.sin(radians),cos=Math.cos(radians);
 return {sin,cos,tan:sin/cos,cosec:1/sin,sec:1/cos,cot:cos/sin};
}
export function heightFromElevation(distance:number,degrees:number,eyeHeight=0){
 if(!Number.isFinite(distance)||distance<=0||!Number.isFinite(eyeHeight)||eyeHeight<0)throw new Error('Use a positive horizontal distance and a nonnegative eye height.');
 const rise=distance*acuteRatios(degrees).tan;return {rise,total:rise+eyeHeight};
}
export function circleTangents(radius:number,distance:number){
 if(!Number.isFinite(radius)||radius<=0||!Number.isFinite(distance)||distance<0)throw new Error('Use a positive radius and nonnegative centre distance.');
 if(distance<radius)return {count:0,contacts:[] as {x:number;y:number}[],length:null};
 if(distance===radius)return {count:1,contacts:[{x:radius,y:0}],length:0};
 const length=Math.sqrt((distance-radius)*(distance+radius)),x=radius*radius/distance,y=radius*length/distance;
 return {count:2,contacts:[{x,y},{x,y:-y}],length};
}
export const specialAngleTable=[
 {angle:0,sin:'0',cos:'1',tan:'0',cosec:'Undefined',sec:'1',cot:'Undefined'},
 {angle:30,sin:'1/2',cos:'√3/2',tan:'1/√3',cosec:'2',sec:'2/√3',cot:'√3'},
 {angle:45,sin:'1/√2',cos:'1/√2',tan:'1',cosec:'√2',sec:'√2',cot:'1'},
 {angle:60,sin:'√3/2',cos:'1/2',tan:'√3',cosec:'2/√3',sec:'2',cot:'1/√3'},
 {angle:90,sin:'1',cos:'0',tan:'Undefined',cosec:'1',sec:'Undefined',cot:'0'},
];
