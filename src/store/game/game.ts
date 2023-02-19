import { writable } from 'svelte/store';
import type { GameEntity } from '../../games-type';

export type Game = GameEntity[][];

export const isGameStarted = writable(false);

export const game = writable<Game>([[]]);
