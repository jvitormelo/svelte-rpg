import { writable } from 'svelte/store';
import type { Position } from '../../types/game';

interface Store {
	position: Position['position'];
	entityId: string;
}

export const currentDragging = writable<Store | null>(null);

export const setCurrentDragging = ({ entityId, position }: Store) => {
	currentDragging.set({ entityId, position });
};

export const removeCurrentDragging = () => {
	currentDragging.set(null);
};
