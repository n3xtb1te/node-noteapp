import { readFileSync } from 'node:fs';
import type { Note } from '@utils/types.ts';

export const prepareData = (title: string, description: string): Note => {
  return {
    title,
    description,
  };
};

export const readHelper = (path: string) => {
  const json = readFileSync(path, 'utf-8');
  return JSON.parse(json) as Note[];
};
