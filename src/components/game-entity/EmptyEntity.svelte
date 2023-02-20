<script lang="ts">
	import { MOVE_COST } from 'src/constants';
	import { isInSkillRange } from 'src/domain/is-in-skill-range';
	import { moveEntity } from 'src/store/actions/move-character';
	import { useSkill } from 'src/store/actions/use-skill';
	import { actionPoints } from 'src/store/game/action-points';
	import { currentDragging } from 'src/store/game/drag';
	import { selectedSkill } from 'src/store/game/skill';
	import type { GameEntity } from 'src/types/game';

	export let entity: GameEntity;

	$: position = entity.position;

	$: inSkillArea = $selectedSkill
		? isInSkillRange($selectedSkill.skill, $selectedSkill.character, entity)
		: false;

	$: moveable =
		$actionPoints >= MOVE_COST
			? $currentDragging
				? ($currentDragging?.position.x + 1 === position.x &&
						$currentDragging?.position.y === position.y) ||
				  ($currentDragging?.position.x + -1 === position.x &&
						$currentDragging?.position.y === position.y) ||
				  ($currentDragging?.position.x === position.x &&
						$currentDragging?.position.y + 1 === position.y) ||
				  ($currentDragging?.position.x === position.x &&
						$currentDragging?.position.y + -1 === position.y)
				: false
			: false;

	function handleDrop() {
		if (!moveable || !$currentDragging) return;

		moveEntity(position.x, position.y, $currentDragging.entityId);

		currentDragging.set(null);
	}

	$: background = moveable
		? 'rgba(0, 255, 0, 0.3)'
		: inSkillArea
		? 'rgba(255, 191, 255, 0.7)'
		: 'rgba(0, 191, 255, 0.3)';

	function handleClick() {
		if ($currentDragging) {
			return handleDrop();
		}

		if ($selectedSkill && $selectedSkill.skill.area.type !== 'single') {
			useSkill($selectedSkill.skill, $selectedSkill.character);
		}
	}
</script>

<div
	on:click={handleClick}
	on:dragstart|preventDefault
	on:drop|preventDefault={handleDrop}
	draggable={false}
	class="glass-background rounded-md"
	style="background-color: {background}; cursor: {inSkillArea ? 'pointer' : 'default'};"
/>

<style>
	.glass-background {
		background-color: rgba(0, 191, 255, 0.3); /* semi-transparent blue background */
		backdrop-filter: blur(10px) saturate(120%);
	}
</style>
