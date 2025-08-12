import { readFileSync } from 'node:fs';

export const prepareData = (title: string, description: string) => {
  return {
    title,
    description,
  };
};

export const readHelper = (path: string) => {
  const json = readFileSync(path, 'utf-8');
  return JSON.parse(json);
};
