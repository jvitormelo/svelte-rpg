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

export type CombatEntity = (ICharacterEntity | IEnemyEntity) & Position;

type AllEntities = ICharacterEntity | IEnemyEntity | EmptyEntity | TerrainEntity;

export type EnemyType = AllEntities['type'];

export type Position = {
	position: {
		x: number;
		y: number;
	};
};
export type GameEntity = AllEntities & Position;

export type CharacterGameEntity = ICharacterEntity & Position;

export type MoveableEntity = ICharacterEntity | IEnemyEntity;
