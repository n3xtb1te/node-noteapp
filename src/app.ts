import { addNote, listNotes, readNote, removeNote } from '@src/notes.ts';
import { ERROR, INFO, WARNING } from '@utils/constants.ts';
import { generateUUID, prepareData } from '@utils/helper.ts';
import dedent from 'dedent';

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
        console.log(ERROR('Error: Title is required for read command.'));
      }
      break;
    case 'add':
      if (title && description) {
        addNote(prepareData(generateUUID(), title, description));
      } else {
        console.log(
          ERROR('Error: Title and description are required for add command.'),
        );
      }
      break;
    case 'remove':
      if (title) {
        removeNote(title);
      } else {
        console.log(ERROR('Error: Title is required for remove command.'));
      }
      break;
    case 'help':
      console.log(
        INFO(dedent`
        list   - show all notes
        read   - read specific note (note title should be provided)
        add    - add new note (note title and description should be provided)
        remove - remove specific note (note title should be provided)
        help   - show this information
        `),
      );
      break;
    default:
      console.log(WARNING('No such command.'));
      break;
  }
};

entryPoint();
