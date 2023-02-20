import { applyDamageToEntity } from 'src/store/actions/apply-damage';
import type { Game } from 'src/store/game/game';
import type {
	EntityType,
	GameCharacterEntity,
	GameEnemyEntity,
	GameEntity,
	GameEntityWithCharacter
} from 'src/types/game';
import type { Skill } from 'src/types/types';
import { createSkillDamage } from './create-skill-damage';

type PossibleEntities = GameCharacterEntity | GameEnemyEntity | GameEntity;

export class GameDomain {
	constructor(private game: Game) {}

	findAll<T extends PossibleEntities>(type: EntityType) {
		const flatted = this.game.flat(2);

		const filteredResults = flatted.filter((entity) => entity.type === type);

		return filteredResults as T[];
	}

	findEntity<T extends PossibleEntities>(type: EntityType) {
		const flatted = this.game.flat(2);

		return flatted.find((entity) => entity.type === type) as T;
	}

	findCharacter<T extends GameEntityWithCharacter>(
		id?: string | null
	): GameEntityWithCharacter | undefined {
		if (!id) return;
		const flatted = this.game.flat(2);

		return flatted.find((entity) => 'character' in entity && entity.character.id === id) as T;
	}

	useSkillOnTarget(skill: Skill, caster: GameEntityWithCharacter, target: GameEntityWithCharacter) {
		const damage = createSkillDamage(skill, caster);
		const entity = applyDamageToEntity(damage, target);

		this.game[entity.position.x][entity.position.y] = entity;
	}
}
