import punch from '$lib/assets/audio/punch-sound.mp3';
import type { Enemy } from 'src/types/types';
export const enemies: Omit<Enemy, 'id'>[] = [
	{
		attack: 10,
		defense: 10,
		description: 'eak enemy.',
		health: 10,
		image:
			'https://th.bing.com/th/id/R.25c366e442224b429c2a0f090a532c7a?rik=zTNoE2gT%2f47RTA&pid=ImgRaw&r=0',
		name: 'Goblin',
		skills: [
			{
				damageMultiplier: 1,
				name: 'Goblin Attack',
				area: {
					type: 'single',
					range: 1
				},
				icon: '🐌',
				cost: 50,
				audio: {
					onSelect: null,
					onCast: punch
				}
			}
		]
	},
	{
		attack: 10,
		defense: 10,
		description: 'A small, weak enemy.',
		health: 10,
		image:
			'https://th.bing.com/th/id/R.b4f1ac41b1befbefe6b7a53596bfb88e?rik=BO2FgtBUE9v%2bBA&pid=ImgRaw&r=0',
		name: 'Slime',
		skills: [
			{
				damageMultiplier: 1,
				name: 'Slime Attack',
				area: {
					type: 'single',
					range: 1
				},
				icon: '🐌',
				cost: 50,
				audio: {
					onSelect: null,
					onCast: punch
				}
			}
		]
	}
];
