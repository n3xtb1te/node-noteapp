import { existsSync, readFileSync, writeFileSync } from 'node:fs';

const path = './notes/notes.json';

const prepareData = (title, description) => {
  return {
    title,
    description,
  };
};

const readHelper = (path) => {
  const json = readFileSync(path, 'utf-8');
  return JSON.parse(json);
};

// add note
const addNote = (title, description) => {
  const note = prepareData(title, description);
  if (existsSync(path)) {
    const data = readHelper(path);
    data.push(note);
    writeFileSync(path, JSON.stringify(data, null, 2));
  } else {
    writeFileSync(path, `[${JSON.stringify(note, null, 2)}]`);
  }
};

// read all notes
const readNotes = () => {
  if (existsSync(path)) {
    const data = readHelper(path);
    for (const note of data) {
      console.log(`Title: ${note.title}\nDescription: ${note.description}`);
    }
  } else {
    console.log('No such file.');
  }
};

// read particular note
const readNote = (title) => {
  if (existsSync(path)) {
    const data = readHelper(path);
    const note = data.find((note) => note.title === title);
    if (note) {
      console.log(`Title: ${note.title}\nDescription: ${note.description}`);
    } else {
      console.log('No such note.');
    }
  } else {
    console.log('No such file.');
  }
};

// remove note
const removeNote = (title) => {
  if (existsSync(path)) {
    const data = readHelper(path);
    const index = data.findIndex((note) => note.title === title);
    if (index >= 0) {
      data.splice(index, 1);
      writeFileSync(path, JSON.stringify(data, null, 2));
    } else {
      console.log('No such note.');
    }
  } else {
    console.log('No such file.');
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
