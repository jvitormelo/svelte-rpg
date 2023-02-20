import Shadow from '$lib/assets/characters/shadow.png';
import Atomic from '$lib/assets/skills/atomic.jpg';
import ShadowOST from '$lib/assets/audio/shadow.mp3';
import AtomicOST from '$lib/assets/audio/atomic-cut.mp3';
import type { Character } from 'src/types/types';

export const availableCharacters: Omit<Character, 'id'>[] = [
	{
		name: 'Shadow',
		image: Shadow,
		attack: Number.MAX_SAFE_INTEGER,
		health: Number.MAX_SAFE_INTEGER,
		defense: 5,
		description: 'The ultimate being.',
		skills: [
			{
				icon: Atomic,
				name: "I'm atomic",
				area: {
					range: 3,
					type: 'circle'
				},
				damageMultiplier: 5,
				cost: 50,
				audio: {
					onSelect: ShadowOST,
					onCast: AtomicOST
				},
				animation: 'atomic'
			},
			{
				icon: 'https://th.bing.com/th/id/R.cf78e0f9643d7cb539aa99a548ffba37?rik=cLdDmAwoyIzskA&riu=http%3a%2f%2fpluspng.com%2fimg-png%2fpng-sword-sword-png-image-1920.png&ehk=WkOtrPWT%2bzG6UqBRIhAWLvuGh7SRQDo41B%2fs39cLuRY%3d&risl=&pid=ImgRaw&r=0',
				name: 'Sword attack',
				area: {
					range: 1,
					type: 'single'
				},
				damageMultiplier: 1.1,
				cost: 50,
				audio: null,
				animation: null
			}
		]
	}
];
