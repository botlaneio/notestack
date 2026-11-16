import type {Metadata} from 'next';
import {RealNumberWorkbook} from '@/components/real-number-workbook';
export const metadata:Metadata={title:'Real Numbers — textbook practice'};
export default function Page(){return <RealNumberWorkbook/>;}
