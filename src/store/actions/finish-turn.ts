import { findClosestPath } from 'src/domain/enemy-navigation';
import { GameDomain } from 'src/domain/game-domain';
import { getDistance } from 'src/lib/utils/get-distance';
import type { GameEnemyEntity, GameCharacterEntity } from 'src/types/game';
import { createSkillDamage } from '../../domain/create-skill-damage';
import { addActionsPoints } from '../game/action-points';
import { game } from '../game/game';
import { applyDamageToEntity } from './apply-damage';

export const finishTurn = () => {
	game.update((value) => {
		const clonedGame = structuredClone(value);

		const gameDomain = new GameDomain(clonedGame);

		const player = gameDomain.findEntity<GameCharacterEntity>('character');

		if (!player) return clonedGame;

		const allEnemies = gameDomain.findAll<GameEnemyEntity>('enemy');

		allEnemies.forEach((entity) => {
			if (entity.character.currentHealth <= 0) return;

			const distance = getDistance(
				entity.position.x,
				entity.position.y,
				player.position.x,
				player.position.y
			);

			const MOB_ATTACK_RANGE = 1;

			if (distance === MOB_ATTACK_RANGE) {
				const damage = createSkillDamage(entity.character.skills[0], entity);

				clonedGame[player.position.x][player.position.y] = applyDamageToEntity(damage, player);

				return;
			}

			const newPosition = findClosestPath(entity.position, player.position, clonedGame);

			if (newPosition) {
				clonedGame[entity.position.x][entity.position.y] = {
					type: 'empty',
					position: {
						x: entity.position.x,
						y: entity.position.y
					}
				};

				clonedGame[newPosition.x][newPosition.y] = {
					type: 'enemy',
					position: {
						x: newPosition.x,
						y: newPosition.y
					},
					character: entity.character
				};
			}
		});

		return clonedGame;
	});

	addActionsPoints(100);
};
