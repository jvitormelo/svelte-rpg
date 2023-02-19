<script lang="ts">
	import { onMount } from 'svelte';
	import CharacterSideMenu from '../../components/core/CharacterSideMenu.svelte';
	import GameMenu from '../../components/core/EnemyMenu.svelte';
	import { availableCharacters } from '../../data/characters';
	import { generateId } from '../../lib/utils/generate-id';
	import { game } from '../../store/game/game';
	import { startGame } from '../../store/actions/start-game';
	import GameEntityController from 'src/components/game-entity/GameEntityController.svelte';
	import { finishTurn } from 'src/store/actions/finish-turn';
	import SkillAudio from 'src/components/core/SkillAudio.svelte';
	import { deselectSkill } from 'src/store/game/skill';

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

<div
	class="flex  px-32 items-center min-h-screen justify-between"
	on:click={() => {
		deselectSkill();
	}}
>
	<CharacterSideMenu />
	<main on:click|preventDefault|stopPropagation>
		{#if isAllEnemiesDead}
			<h1 class="text-xl text-center">VICTORY!!!</h1>
		{/if}

		<div class="flex gap-1" on:dragover|preventDefault>
			{#each $game as row}
				<div class="flex flex-col gap-1 [&>*]:w-32 [&>*]:h-32">
					{#each row as entity}
						<GameEntityController {entity} />
					{/each}
				</div>
			{/each}
		</div>
		<div class="flex">
			<button class="btn mx-auto mt-4" on:click={finishTurn}> Finish turn </button>
		</div>
	</main>
	<GameMenu />
	<SkillAudio />
</div>

<style>
</style>
