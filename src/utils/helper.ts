import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { ERROR, PATH, WARNING } from '@utils/constants.ts';
import type { Note } from '@utils/types.ts';
import { v7 as uuidv7 } from 'uuid';

export const prepareData = (
  id: string,
  title: string,
  description: string,
): Note => {
  return {
    id,
    title,
    description,
  };
};

export const loadNotes = () => {
  if (!existsSync(PATH)) {
    console.log(WARNING('No such file.'));
    return [];
  }
  try {
    return JSON.parse(readFileSync(PATH, 'utf-8')) as Note[];
  } catch {
    console.log(ERROR('Notes file is broken.'));
    return [];
  }
};

export const saveNotes = (notes: Note[]) => {
  writeFileSync(PATH, JSON.stringify(notes, null, 2));
};

export const generateUUID = () => uuidv7();
