import { addNote, listNotes, readNote, removeNote } from '@src/notes.ts';
import { error, prepareData, warning } from '@utils/helper.ts';

const [, , command, title, ...descriptionParts] = process.argv;
const description = descriptionParts.join(' ');

const entryPoint = () => {
  switch (command) {
    case 'list':
      listNotes();
      break;
    case 'read':
      if (title) {
        readNote(title);
      } else {
        console.log(error('Error: Title is required for read command.'));
      }
      break;
    case 'add':
      if (title && description) {
        addNote(prepareData(title, description));
      } else {
        console.log(
          error('Error: Title and description are required for add command.'),
        );
      }
      break;
    case 'remove':
      if (title) {
        removeNote(title);
      } else {
        console.log(error('Error: Title is required for remove command.'));
      }
      break;
    default:
      console.log(warning('No such command.'));
      break;
  }
};

entryPoint();
