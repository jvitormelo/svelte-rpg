import type { EntityType } from 'src/games-type';
import type { Game } from 'src/store/game/game';

export class GameDomain {
	private game: Game;

	constructor(game: Game) {
		this.game = structuredClone(game);
	}

	getAll(type: EntityType) {
		const flatted = this.game.flat(2);

		return flatted.filter((entity) => entity.type === type);
	}

	findCharacter(id: string) {
		const flatted = this.game.flat(2);

		return flatted.find((entity) => 'character' in entity && entity.character.id === id);
	}
}
