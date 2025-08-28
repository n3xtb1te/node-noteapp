import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { PATH } from '@utils/constants.ts';
import type { Note } from '@utils/types.ts';
import { chalkStderr } from 'chalk';

export const prepareData = (title: string, description: string): Note => {
  return {
    title,
    description,
  };
};

export const loadNotes = () => {
  if (!existsSync(PATH)) {
    console.log(warning('No such file.'));
    return [];
  }
  try {
    return JSON.parse(readFileSync(PATH, 'utf-8')) as Note[];
  } catch {
    console.log(error('Notes file is broken.'));
    return [];
  }
};

export const saveNotes = (notes: Note[]) => {
  writeFileSync(PATH, JSON.stringify(notes, null, 2));
};

export const regular = chalkStderr.bold.green;
export const info = chalkStderr.bold.blue;
export const warning = chalkStderr.bold.yellow;
export const error = chalkStderr.bold.red;
