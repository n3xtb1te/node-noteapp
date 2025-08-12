import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { func } from './notes';

const path = './notes/notes.json';

func();
