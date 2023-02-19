import { derived, writable } from 'svelte/store';
import type { ICharacterEntity } from '../../games-type';
import { game } from './game';

export const selectedCharacterId = writable<string | null>(null);

export const selectCharacter = (characterId: string) => {
	selectedCharacterId.set(characterId);
};

export const selectedCharacter = derived(
	[selectedCharacterId, game],
	([$selectedCharacterId, $game]) => {
		if (!$selectedCharacterId || !$game) return null;

		const foundGameEntity = $game
			.flat(2)
			.find(
				(entity) => entity.type === 'character' && entity.character.id === $selectedCharacterId
			) as ICharacterEntity | undefined;

		if (!foundGameEntity) return null;

		return foundGameEntity.character;
	},
	null
);
