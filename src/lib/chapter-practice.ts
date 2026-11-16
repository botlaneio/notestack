import data from './chapter-practice-data.json';
import type {PracticeTask} from './real-number-practice.ts';
export type WorkbookConfig={number:number;slug:string;title:string;tasks:PracticeTask[];checks:PracticeTask[]};
const names=[['polynomials','Polynomials'],['linear-equations','Pair of Linear Equations in Two Variables'],['quadratic-equations','Quadratic Equations'],['arithmetic-progressions','Arithmetic Progressions'],['triangles','Triangles'],['coordinate-geometry','Coordinate Geometry']];
export const chapterWorkbooks:WorkbookConfig[]=names.map(([slug,title],i)=>({number:i+2,slug,title,tasks:(data.chapters as Record<string,unknown>)[String(i+2)] as PracticeTask[],checks:(data.checks as Record<string,unknown>)[String(i+2)] as PracticeTask[]}));
