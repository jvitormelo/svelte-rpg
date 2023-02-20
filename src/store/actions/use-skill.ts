import { CombatDomain } from 'src/domain/combat';
import { GameDomain } from 'src/domain/game';
import type { GameEnemyEntity, GameEntityWithCharacter } from 'src/types/game';
import type { Skill } from 'src/types/types';
import { removeActionsPoints } from '../game/action-points';
import { game } from '../game/game';
import { deselectSkill } from '../game/skill';
import { playSkillAnimation } from '../game/skill-animation';
import { playSkillSound } from '../game/skill-sound';

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

		const gameDomain = new GameDomain(clone);

		if (
			skill.area.type === 'single' &&
			target &&
			CombatDomain.isInSkillRange(skill, caster, target)
		) {
			gameDomain.useSkillOnTarget(skill, caster, target);

			return clone;
		}

		const allEnemies = gameDomain.findAll<GameEnemyEntity>('enemy');

		allEnemies.forEach((enemy) => {
			if (CombatDomain.isInSkillRange(skill, caster, enemy)) {
				gameDomain.useSkillOnTarget(skill, caster, enemy);
			}
		});

		return clone;
	});

	deselectSkill();
	removeActionsPoints(skill.cost);
};
