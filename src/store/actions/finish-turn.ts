import { CombatDomain } from 'src/domain/combat';
import { GameDomain } from 'src/domain/game';
import { NavigationDomain } from 'src/domain/navigation';
import { getDistance } from 'src/lib/utils/get-distance';
import type { GameCharacterEntity, GameEnemyEntity } from 'src/types/game';
import { addActionsPoints } from '../game/action-points';
import { game } from '../game/game';
import { spawnSound } from '../game/skill-sound';

export const finishTurn = () => {
	game.update((value) => {
		const clonedGame = structuredClone(value);

		const gameDomain = new GameDomain(clonedGame);

		const allEnemies = gameDomain.findAll<GameEnemyEntity>('enemy');

		allEnemies.forEach((entity) => {
			const player = gameDomain.findEntity<GameCharacterEntity>('character');

			const distance = getDistance(
				entity.position.x,
				entity.position.y,
				player.position.x,
				player.position.y
			);

			const MOB_ATTACK_RANGE = 1;

			if (distance === MOB_ATTACK_RANGE) {
				const skill = entity.character.skills[0];

				if (skill.audio?.onCast) spawnSound(skill.audio?.onCast);

				CombatDomain.useSkillOnTarget(skill, entity, player, clonedGame);

				return;
			}

			const newPosition = NavigationDomain.findClosestPath(
				entity.position,
				player.position,
				clonedGame
			);

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
					character: entity.character,
					previousPosition: entity.position
				};
			}
		});

		return clonedGame;
	});

	addActionsPoints(100);
};
