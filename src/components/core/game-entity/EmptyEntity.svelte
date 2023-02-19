<script lang="ts">
	import type { Position } from '../../../games-type';
	import { moveEntity } from '../../../store/game/actions/move-character';
	import { currentDragging } from '../../../store/game/drag';

	export let position: Position['position'];

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

	function handleDrop() {
		if (!moveable || !$currentDragging) return;

		moveEntity(position.x, position.y, {
			type: 'character',
			character: $currentDragging.character
		});

		currentDragging.set(null);
	}
</script>

<div
	on:drop|preventDefault={handleDrop}
	draggable="false"
	class="absolute z-10 top-0 left-0 h-full w-full glass-background rounded-md"
	style="background-color: {moveable ? 'rgba(0, 255, 0, 0.3)' : 'rgba(0, 191, 255, 0.3)'};"
/>

<style>
	.glass-background {
		background-color: rgba(0, 191, 255, 0.3); /* semi-transparent blue background */
		backdrop-filter: blur(10px) saturate(120%);
	}
</style>
