import { isBetween } from 'src/lib/utils/between';
import { Random } from 'src/lib/utils/random';
import type { GameEntity, GameEntityWithCharacter } from 'src/types/game';
import type { Skill } from 'src/types/types';
import { NavigationDomain } from './navigation';

export class CombatDomain {
	static calculateSkillDamage(skill: Skill, caster: GameEntityWithCharacter): number {
		return skill.damageMultiplier * caster.character.attack;
	}

	static isInSkillRange(selectedSkill: Skill, caster: GameEntity, target: GameEntity) {
		const aoe = selectedSkill.area.range;
		const casterPosition = caster.position;
		const targetPosition = target.position;

		return (
			isBetween(targetPosition.x, casterPosition.x - aoe, casterPosition.x + aoe) &&
			isBetween(targetPosition.y, casterPosition.y - aoe, casterPosition.y + aoe)
		);
	}

	static applyDamageToEntity(
		damage: number,
		targetedEntity: GameEntityWithCharacter
	): GameEntityWithCharacter {
		const clone = structuredClone(targetedEntity);

		const actualDamage = damage - clone.character.defense;

		this.createDamageVisual(actualDamage, clone.character.id);

		clone.character.currentHealth = clone.character.currentHealth - actualDamage;

		return clone;
	}

	static createDamageVisual(damage: number, entityId: string) {
		const div = document.createElement('div');

		const { x, y } = NavigationDomain.getEntityAbsolutePosition(entityId);

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
}
