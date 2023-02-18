import { writable } from 'svelte/store';
import type { Character } from '../types';

export const selectedCharacter = writable<Character | null>(null);
