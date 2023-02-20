import { findClosestPath } from 'src/domain/enemy-navigation';
import type { CombatEntity } from 'src/games-type';
import { getDistance } from 'src/lib/utils/get-distance';
import { addActionsPoints } from '../game/action-points';
import { game } from '../game/game';
import { applyDamage } from './apply-damage';
import { createSkillDamage } from './create-skill-damage';

export const finishTurn = () => {
	game.update((value) => {
		const clonedGame = structuredClone(value);

		const flatted = clonedGame.flat(2);

		const player = flatted.find((entity) => entity.type === 'character') as
			| CombatEntity
			| undefined;

		if (!player) return clonedGame;

		const allEnemies = flatted.filter((entity) => entity.type === 'enemy');

		allEnemies.forEach((entity) => {
			if (entity.type !== 'enemy') return;
			if (entity.character.currentHealth <= 0) return;

			const distance = getDistance(
				entity.position.x,
				entity.position.y,
				player.position.x,
				player.position.y
			);

			if (distance === 1) {
				const damage = createSkillDamage(entity.character.skills[0], entity);

				clonedGame[player.position.x][player.position.y] = applyDamage(damage, player);

				return;
			}

			const newPosition = findClosestPath(entity.position, player.position, clonedGame);

			if (newPosition) {
				clonedGame[entity.position.x][entity.position.y] = {
					type: 'empty',
					position: {
						x: entity.position.x,
						y: entity.position.y
					}
				};

				clonedGame[newPosition.x][newPosition.y] = {
					type: 'enemy',
					position: {
						x: newPosition.x,
						y: newPosition.y
					},
					character: entity.character
				};
			}
		});

		return clonedGame;
	});

	addActionsPoints(100);
};

function findClosestEntity(enemyX: number, enemyY: number, entities: { type: string }[][]) {
	let closestCharacter: [number, number] | null = null;

	for (let row = 0; row < entities.length; row++) {
		for (let col = 0; col < entities[row].length; col++) {
			if (entities[row][col].type === 'character') {
				closestCharacter = [row, col];
			}
		}
	}

	if (closestCharacter) {
		const [closestX, closestY] = closestCharacter;

		if (closestX > enemyX) {
			enemyX++;
		} else if (closestX < enemyX) {
			enemyX--;
		}

		if (closestY > enemyY) {
			enemyY++;
		} else if (closestY < enemyY) {
			enemyY--;
		}
	}

	return [enemyX, enemyY];
}
