import { enemies } from '../../../data/enemies';
import type { GameEntity } from '../../../games-type';
import { generateId } from '../../../lib/utils/generate-id';
import type { Character } from '../../../types';
import { selectCharacter } from '../../selected-character';
import { game, isGameStarted, type Game } from '../game';

const ROW_LENGTH = 5;
const COLUMN_LENGTH = 5;

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
				row.push({
					character: { ...enemies[0], id: generateId(), currentHealth: enemies[0].health },
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

	isGameStarted.set(true);
};
