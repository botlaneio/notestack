import partTwoData from './part-two-practice-data.json';
import data from './chapter-practice-data.json';
import type {PracticeTask} from './real-number-practice.ts';
export type WorkbookConfig={number:number;slug:string;title:string;part?:number;tasks:PracticeTask[];checks:PracticeTask[]};
const names=[['polynomials','Polynomials'],['linear-equations','Pair of Linear Equations in Two Variables'],['quadratic-equations','Quadratic Equations'],['arithmetic-progressions','Arithmetic Progressions'],['triangles','Triangles'],['coordinate-geometry','Coordinate Geometry'],['introduction-to-trigonometry','Introduction to Trigonometry'],['applications-of-trigonometry','Some Applications of Trigonometry'],['circles','Circles']];
export const chapterWorkbooks:WorkbookConfig[]=names.map(([slug,title],i)=>({number:i+2,slug,title,part:i+2>=8?2:1,tasks:((i+2>=8?partTwoData:data).chapters as Record<string,unknown>)[String(i+2)] as PracticeTask[],checks:((i+2>=8?partTwoData:data).checks as Record<string,unknown>)[String(i+2)] as PracticeTask[]}));
