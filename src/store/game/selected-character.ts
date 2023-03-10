import { derived, writable } from 'svelte/store';
import type { ICharacterEntity } from '../../types/game';
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

export const isPlayerDead = derived(
	selectedCharacter,
	(value) => {
		if (!value) return false;
		return value.currentHealth <= 0;
	},
	false
);
