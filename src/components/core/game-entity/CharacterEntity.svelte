<script lang="ts">
	import type { Position } from '../../../games-type';
	import { currentDragging } from '../../../store/game/drag';
	import type { Character } from '../../../types';

	export let character: Character;
	export let position: Position['position'];
</script>

<div
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
	class={`absolute z-10 rounded-full top-0 left-0 h-full w-full bg-cover bg-no-repeat bg-center cursor-pointer`}
/>
