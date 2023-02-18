export interface Skill {
	name: string;
	aoe: number;
	damageMultiplier: number;
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
