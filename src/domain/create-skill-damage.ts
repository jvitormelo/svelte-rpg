import type { GameEntityWithCharacter } from 'src/types/game';
import type { Skill } from 'src/types/types';

export const createSkillDamage = (skill: Skill, caster: GameEntityWithCharacter): number => {
	return skill.damageMultiplier * caster.character.attack;
};
