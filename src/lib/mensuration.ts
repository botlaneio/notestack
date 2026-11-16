function positive(...values:number[]){if(values.some(v=>!Number.isFinite(v)||v<=0))throw new Error('Use finite positive measurements and a positive value of π.');}
export function sectorMeasures(radius:number,minorDegrees:number,pi=Math.PI){
 positive(radius,minorDegrees,pi);if(minorDegrees>180)throw new Error('Use a minor central angle at most180°.');
 const disc=pi*radius*radius,arc=minorDegrees/360*2*pi*radius,sector=minorDegrees/360*disc;
 const triangle=minorDegrees===180?0:.5*radius*radius*Math.sin(minorDegrees*Math.PI/180);
 const segment=sector-triangle;
 return {disc,arc,sector,triangle,segment,majorSector:disc-sector,majorSegment:disc-segment,sectorPerimeter:arc+2*radius};
}
export type CompositeKind='toy'|'capsule'|'cone-cylinder';
export function compositeMeasures(kind:CompositeKind,radius:number,height:number,pi=Math.PI){
 positive(radius,height,pi);const disc=pi*radius*radius,slant=Math.hypot(radius,height);
 let joinedArea:number,volume:number,joins:number;
 if(kind==='toy'){joinedArea=pi*radius*slant+2*disc;volume=disc*height/3+2*disc*radius/3;joins=1}
 else if(kind==='capsule'){joinedArea=2*pi*radius*height+4*disc;volume=disc*height+4*disc*radius/3;joins=2}
 else if(kind==='cone-cylinder'){joinedArea=pi*radius*slant+2*pi*radius*height+disc;volume=disc*height+disc*height/3;joins=1}
 else throw new Error('Choose a supported combination.');
 return {joinedArea,separateArea:joinedArea+2*joins*disc,hiddenArea:2*joins*disc,volume,slant,joins};
}
export function capsuleCylinderHeight(entireLength:number,diameter:number){positive(entireLength,diameter);if(entireLength<diameter)throw new Error('Entire length must accommodate both hemispherical ends.');return entireLength-diameter;}
export function cylinderWithConicalCavity(radius:number,height:number,pi=Math.PI){positive(radius,height,pi);const slant=Math.hypot(radius,height);return {slant,area:2*pi*radius*height+pi*radius*slant+pi*radius*radius,volume:2*pi*radius*radius*height/3};}
export function massInKg(volumeCm3:number,densityGramsPerCm3:number){positive(densityGramsPerCm3);if(!Number.isFinite(volumeCm3)||volumeCm3<0)throw new Error('Use a nonnegative finite volume.');return volumeCm3*densityGramsPerCm3/1000;}
