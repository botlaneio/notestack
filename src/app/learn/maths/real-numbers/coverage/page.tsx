import type {Metadata} from 'next';
import {RealNumberCoverage} from '@/components/real-number-coverage';
export const metadata:Metadata={title:'Real Numbers — textbook coverage map'};
export default function Page(){return <RealNumberCoverage/>;}
