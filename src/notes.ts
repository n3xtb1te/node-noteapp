import { INFO, REGULAR, WARNING } from '@utils/constants.ts';
import { loadNotes, saveNotes } from '@utils/helper.ts';
import type { Note } from '@utils/types.ts';
import dedent from 'dedent';

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
      REGULAR(
        dedent(`
        Id: ${note.id}
        Title: ${note.title}
        Description: ${note.description}
        `),
      ),
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

export const removeNoteById = async (id: string) => {
  const notes = await loadNotes();
  const newNotes = notes.filter((n) => n.id !== id);
  if (newNotes.length !== notes.length) {
    await saveNotes(newNotes);
    console.log(INFO('Note removed.'));
  } else {
    console.log(WARNING('No such note.'));
  }
};

export const searchNote = async (input: string) => {
  const notes = await loadNotes();
  const note = notes;
};
