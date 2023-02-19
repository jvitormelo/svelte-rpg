<script lang="ts">
	import { MOVE_COST } from '../../../constants';
	import type { Position } from '../../../games-type';
	import { actionPoints } from '../../../store/game/action-points';
	import { currentDragging } from '../../../store/game/drag';
	import type { Character } from '../../../types';

	export let character: Character;
	export let position: Position['position'];

	$: canMove = $actionPoints >= MOVE_COST;
</script>

<div
	draggable={canMove}
	on:dragstart={(e) => {
		currentDragging.set({
			character,
			type: 'character',
			position
		});
	}}
	on:dragend={() => {
		currentDragging.set(null);
	}}
	style="background-image: url({character.image});"
	class="rounded-full bg-cover bg-no-repeat bg-center cursor-pointer"
/>
