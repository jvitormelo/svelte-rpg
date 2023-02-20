import { getEntityPosition } from 'src/domain/get-entity-position';
import type { CombatEntity } from 'src/games-type';

import { Random } from 'src/lib/utils/random';

export interface CustomDamageEvent {
	damage: number;
	entityId: string;
}

export const applyDamage = (damage: number, targetedEntity: CombatEntity): CombatEntity => {
	const clone = structuredClone(targetedEntity);

	const actualDamage = damage - clone.character.defense;

	createDamageVisual(actualDamage, clone.character.id);

	return {
		...clone,
		character: {
			...clone.character,
			currentHealth: clone.character.currentHealth - actualDamage
		}
	};
};

function createDamageVisual(damage: number, entityId: string) {
	const div = document.createElement('div');

	const { x, y } = getEntityPosition(entityId);

	const randomX = Random.generateRandomNumber(0, 60);
	const randomY = Random.generateRandomNumber(0, 60);

	div.innerText = `-${damage}`;
	div.classList.add('damage-taken');
	div.style.left = `${x - randomX}px`;

	div.style.top = `${y - randomY}px`;

	window.document.body.appendChild(div);

	setTimeout(() => {
		div.remove();
	}, 1000);
}
