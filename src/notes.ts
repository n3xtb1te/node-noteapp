import { INFO, REGULAR, WARNING } from '@utils/constants.ts';
import { loadNotes, saveNotes } from '@utils/helper.ts';
import type { Note } from '@utils/types.ts';

export const addNote = async (note: Note) => {
  const notes = await loadNotes();
  notes.push(note);
  saveNotes(notes);
};

export const listNotes = async () => {
  const notes = await loadNotes();
  notes.forEach((n) => console.log(REGULAR(` • ${n.title}`)));
};

export const readNote = async (title: string) => {
  const notes = await loadNotes();
  const note = notes.find((item) => item.title === title);
  if (note) {
    console.log(
      REGULAR(`Title: ${note.title}\nDescription: ${note.description}`),
    );
  } else {
    console.log(WARNING('No such note.'));
  }
};

export const removeNote = async (title: string) => {
  const notes = await loadNotes();
  const newNotes = notes.filter((n) => n.title !== title);
  if (newNotes.length !== notes.length) {
    await saveNotes(newNotes);
    console.log(INFO('Note removed.'));
  } else {
    console.log(WARNING('No such note.'));
  }
};
