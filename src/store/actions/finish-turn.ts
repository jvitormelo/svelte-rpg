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

		const player = flatted.find((entity) => entity.type === 'character');

		if (!player) return clonedGame;

		const allEnemies = flatted.filter((entity) => entity.type === 'enemy');

		const toApplyDamage: { x: number; y: number; damage: number }[] = [];

		const enemiesMovement = allEnemies.map((entity) => {
			if (entity.type !== 'enemy') return;
			if (entity.character.currentHealth <= 0) return;

			const distance = getDistance(
				entity.position.x,
				entity.position.y,
				player.position.x,
				player.position.y
			);

			if (distance === 1) {
				toApplyDamage.push({
					x: player.position.x,
					y: player.position.y,
					damage: createSkillDamage(entity.character.skills[0], entity)
				});
				return null;
			}

			const newPosition = findClosestEntity(entity.position.x, entity.position.y, clonedGame);

			if (newPosition) {
				return {
					oldX: entity.position.x,
					oldY: entity.position.y,
					newX: newPosition[0],
					newY: newPosition[1],
					character: entity.character
				};
			}
		});

		enemiesMovement.forEach((movement) => {
			if (!movement) return;

			clonedGame[movement.oldX][movement.oldY] = {
				type: 'empty',
				position: {
					x: movement.oldX,
					y: movement.oldY
				}
			};

			clonedGame[movement.newX][movement.newY] = {
				type: 'enemy',
				position: {
					x: movement.newX,
					y: movement.newY
				},
				character: movement.character
			};
		});

		toApplyDamage.forEach(({ x, y, damage }) => {
			const ref = clonedGame[x][y] as CombatEntity;
			if ('character' in ref) {
				clonedGame[x][y] = applyDamage(damage, ref);
			}
		});

		return clonedGame;
	});

	addActionsPoints(100);
};

function findClosestEntity(enemyX: number, enemyY: number, entities: { type: string }[][]) {
	let closestEntity: [number, number] | null = null;
	let closestDistance = Infinity;

	for (let row = 0; row < entities.length; row++) {
		for (let col = 0; col < entities[row].length; col++) {
			if (row === enemyY && col === enemyX) {
				continue; // Skip the enemy itself
			}

			if (entities[row][col].type === 'character') {
				const distance = Math.abs(row - enemyY) + Math.abs(col - enemyX);

				if (distance < closestDistance) {
					closestEntity = [col, row];
					closestDistance = distance;
				}
			}
		}
	}

	if (closestEntity) {
		const [closestX, closestY] = closestEntity;

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
