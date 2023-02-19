import type { CombatEntity } from 'src/games-type';

export const applyDamage = (damage: number, entity: CombatEntity): CombatEntity => {
	const clone = structuredClone(entity);

	const actualDamage = damage - clone.character.defense;

	return {
		...clone,
		character: {
			...clone.character,
			currentHealth: clone.character.currentHealth - actualDamage
		}
	};
};
