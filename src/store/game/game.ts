import { writable } from 'svelte/store';
import type { GameEntity } from '../../games-type';
import type { Character } from '../../types';
import { selectedCharacter } from '../selected-chacter';

export const isGameStarted = writable(false);

type Game = GameEntity[][];

export const game = writable<Game>([[]]);

export const startGame = (character: Character) => {
	const startPosition = {
		x: 3,
		y: 2
	};

	selectedCharacter.set(character);
	const newGame: Game = [];
	for (let i = 0; i < 8; i++) {
		const row: GameEntity[] = [];

		for (let j = 0; j < 8; j++) {
			const position = {
				x: i,
				y: j
			};

			if (i === startPosition.x && j === startPosition.y) {
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

	console.log('a');

	isGameStarted.set(true);
};
