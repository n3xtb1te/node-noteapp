import { chalkStderr } from 'chalk';

export const PATH = './notes/notes.json';

export const REGULAR = chalkStderr.bold.green;
export const INFO = chalkStderr.bold.blue;
export const WARNING = chalkStderr.bold.yellow;
export const ERROR = chalkStderr.bold.red;
