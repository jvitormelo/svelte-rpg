import type { IEnemyEntity } from 'src/games-type';
import type { Skill } from 'src/types';
import { game } from '../game/game';

export const enemyUseSkill = (enemy: IEnemyEntity, skill: Skill) => {
	game.update((value) => {
		const clonedGame = structuredClone(value);

		const player = clonedGame.flat(2).find((entity) => entity.type === 'character');

		if (!player || player.type !== 'character') return value;

		clonedGame[player.position.x][player.position.y] = {
			...player,
			character: {
				...player.character,
				currentHealth:
					player.character.currentHealth - enemy.character.attack * skill.damageMultiplier
			}
		};

		return clonedGame;
	});
};
