import data from '@/data/catalog.json';

export interface SubjectPack {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  price: number;
  image: string;
  color: string;
  edition: string;
  sampleTopic: string;
  sampleFile: string;
  topics: string[];
}

export const products: readonly SubjectPack[] = data;
