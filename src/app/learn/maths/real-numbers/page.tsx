import type {Metadata} from 'next';
import {RealNumbersLesson} from '@/components/real-numbers-lesson';
export const metadata: Metadata = {title:'Real Numbers — guided chapter',description:'Learn prime factorisation, HCF, LCM and irrational-number proofs one interactive step at a time.'};
export default function Page(){return <RealNumbersLesson/>;}
