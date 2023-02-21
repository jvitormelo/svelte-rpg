<script lang="ts">
	import { GAME_ENTITY_SIZE } from 'src/constants';
	import { useSkill } from 'src/store/actions/use-skill';
	import { selectedSkill } from 'src/store/game/skill';
	import { onMount } from 'svelte';
	import { selectEnemy } from '../../store/game/enemy';
	import type { GameEntityWithCharacter, VirtualEnemy } from '../../types/game';

	export let enemyEntity: GameEntityWithCharacter;

	$: character = enemyEntity.character as VirtualEnemy;

	function onClick() {
		if ($selectedSkill) {
			return useSkill($selectedSkill.skill, $selectedSkill.character, enemyEntity);
		}

		selectEnemy(character.id);
	}

	let container: HTMLButtonElement;

	onMount(() => {
		if (enemyEntity.previousPosition && container) {
			const { position, previousPosition } = enemyEntity;
			const xDiff = (previousPosition.x - position.x) * GAME_ENTITY_SIZE;
			const yDiff = (previousPosition.y - position.y) * GAME_ENTITY_SIZE;

			console.log(enemyEntity);
			console.log('a');

			container.animate(
				[{ transform: `translate(${xDiff}px, ${yDiff}px)` }, { transform: 'translate(0px, 0px)' }],
				{
					duration: 300,
					easing: 'ease-in-out'
				}
			);
		}
	});
</script>

<button
	bind:this={container}
	data-entity-id={character.id}
	class=" w-full relative  move-animation z-10"
	on:click={onClick}
>
	<div
		draggable={false}
		style="background-image: url({character.image});"
		class="absolute z-10 top-0 left-0  h-full w-full rounded-full bg-cover bg-no-repeat bg-center"
	/>
</button>

<style>
	.move-animation {
		transition: all 0.5s ease-in-out;
	}
</style>
