<script lang="ts">
	import { deselectSkill, selectedSkill } from 'src/store/game/skill';
	import type { GameEntity } from 'src/types/game';
	import { onMount } from 'svelte';
	import { GAME_ENTITY_SIZE, MOVE_COST } from '../../constants';
	import { actionPoints } from '../../store/game/action-points';
	import { removeCurrentDragging, setCurrentDragging } from '../../store/game/drag';
	import type { Character } from '../../types/types';

	export let character: Character;
	export let position: GameEntity['position'];

	export let entity: GameEntity;

	function onDragStart() {
		if ($actionPoints < MOVE_COST) return alert('Not enough action points');
		if ($selectedSkill) {
			deselectSkill();
		}

		setCurrentDragging({
			entityId: character.id,
			position
		});
	}

	function onDragEnd() {
		removeCurrentDragging();
	}

	$: canMove = $actionPoints >= MOVE_COST;

	// need to create custom hook? or equivalent
	let teste: HTMLDivElement;
	onMount(() => {
		if (entity.previousPosition) {
			const xDiff = (entity.previousPosition.x - entity.position.x) * GAME_ENTITY_SIZE;
			const yDiff = (entity.previousPosition.y - entity.position.y) * GAME_ENTITY_SIZE;

			teste.animate(
				[{ transform: `translate(${xDiff}px, ${yDiff}px)` }, { transform: 'translate(0px, 0px)' }],
				{
					duration: 300,
					easing: 'ease-in-out'
				}
			);
		}
	});
</script>

<div
	bind:this={teste}
	data-entity-id={character.id}
	draggable={canMove}
	on:dragstart={onDragStart}
	on:click={onDragStart}
	on:dragend={onDragEnd}
	style="background-image: url({character.image});z-index: 10;"
	class="rounded-full bg-cover bg-no-repeat bg-center cursor-pointer"
/>
