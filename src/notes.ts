import { INFO, REGULAR, WARNING } from '@utils/constants.ts';
import { loadNotes, saveNotes } from '@utils/helper.ts';
import type { Note } from '@utils/types.ts';

export const addNote = (note: Note) => {
  const notes = loadNotes();
  notes.push(note);
  saveNotes(notes);
};

export const listNotes = () => {
  const notes = loadNotes();
  notes.forEach((n) => console.log(REGULAR(` • ${n.title}`)));
};

export const readNote = (title: string) => {
  const notes = loadNotes();
  const note = notes.find((item) => item.title === title);
  if (note) {
    console.log(
      REGULAR(`Title: ${note.title}\nDescription: ${note.description}`),
    );
  } else {
    console.log(WARNING('No such note.'));
  }
};

export const removeNote = (title: string) => {
  const notes = loadNotes();
  const newNotes = notes.filter((n) => n.title !== title);
  if (newNotes.length !== notes.length) {
    saveNotes(newNotes);
    console.log(INFO('Note removed.'));
  } else {
    console.log(WARNING('No such note.'));
  }
};
