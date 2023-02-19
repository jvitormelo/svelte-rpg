import Shadow from '$lib/assets/characters/shadow.png';
import Atomic from '$lib/assets/skills/atomic.jpg';
import ShadowOST from '$lib/assets/audio/shadow.mp3';
import AtomicOST from '$lib/assets/audio/atomic-cut.mp3';

export const availableCharacters = [
	{
		name: 'Shadow',
		image: Shadow,
		attack: 5,
		health: 20,
		defense: 5,
		description: 'The ultimate being.',
		skills: [
			{
				icon: Atomic,
				name: "I'm atomic",
				aoe: 5,
				damageMultiplier: 5,
				cost: 50,
				audio: {
					onSelect: ShadowOST,
					onCast: AtomicOST
				}
			}
		]
	}
];
