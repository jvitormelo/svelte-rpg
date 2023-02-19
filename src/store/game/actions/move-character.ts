import type { MoveableEntity } from '../../../games-type';
import { game } from '../game';

export const moveEntity = (x: number, y: number, entity: MoveableEntity) => {
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
};
