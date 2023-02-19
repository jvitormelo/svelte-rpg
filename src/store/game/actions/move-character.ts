import { get } from 'svelte/store';
import { MOVE_COST } from '../../../constants';
import type { MoveableEntity } from '../../../games-type';
import { actionPoints } from '../action-points';
import { game } from '../game';

export const moveEntity = (x: number, y: number, entity: MoveableEntity) => {
	// good idea
	// const haveEnergy = get(actionPoints) >= entity.character.moveCost;
	const haveEnergy = get(actionPoints) >= MOVE_COST;

	if (!haveEnergy) {
		return alert("You don't have enough energy to move!");
	}

	game.update((game) => {
		const clone = structuredClone(game);

		const oldEntity = clone
			.flat(2)
			.find(
				(rowEntity) => 'character' in rowEntity && rowEntity.character.id === entity.character.id
			);

		if (oldEntity) {
			clone[oldEntity.position.x][oldEntity.position.y] = {
				type: 'empty',
				position: {
					x: oldEntity.position.x,
					y: oldEntity.position.y
				}
			};
		}

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

	actionPoints.update((actionPoints) => actionPoints - MOVE_COST);
};
