import { game } from '../game/game';

export const finishTurn = () => {
	game.update((value) => {
		const clonedGame = structuredClone(value);

		const allEnemies = clonedGame.flat(2).filter((entity) => entity.type === 'enemy');

		const enemiesMovement = allEnemies.map((entity) => {
			if (entity.type === 'enemy') {
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
			}
		});

		enemiesMovement.forEach((movement) => {
			if (!movement) return;

			console.log('a');

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

		return clonedGame;
	});
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
