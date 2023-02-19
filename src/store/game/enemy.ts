import { writable } from 'svelte/store';
import type { Enemy } from '../../types';

export const selectedEnemy = writable<Enemy | null>(null);

export const selectEnemy = (enemy: Enemy) => {
	selectedEnemy.set(enemy);
};

export const deselectEnemy = () => {
	selectedEnemy.set(null);
};
