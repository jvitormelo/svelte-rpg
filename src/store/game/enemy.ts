import { writable } from 'svelte/store';

export const selectedEnemyId = writable<string | null>(null);

export const selectEnemy = (enemyId: string) => {
	selectedEnemyId.set(enemyId);
};

export const deselectEnemy = () => {
	selectedEnemyId.set(null);
};
