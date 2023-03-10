import { enemies } from 'src/data/enemies';

import { generateId } from 'src/lib/utils/generate-id';
import { Random } from 'src/lib/utils/random';
import type { GameEntity } from 'src/types/game';
import type { Character } from 'src/types/types';

import { game, type Game } from '../game/game';
import { selectCharacter } from '../game/selected-character';

const ROW_LENGTH = 7;
const COLUMN_LENGTH = 7;

const enemyPositions = [
	{
		x: 0,
		y: 0
	},
	{
		x: 0,
		y: 3
	}
];

export const startGame = (character: Character) => {
	const startPosition = {
		x: 3,
		y: 2
	};

	const newGame: Game = [];

	for (let i = 0; i < ROW_LENGTH; i++) {
		const row: GameEntity[] = [];

		for (let j = 0; j < COLUMN_LENGTH; j++) {
			const position = {
				x: i,
				y: j
			};

			const foundEnemy = enemyPositions.find(
				(enemyPosition) => enemyPosition.x === i && enemyPosition.y === j
			);

			if (foundEnemy) {
				const enemy = Random.pick(enemies);
				row.push({
					character: { ...enemy, id: generateId(), currentHealth: enemies[0].health },
					type: 'enemy',
					position
				});
			} else if (i === startPosition.x && j === startPosition.y) {
				row.push({
					type: 'character',
					character: {
						...character,
						currentHealth: character.health
					},
					position
				});
			} else {
				row.push({
					type: 'empty',
					position
				});
			}
		}

		newGame.push(row);
	}

	game.set(newGame);

	selectCharacter(character.id);
};
