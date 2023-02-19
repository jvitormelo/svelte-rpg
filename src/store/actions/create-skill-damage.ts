import type { CombatEntity } from 'src/games-type';
import type { Skill } from 'src/types';

export const createSkillDamage = (skill: Skill, entity: CombatEntity): number => {
	return skill.damageMultiplier * entity.character.attack;
};
