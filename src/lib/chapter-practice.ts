import appendixSource from './appendix-practice-data.json';
import finalData from './final-chapters-practice-data.json';
import mensurationData from './mensuration-practice-data.json';
import partTwoData from './part-two-practice-data.json';
import data from './chapter-practice-data.json';
import type {PracticeTask} from './real-number-practice.ts';
export type WorkbookConfig={number:number;code?:string;subject?:'maths'|'science';sourcePending?:string;slug:string;title:string;part?:number;tasks:PracticeTask[];checks:PracticeTask[]};
const names=[['polynomials','Polynomials'],['linear-equations','Pair of Linear Equations in Two Variables'],['quadratic-equations','Quadratic Equations'],['arithmetic-progressions','Arithmetic Progressions'],['triangles','Triangles'],['coordinate-geometry','Coordinate Geometry'],['introduction-to-trigonometry','Introduction to Trigonometry'],['applications-of-trigonometry','Some Applications of Trigonometry'],['circles','Circles'],['areas-related-to-circles','Areas Related to Circles'],['surface-areas-and-volumes','Surface Areas and Volumes'],['statistics','Statistics'],['probability','Probability']];
export const chapterWorkbooks:WorkbookConfig[]=names.map(([slug,title],i)=>({number:i+2,slug,title,part:i+2>=8?2:1,tasks:((i+2>=13?finalData:i+2>=11?mensurationData:i+2>=8?partTwoData:data).chapters as Record<string,unknown>)[String(i+2)] as PracticeTask[],checks:((i+2>=13?finalData:i+2>=11?mensurationData:i+2>=8?partTwoData:data).checks as Record<string,unknown>)[String(i+2)] as PracticeTask[]}));

const appendixData=appendixSource as {a1:PracticeTask[];a2:PracticeTask[];a1Checks:PracticeTask[];a2Checks:PracticeTask[]};
chapterWorkbooks.push({number:15,code:'A1',slug:'proofs-in-mathematics',title:'Proofs in Mathematics',part:1,tasks:appendixData.a1,checks:appendixData.a1Checks},{number:16,code:'A2',slug:'mathematical-modelling',title:'Mathematical Modelling',part:2,tasks:appendixData.a2,checks:appendixData.a2Checks});
