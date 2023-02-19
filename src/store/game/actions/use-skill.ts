import type { CharacterGameEntity } from '../../../games-type';
import { isBetween } from '../../../lib/utils/between';
import type { Skill } from '../../../types';
import { removeActionsPoints } from '../action-points';
import { game } from '../game';
import { deselectSkill } from '../skill';

export const useSkill = (skill: Skill, character: CharacterGameEntity) => {
	game.update((value) => {
		const clone = structuredClone(value);

		const { x, y } = character.position;
		const { aoe } = skill;

		for (let i = 0; i < clone.length; i++) {
			const row = clone[i];

			for (let j = 0; j < row.length; j++) {
				const isBet = isBetween(i, x - aoe, x + aoe) && isBetween(j, y - aoe, y + aoe);

				if (isBet) {
					const entity = row[j];

					if (entity.type === 'enemy') {
						clone[i][j] = {
							...entity,
							character: {
								...entity.character,
								currentHealth:
									entity.character.currentHealth -
									character.character.attack * skill.damageMultiplier
							}
						};
					}
				}
			}
		}

		return clone;
	});
	deselectSkill();
	removeActionsPoints(skill.cost);
};
