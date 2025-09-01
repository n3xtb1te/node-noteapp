import { constants } from 'node:fs';
import { access, readFile, writeFile } from 'node:fs/promises';
import { ERROR, PATH, WARNING } from '@utils/constants.ts';
import type { Note } from '@utils/types.ts';
import { v7 as uuidv7 } from 'uuid';

export const prepareData = (title: string, description: string): Note => {
  const now = new Date();
  return {
    id: generateUUID(),
    title,
    description,
    createdAt: now,
    updatedAt: now,
  };
};

export const loadNotes = async () => {
  if (!fileExists(PATH)) {
    console.log(WARNING('No such file.'));
    return [];
  }
  try {
    return JSON.parse(await readFile(PATH, 'utf-8')) as Note[];
  } catch {
    console.log(ERROR('Notes file is broken.'));
    return [];
  }
};

export const saveNotes = (notes: Note[]) =>
  writeFile(PATH, JSON.stringify(notes, null, 2));

export const fileExists = async (path: string) => {
  try {
    await access(path, constants.F_OK);
    return true;
  } catch {
    return false;
  }
};

export const generateUUID = () => uuidv7();
