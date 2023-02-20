import type { Game } from 'src/store/game/game';
import type { EntityType, GameEntityWithCharacter } from 'src/types/game';

export class GameDomain {
	private game: Game;

	constructor(game: Game) {
		this.game = structuredClone(game);
	}

	getAll(type: EntityType) {
		const flatted = this.game.flat(2);

		return flatted.filter((entity) => entity.type === type);
	}

	findCharacter<T extends GameEntityWithCharacter>(
		id: string
	): GameEntityWithCharacter | undefined {
		const flatted = this.game.flat(2);

		return flatted.find((entity) => 'character' in entity && entity.character.id === id) as T;
	}
}
