import type { GameEntity } from 'src/types/game';
import { writable } from 'svelte/store';

interface Store {
	position: GameEntity['position'];
	entityId: string;
}

export const currentDragging = writable<Store | null>(null);

export const setCurrentDragging = ({ entityId, position }: Store) => {
	currentDragging.set({ entityId, position });
};

export const removeCurrentDragging = () => {
	currentDragging.set(null);
};
