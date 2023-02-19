export function getDistance(
	enemyX: number,
	enemyY: number,
	entityX: number,
	entityY: number
): number {
	return Math.abs(entityX - enemyX) + Math.abs(entityY - enemyY);
}
