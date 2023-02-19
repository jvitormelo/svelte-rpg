import { writable } from 'svelte/store';

export const actionPoints = writable(100);

export const removeActionsPoints = (value: number) => {
	actionPoints.update((current) => current - value);
};

export const addActionsPoints = (value: number) => {
	actionPoints.update((current) => current + value);
};
