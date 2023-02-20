import type { SkillsAnimations } from './skill';

export type SkillAreaType = 'circle' | 'line' | 'single';

export interface Skill {
	name: string;
	area: {
		type: SkillAreaType;
		range: number;
	};
	damageMultiplier: number;
	icon: string;
	cost: number;
	animation?: SkillsAnimations | null;
	audio: {
		onSelect?: string | null;
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

export type Position = {
	position: {
		x: number;
		y: number;
	};
};
