import { GameDomain } from 'src/domain/game-domain';
import { isBetween } from 'src/lib/utils/between';
import type { GameEnemyEntity, GameEntityWithCharacter } from 'src/types/game';

import type { Skill } from 'src/types/types';
import { createSkillDamage } from '../../domain/create-skill-damage';
import { removeActionsPoints } from '../game/action-points';
import { game } from '../game/game';
import { deselectSkill } from '../game/skill';
import { playSkillAnimation } from '../game/skill-animation';
import { playSkillSound } from '../game/skill-sound';
import { applyDamageToEntity } from './apply-damage';

// Need to refactor skills
export const useSkill = async (
	skill: Skill,
	caster: GameEntityWithCharacter,
	target?: GameEntityWithCharacter
) => {
	if (skill.audio) {
		playSkillSound(skill.audio.onCast);
		await playSkillAnimation({
			duration: 1000,
			image: caster.character.image,
			name: skill.name
		});
	}
	game.update((value) => {
		const clone = structuredClone(value);

		const { x, y } = caster.position;

		if (
			skill.area.type === 'single' &&
			target &&
			isInSkillArea(skill, target.position.x - x, target.position.y - y)
		) {
			const damage = createSkillDamage(skill, caster);
			clone[target.position.x][target.position.y] = applyDamageToEntity(damage, target);

			return clone;
		}

		const allEnemies = new GameDomain(clone).findAll<GameEnemyEntity>('enemy');

		allEnemies.forEach((enemy) => {
			const { x: enemyX, y: enemyY } = enemy.position;

			if (isInSkillArea(skill, enemyX - x, enemyY - y)) {
				const damage = createSkillDamage(skill, caster);
				clone[enemyX][enemyY] = applyDamageToEntity(damage, enemy);
			}
		});

		return clone;
	});
	deselectSkill();
	removeActionsPoints(skill.cost);
};

export function isInSkillArea(skill: Skill, x: number, y: number) {
	const { area } = skill;
	const { range } = area;

	return isBetween(x, -range, range) && isBetween(y, -range, range);
}
