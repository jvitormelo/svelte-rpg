import { isBetween } from 'src/lib/utils/between';
import type { GameEntity } from 'src/types/game';
import type { Skill } from 'src/types/types';

export function isInSkillRange(selectedSkill: Skill, caster: GameEntity, target: GameEntity) {
	const aoe = selectedSkill.area.range;
	const casterPosition = caster.position;
	const targetPosition = target.position;

	return (
		isBetween(targetPosition.x, casterPosition.x - aoe, casterPosition.x + aoe) &&
		isBetween(targetPosition.y, casterPosition.y - aoe, casterPosition.y + aoe)
	);
}
