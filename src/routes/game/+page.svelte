<script lang="ts">
	import { onMount } from 'svelte';
	import GameEntityController from '../../components/core/game-entity/GameEntityController.svelte';
	import { availableCharacters } from '../../data/characters';
	import { moveEntity } from '../../store/game/actions/move-character';
	import { game, startGame } from '../../store/game/game';
	import { selectedCharacter } from '../../store/selected-chacter';

	onMount(() => {
		startGame({
			...availableCharacters[0],
			id: Date.now().toString()
		});
	});
</script>

<main class="flex justify-center items-center min-h-screen">
	<div class="flex border-2 border-black gap-1">
		{#each $game as row, x}
			<div class="flex flex-col gap-1">
				{#each row as entity, y}
					<div
						on:drop|preventDefault={(e) => {
							if (!$selectedCharacter) return;
							moveEntity(x, y, {
								type: 'character',
								character: $selectedCharacter
							});
						}}
						class="p-12 relative glass-background"
						on:dragover|preventDefault
					>
						<GameEntityController {entity} />
					</div>
				{/each}
			</div>
		{/each}
	</div>
</main>

<style>
</style>
