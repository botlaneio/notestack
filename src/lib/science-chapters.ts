import guides from './science-guides.json' with {type:'json'};
import practice from './science-practice-data.json' with {type:'json'};
import type {Chapter} from './maths-chapters.ts';
import type {WorkbookConfig} from './chapter-practice.ts';
import type {PracticeTask} from './real-number-practice.ts';
export const scienceChapters=guides as Chapter[];
export const scienceWorkbooks:WorkbookConfig[]=scienceChapters.map(c=>({number:c.number,subject:'science',slug:c.slug,title:c.title,part:1,tasks:(practice.chapters as Record<string,unknown>)[String(c.number)] as PracticeTask[],checks:(practice.checks as Record<string,unknown>)[String(c.number)] as PracticeTask[]}));
