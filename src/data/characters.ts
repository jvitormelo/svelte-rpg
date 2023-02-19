import Shadow from '$lib/assets/characters/shadow.png';
import Atomic from '$lib/assets/skills/atomic.jpg';

export const availableCharacters = [
	{
		name: 'Shadow',
		image: Shadow,
		attack: Number.MAX_SAFE_INTEGER,
		health: Number.MAX_SAFE_INTEGER,
		defense: Number.MAX_SAFE_INTEGER,
		description: 'The ultimate being.',
		skills: [
			{
				icon: Atomic,
				name: "I'm atomic",
				aoe: 5,
				damageMultiplier: 1,
				cost: 50
			}
		]
	}
];
