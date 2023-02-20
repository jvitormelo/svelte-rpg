import type { SkillsAnimations } from './types/skill';

export interface Skill {
	name: string;
	aoe: number;
	damageMultiplier: number;
	icon: string;
	cost: number;
	animation?: SkillsAnimations;
	audio: {
		onSelect: string;
		onCast: string;
	} | null;
}

export interface Character {
	id: string;
	name: string;
	image: string;
	attack: number;
	health: number;
	defense: number;
	description: string;
	skills: Skill[];
}

export type Enemy = Character;

export type Terrain = {
	name: string;
	image: string;
};
