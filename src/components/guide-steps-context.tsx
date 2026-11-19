'use client';
// Gives interactive tools the current chapter's guide steps from the page, so tools do not
// import whole guide files into the site's shared JavaScript.
import {createContext, useContext, type ReactNode} from 'react';

export type GuideStep = {id: string; title: string; example?: string[]; explorer?: unknown};
export type SourceDetail = {id: string; page: number; title: string; explanation: string[]};
const GuideSteps = createContext<GuideStep[]>([]);
const SourceDetails = createContext<SourceDetail[]>([]);

export function GuideStepsProvider({steps, sourceDetails, children}: {steps?: GuideStep[]; sourceDetails?: SourceDetail[]; children: ReactNode}) {
  return <GuideSteps.Provider value={steps ?? []}><SourceDetails.Provider value={sourceDetails ?? []}>{children}</SourceDetails.Provider></GuideSteps.Provider>;
}
export const useGuideSteps = () => useContext(GuideSteps);
/** Source sidebar notes for chapters that have them (Freedom Struggle). */
export const useSourceDetails = () => useContext(SourceDetails);
