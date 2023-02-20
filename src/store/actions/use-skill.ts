import type { CharacterGameEntity } from 'src/games-type';
import { isBetween } from 'src/lib/utils/between';
import { getDistance } from 'src/lib/utils/get-distance';
import type { Skill } from 'src/types';
import { removeActionsPoints } from '../game/action-points';
import { game } from '../game/game';
import { deselectSkill } from '../game/skill';
import { playSkillAnimation } from '../game/skill-animation';
import { playSkillSound } from '../game/skill-sound';
import { applyDamage } from './apply-damage';
import { createSkillDamage } from './create-skill-damage';

export const useSkill = async (skill: Skill, entity: CharacterGameEntity) => {
	if (skill.audio) {
		playSkillSound(skill.audio.onCast);
		await playSkillAnimation(1000);
	}
	game.update((value) => {
		const clone = structuredClone(value);

		const { x, y } = entity.position;
		const { aoe } = skill;

		for (let i = 0; i < clone.length; i++) {
			const row = clone[i];

			for (let j = 0; j < row.length; j++) {
				const isBet = isBetween(i, x - aoe, x + aoe) && isBetween(j, y - aoe, y + aoe);

				if (isBet) {
					const entity = row[j];

					if (entity.type === 'enemy') {
						clone[i][j] = applyDamage(createSkillDamage(skill, entity), entity);
					}
				}
			}
		}

		return clone;
	});
	deselectSkill();
	removeActionsPoints(skill.cost);
};
