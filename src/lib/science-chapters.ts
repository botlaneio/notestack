import nextGuides from './science-3-4-guides.json' with {type:'json'};
import nextPractice from './science-3-4-practice.json' with {type:'json'};
import guides from './science-guides.json' with {type:'json'};
import practice from './science-practice-data.json' with {type:'json'};
import type {Chapter} from './maths-chapters.ts';
import type {WorkbookConfig} from './chapter-practice.ts';
import type {PracticeTask} from './real-number-practice.ts';
export const scienceChapters=[...guides,...nextGuides] as Chapter[];
export const scienceWorkbooks:WorkbookConfig[]=scienceChapters.map(c=>({number:c.number,subject:'science',slug:c.slug,title:c.title,part:c.part??1,sourcePending:c.sourcePending,tasks:((c.number<=2?practice:nextPractice).chapters as Record<string,unknown>)[String(c.number)] as PracticeTask[],checks:((c.number<=2?practice:nextPractice).checks as Record<string,unknown>)[String(c.number)] as PracticeTask[]}));
