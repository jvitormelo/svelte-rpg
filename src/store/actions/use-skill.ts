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
import { createSkillDamage } from '../../domain/create-skill-damage';

// Need to refactor skills
export const useSkill = async (skill: Skill, caster: CharacterGameEntity) => {
	if (skill.audio) {
		playSkillSound(skill.audio.onCast);
		await playSkillAnimation(1000);
	}
	game.update((value) => {
		const clone = structuredClone(value);

		const { x, y } = caster.position;
		const { aoe } = skill;

		for (let i = 0; i < clone.length; i++) {
			const row = clone[i];

			for (let j = 0; j < row.length; j++) {
				const between = isBetween(i, x - aoe, x + aoe) && isBetween(j, y - aoe, y + aoe);

				if (between) {
					const entity = row[j];

					if (entity.type === 'enemy') {
						const damage = createSkillDamage(skill, caster);
						clone[i][j] = applyDamage(damage, entity);
					}
				}
			}
		}

		return clone;
	});
	deselectSkill();
	removeActionsPoints(skill.cost);
};
