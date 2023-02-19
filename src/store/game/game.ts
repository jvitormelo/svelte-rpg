import { writable } from 'svelte/store';
import { enemies } from '../../data/enemies';
import type { GameEntity } from '../../games-type';
import { generateId } from '../../lib/utils/generate-id';
import type { Character } from '../../types';
import { selectedCharacter } from '../selected-character';

export const isGameStarted = writable(false);

type Game = GameEntity[][];

export const game = writable<Game>([[]]);

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

const ROW_LENGTH = 4;
const COLUMN_LENGTH = 4;

export const startGame = (character: Character) => {
	const startPosition = {
		x: 3,
		y: 2
	};

	selectedCharacter.set(character);

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
					character: { ...enemies[0], id: generateId() },
					type: 'enemy',
					position
				});
			} else if (i === startPosition.x && j === startPosition.y) {
				row.push({
					type: 'character',
					character: character,
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

	isGameStarted.set(true);
};
