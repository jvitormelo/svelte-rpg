import Shadow from '$lib/assets/characters/shadow.png';

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
				name: "I'm atomic",
				aoe: Number.MAX_SAFE_INTEGER,
				damageMultiplier: 1
			}
		]
	}
];
