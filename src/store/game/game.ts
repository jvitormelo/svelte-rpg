import { writable } from 'svelte/store';
import type { GameEntity } from '../../types/game';

export type Game = GameEntity[][];

export const game = writable<Game>([[]]);
