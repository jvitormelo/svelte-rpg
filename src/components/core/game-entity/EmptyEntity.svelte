<script lang="ts">
	import type { Position } from '../../../games-type';
	import { isBetween } from '../../../lib/utils/between';
	import { useSkill } from '../../../store/combat/actions';
	import { moveEntity } from '../../../store/game/actions/move-character';
	import { currentDragging } from '../../../store/game/drag';
	import { selectedSkill } from '../../../store/game/skill';
	import type { Skill } from '../../../types';

	export let position: Position['position'];

	$: inSkillArea = $selectedSkill
		? handleAreaSkill($selectedSkill.skill, $selectedSkill.character.position)
		: false;

	$: moveable = $currentDragging
		? ($currentDragging?.position.x + 1 === position.x &&
				$currentDragging?.position.y === position.y) ||
		  ($currentDragging?.position.x + -1 === position.x &&
				$currentDragging?.position.y === position.y) ||
		  ($currentDragging?.position.x === position.x &&
				$currentDragging?.position.y + 1 === position.y) ||
		  ($currentDragging?.position.x === position.x &&
				$currentDragging?.position.y + -1 === position.y)
		: false;

	function handleAreaSkill(selectedSkill: Skill, characterPosition: Position['position']) {
		const { x, y } = characterPosition;
		const { aoe } = selectedSkill;

		return isBetween(position.x, x - aoe, x + aoe) && isBetween(position.y, y - aoe, y + aoe);
	}

	function handleDrop() {
		if (!moveable || !$currentDragging) return;

		moveEntity(position.x, position.y, {
			type: 'character',
			character: $currentDragging.character
		});

		currentDragging.set(null);
	}

	$: background = moveable
		? 'rgba(0, 255, 0, 0.3)'
		: inSkillArea
		? 'rgba(255, 191, 255, 0.7)'
		: 'rgba(0, 191, 255, 0.3)';

	function handleClick() {
		if ($selectedSkill) {
			useSkill($selectedSkill.skill, $selectedSkill.character);
		}
	}
</script>

<div
	on:click={handleClick}
	on:drop|preventDefault={handleDrop}
	draggable="false"
	class="absolute z-10 top-0 left-0 h-full w-full glass-background rounded-md"
	style="background-color: {background}; cursor: {inSkillArea ? 'pointer' : 'default'};"
/>

<style>
	.glass-background {
		background-color: rgba(0, 191, 255, 0.3); /* semi-transparent blue background */
		backdrop-filter: blur(10px) saturate(120%);
	}
</style>
