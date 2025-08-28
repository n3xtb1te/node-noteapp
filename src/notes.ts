import { info, loadNotes, regular, saveNotes, warning } from '@utils/helper.ts';
import type { Note } from '@utils/types.ts';

export const addNote = (note: Note) => {
  const notes = loadNotes();
  notes.push(note);
  saveNotes(notes);
};

export const listNotes = () => {
  const notes = loadNotes();
  notes.forEach((n) => console.log(regular(` • ${n.title}`)));
};

export const readNote = (title: string) => {
  const notes = loadNotes();
  const note = notes.find((item) => item.title === title);
  if (note) {
    console.log(
      regular(`Title: ${note.title}\nDescription: ${note.description}`),
    );
  } else {
    console.log(warning('No such note.'));
  }
};

export const removeNote = (title: string) => {
  const notes = loadNotes();
  const newNotes = notes.filter((n) => n.title !== title);
  if (newNotes.length !== notes.length) {
    saveNotes(newNotes);
    console.log(info('Note removed.'));
  } else {
    console.log(warning('No such note.'));
  }
};
