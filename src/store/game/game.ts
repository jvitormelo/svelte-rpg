import { writable } from 'svelte/store';
import type { GameEntity } from '../../games-type';

export type Game = GameEntity[][];

export const game = writable<Game>([[]]);
