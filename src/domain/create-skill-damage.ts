import type { CombatEntity } from 'src/games-type';
import type { Skill } from 'src/types';

export const createSkillDamage = (skill: Skill, caster: CombatEntity): number => {
	return skill.damageMultiplier * caster.character.attack;
};
