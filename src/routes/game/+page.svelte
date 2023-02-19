<script lang="ts">
	import { onMount } from 'svelte';
	import CharacterSideMenu from '../../components/core/CharacterSideMenu.svelte';
	import GameEntityController from '../../components/core/game-entity/GameEntityController.svelte';
	import GameMenu from '../../components/core/EnemyMenu.svelte';
	import { availableCharacters } from '../../data/characters';
	import { generateId } from '../../lib/utils/generate-id';
	import { game } from '../../store/game/game';
	import { startGame } from '../../store/game/actions/start-game';

	onMount(() => {
		startGame({
			...availableCharacters[0],
			id: generateId()
		});
	});

	$: isAllEnemiesDead = !$game
		.flat(2)
		.some((entity) => entity.type === 'enemy' && entity.character.currentHealth >= 0);
</script>

<div class="flex  px-32 items-center min-h-screen justify-between">
	<CharacterSideMenu />
	<main>
		{#if isAllEnemiesDead}
			<h1 class="text-xl text-center">VICTORY!!!</h1>
		{/if}

		<div class="flex border-2 border-black gap-1" on:dragover|preventDefault>
			{#each $game as row}
				<div class="flex flex-col gap-1">
					{#each row as entity}
						<div draggable={false} class="p-12 relative glass-background">
							<GameEntityController {entity} />
						</div>
					{/each}
				</div>
			{/each}
		</div>
		<div class="flex">
			<button class="btn mx-auto mt-4"> Finish turn </button>
		</div>
	</main>
	<GameMenu />
</div>

<style>
</style>
