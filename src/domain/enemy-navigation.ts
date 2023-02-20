import { getDistance } from 'src/lib/utils/get-distance';
import type { GameEntity } from 'src/types/game';

const allDirections = [
	{ x: -1, y: -1 },
	{ x: -1, y: 0 },
	{ x: -1, y: 1 },
	{ x: 0, y: -1 },
	{ x: 0, y: 1 },
	{ x: 1, y: -1 },
	{ x: 1, y: 0 },
	{ x: 1, y: 1 }
];

export function findClosestPath(
	startPosition: { x: number; y: number },
	endPosition: { x: number; y: number },
	entities: GameEntity[][]
) {
	const { x: startX, y: startY } = startPosition;
	const { x: endX, y: endY } = endPosition;

	let newX = startX;
	let newY = startY;

	if (endX > startX) {
		newX++;
	} else if (startX < endX) {
		newX--;
	}

	if (endY > startY) {
		newY++;
	} else if (endY < startY) {
		newY--;
	}

	if (
		entities[newX][newY] &&
		(entities[newX][newY].type === 'character' || entities[newX][newY].type === 'enemy')
	) {
		const possibleDirections = allDirections
			.map((direction) => ({
				x: startX + direction.x,
				y: startY + direction.y
			}))
			.filter((direction) => {
				if (entities[direction.x] && entities[direction.x][direction.y]) {
					return entities[direction.x][direction.y].type === 'empty';
				}
				return false;
			})
			.map((direction) => ({
				...direction,
				distance: getDistance(direction.x, direction.y, endX, endY)
			}));

		const closestObject = possibleDirections.reduce((closest, current) => {
			return closest.distance < current.distance ? closest : current;
		});

		return {
			x: closestObject.x,
			y: closestObject.y
		};
	}

	return {
		x: newX,
		y: newY
	};
}
