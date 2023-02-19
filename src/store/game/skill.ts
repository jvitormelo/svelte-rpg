import { writable } from 'svelte/store';
import type { CharacterGameEntity } from '../../games-type';
import type { Character, Skill } from '../../types';

type State = {
	skill: Skill;
	character: CharacterGameEntity;
} | null;

export const selectedSkill = writable<State>(null);

export const selectSkill = (skill: Skill, character: CharacterGameEntity) => {
	selectedSkill.set({ skill, character });
};

export const deselectSkill = () => {
	selectedSkill.set(null);
};
