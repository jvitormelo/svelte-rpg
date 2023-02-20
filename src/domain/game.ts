import type { Game } from 'src/store/game/game';
import type {
	EntityType,
	GameCharacterEntity,
	GameEnemyEntity,
	GameEntity,
	GameEntityWithCharacter
} from 'src/types/game';

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
}
