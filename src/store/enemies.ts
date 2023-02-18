import { writable } from 'svelte/store';
import type { Enemy } from '../types';

export const enemies = writable<Enemy[]>([
	{
		attack: 10,
		defense: 10,
		description: 'A small, weak enemy.',
		health: 10,
		id: 'slime',
		image: 'https://i.imgur.com/9ZQ3Z9C.png',
		name: 'Slime',
		skills: [
			{
				aoe: 1,
				damageMultiplier: 1,
				name: 'Slime Attack'
			}
		]
	}
]);
