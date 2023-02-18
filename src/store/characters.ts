import { writable } from 'svelte/store';
import Shadow from '$lib/assets/characters/shadow.png';
import type { Character } from '../types';

export const availableCharacters = writable<Character[]>([
	{
		id: 'shadow',
		name: 'Shadow',
		image: Shadow,
		attack: Number.MAX_SAFE_INTEGER,
		health: Number.MAX_SAFE_INTEGER,
		defense: Number.MAX_SAFE_INTEGER,
		description: 'The ultimate being.',
		skills: [
			{
				name: "I'm atomic",
				aoe: Number.MAX_SAFE_INTEGER,
				damageMultiplier: 1
			}
		]
	}
]);
