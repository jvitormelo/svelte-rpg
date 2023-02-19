import { writable } from 'svelte/store';
import type { CharacterGameEntity } from '../../games-type';
import type { Skill } from '../../types';
import { playSkillSound, stopSkillSound } from './skill-sound';

type State = {
	skill: Skill;
	character: CharacterGameEntity;
} | null;

export const selectedSkill = writable<State>(null);

export const selectSkill = (skill: Skill, character: CharacterGameEntity) => {
	if (skill.audio) {
		playSkillSound(skill.audio.onSelect);
	}

	selectedSkill.set({ skill, character });
};

export const deselectSkill = () => {
	selectedSkill.set(null);

	stopSkillSound();
};
