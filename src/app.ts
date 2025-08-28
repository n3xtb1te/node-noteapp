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

const listNotes = () => {
  if (existsSync(PATH)) {
    const items = readHelper(PATH);
    for (const item of items) {
      console.log(` • ${item.title}`);
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
      listNotes();
      break;
    case 'read':
      if (args[3]) {
        readNote(args[3]);
      } else {
        console.warn('Error: Title is required for read command.');
      }
      break;
    case 'add':
      if (args[3] && args[4]) {
        addNote(prepareData(args[3], args[4]));
      } else {
        console.warn(
          'Error: Title and description are required for add command.',
        );
      }
      break;
    case 'remove':
      if (args[3]) {
        removeNote(args[3]);
      } else {
        console.warn('Error: Title is required for remove command.');
      }
      break;
    default:
      console.warn('No such command.');
      break;
  }
};

entryPoint();
