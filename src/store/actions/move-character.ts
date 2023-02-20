import { MOVE_COST } from 'src/constants';
import { GameDomain } from 'src/domain/game';
import { get } from 'svelte/store';
import { actionPoints, removeActionsPoints } from '../game/action-points';
import { game } from '../game/game';

export const moveEntity = (x: number, y: number, entityId: string) => {
	// good idea
	// const haveEnergy = get(actionPoints) >= entity.character.moveCost;
	const haveEnergy = get(actionPoints) >= MOVE_COST;

	if (!haveEnergy) {
		return alert("You don't have enough energy to move!");
	}

	game.update((game) => {
		const clone = structuredClone(game);

		const entity = new GameDomain(clone).findCharacter(entityId);

		if (!entity) {
			throw new Error('Entity not found');
		}

		clone[entity.position.x][entity.position.y] = {
			type: 'empty',
			position: {
				x: entity.position.x,
				y: entity.position.y
			}
		};

		const position = {
			x,
			y
		};

		if (entity.type === 'character') {
			clone[x][y] = {
				type: 'character',
				character: entity.character,
				position
			};
		} else if (entity.type === 'enemy') {
			clone[x][y] = {
				type: 'enemy',
				character: entity.character,
				position
			};
		}

		return clone;
	});

	removeActionsPoints(MOVE_COST);
};
