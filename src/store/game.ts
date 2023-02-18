import { writable } from 'svelte/store';

export const isGameStarted = writable(false);

export const game = writable({
	actors: [
		{
			id: 'shadow',
			x: 0,
			y: 0
		},
		{
			id: 'slime',
			x: 3,
			y: 3
		}
	]
});

export const startGame = () => {
	isGameStarted.set(true);
};
