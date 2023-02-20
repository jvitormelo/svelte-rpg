import { GameDomain } from 'src/domain/game';
import { get, writable } from 'svelte/store';
import type { GameEntityWithCharacter } from '../../types/game';
import type { Skill } from '../../types/types';
import { game } from './game';
import { playSkillSound, stopSkillSound } from './skill-sound';

type State = {
	skill: Skill;
	character: GameEntityWithCharacter;
} | null;

export const selectedSkill = writable<State>(null);

export const selectSkill = (skill: Skill, characterId: string) => {
	if (skill.audio && skill.audio.onSelect) {
		playSkillSound(skill.audio.onSelect);
	}

	const character = new GameDomain(get(game)).findCharacter(characterId);

	if (character) {
		selectedSkill.set({ skill, character });
	}
};

export const deselectSkill = () => {
	selectedSkill.set(null);

	stopSkillSound();
};
