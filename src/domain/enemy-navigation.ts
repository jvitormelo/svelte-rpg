import type { EnemyType } from 'src/games-type';
import { getDistance } from 'src/lib/utils/get-distance';

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
	entities: { type: EnemyType }[][]
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

	if (entities[newX][newY].type === 'character' || entities[newX][newY].type === 'enemy') {
		const possibleDirections = allDirections
			.filter((direction) => {
				const x = startX + direction.x;
				const y = startY + direction.y;

				return entities[x][y].type === 'empty';
			})
			.map((direction) => ({
				x: startX + direction.x,
				y: startY + direction.y,
				distance: getDistance(endX, endY, startX + direction.x, startY + direction.y)
			}));

		console.log(possibleDirections);

		const smallest = Math.min(...possibleDirections.map((direction) => direction.distance));

		const direction = possibleDirections.find((direction) => direction.distance === smallest)!;

		return {
			x: direction.x,
			y: direction.y
		};
	}

	return {
		x: newX,
		y: newY
	};
}
