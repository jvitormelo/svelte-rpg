import type { CombatEntity } from 'src/games-type';
import { damageHistory } from '../game/damage-history';

export interface CustomDamageEvent {
	damage: number;
	entityId: string;
}

export const applyDamage = (damage: number, entity: CombatEntity): CombatEntity => {
	const clone = structuredClone(entity);

	const actualDamage = damage - clone.character.defense;

	const damageEvent = new CustomEvent<CustomDamageEvent>('damage-taken', {
		detail: {
			damage: actualDamage,
			entityId: clone.character.id
		}
	});

	dispatchEvent(damageEvent);

	damageHistory.update((value) => [
		...value,
		{
			damage: actualDamage,
			entity: clone
		}
	]);

	return {
		...clone,
		character: {
			...clone.character,
			currentHealth: clone.character.currentHealth - actualDamage
		}
	};
};
