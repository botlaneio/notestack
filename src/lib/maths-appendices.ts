import data from './appendix-guides.json' with {type:'json'};
import type {Chapter} from './maths-chapters.ts';
export const appendices:Chapter[]=data as Chapter[];
