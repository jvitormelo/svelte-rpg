import { writable } from 'svelte/store';
import type { MoveableEntity, Position } from '../../games-type';

export const currentDragging = writable<(MoveableEntity & Position) | null>(null);
