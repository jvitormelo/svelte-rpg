import type { CombatEntity } from 'src/games-type';
import { writable } from 'svelte/store';

interface DamageHistory {
	damage: number;
	entity: CombatEntity;
}

export const damageHistory = writable<DamageHistory[]>([]);
