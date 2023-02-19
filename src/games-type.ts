import type { Character, Enemy, Terrain } from './types';

export interface ICharacterEntity {
	type: 'character';
	character: Character;
}

export interface IEnemyEntity {
	type: 'enemy';
	character: Enemy;
}

interface EmptyEntity {
	type: 'empty';
}

interface TerrainEntity {
	type: 'terrain';
	terrain: Terrain;
}

type AllEntities = ICharacterEntity | IEnemyEntity | EmptyEntity | TerrainEntity;

export type Position = {
	position: {
		x: number;
		y: number;
	};
};
export type GameEntity = AllEntities & Position;

export type CharacterGameEntity = ICharacterEntity & Position;

export type MoveableEntity = ICharacterEntity | IEnemyEntity;
