// The free first chapter, kept in its own file so it can load without the other chapters.
import {steps as realSteps, sections as realSections} from './real-numbers.ts';
import type {Chapter} from './maths-chapters.ts';
export const realNumbers: Chapter = {
 number:1,slug:'real-numbers',title:'Real Numbers',sections:realSections,steps:realSteps,
 summary:[['Prime factorisation','Composite numbers have a unique set of prime factors, apart from order.'],['HCF & LCM','Smaller shared prime powers for HCF; larger required prime powers for LCM.'],['Irrational numbers','Non-terminating, non-repeating decimals cannot be expressed as ratios of integers.'],['Proof by contradiction','A lowest-terms fraction cannot have a common factor in its numerator and denominator.']],
 challenge:'Complete both textbook exercises, then try the independent chapter check. Have your written proofs verified by a teacher.'
};
