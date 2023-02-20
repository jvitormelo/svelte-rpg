import type { Character, Enemy, Terrain } from './types';

type Virtual = {
	currentHealth: number;
};

export type VirtualCharacter = Character & Virtual;

export type VirtualEnemy = Enemy & Virtual;

export interface ICharacterEntity {
	type: 'character';
	character: VirtualCharacter;
}

export interface IEnemyEntity {
	type: 'enemy';
	character: VirtualEnemy;
}

interface EmptyEntity {
	type: 'empty';
}

interface TerrainEntity {
	type: 'terrain';
	terrain: Terrain;
}

type AllEntities = ICharacterEntity | IEnemyEntity | EmptyEntity | TerrainEntity;

export type EntityType = AllEntities['type'];

export type GameEntity = AllEntities & Position;

export type GameEntityWithCharacter = (ICharacterEntity | IEnemyEntity) & Position;

export type Position = {
	position: {
		x: number;
		y: number;
	};
};
