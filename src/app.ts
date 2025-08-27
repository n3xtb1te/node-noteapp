import { existsSync, writeFileSync } from 'node:fs';
import { prepareData, readHelper } from '@utils/helper.ts';
import type { Note } from '@utils/types.ts';

const PATH = './notes/notes.json';

const addNote = (note: Note) => {
  if (existsSync(PATH)) {
    const items = readHelper(PATH);
    items.push(note);
    writeFileSync(PATH, JSON.stringify(items, null, 2));
  } else {
    writeFileSync(PATH, `[${JSON.stringify(note, null, 2)}]`);
  }
};

const readNotes = () => {
  if (existsSync(PATH)) {
    const items = readHelper(PATH);
    for (const item of items) {
      console.log(`Title: ${item.title}\nDescription: ${item.description}`);
    }
  } else {
    console.warn('No such file.');
  }
};

const readNote = (title: string) => {
  if (existsSync(PATH)) {
    const items = readHelper(PATH);
    const item = items.find((item) => item.title === title);
    if (item) {
      console.log(`Title: ${item.title}\nDescription: ${item.description}`);
    } else {
      console.warn('No such note.');
    }
  } else {
    console.warn('No such file.');
  }
};

const removeNote = (title: string) => {
  if (existsSync(PATH)) {
    const items = readHelper(PATH);
    const index = items.findIndex((item) => item.title === title);
    if (index >= 0) {
      items.splice(index, 1);
      writeFileSync(PATH, JSON.stringify(items, null, 2));
    } else {
      console.warn('No such note.');
    }
  } else {
    console.warn('No such file.');
  }
};

const entryPoint = () => {
  const args = process.argv;
  switch (args[2]) {
    case 'list':
      readNotes();
      break;
    case 'read':
      readNote(args[3]);
      break;
    case 'add':
      addNote(args[3], args[4]);
      break;
    case 'remove':
      removeNote(args[3]);
      break;
    default:
      console.log('No such command.');
      break;
  }
};

entryPoint();
