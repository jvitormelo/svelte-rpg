<script lang="ts">
	import GameEntityController from 'src/components/game-entity/GameEntityController.svelte';
	import { finishTurn } from 'src/store/actions/finish-turn';
	import { onMount } from 'svelte';
	import CharacterSideMenu from '../../components/core/CharacterMenu.svelte';
	import GameMenu from '../../components/core/EnemyMenu.svelte';
	import { availableCharacters } from '../../data/characters';
	import { generateId } from '../../lib/utils/generate-id';
	import { startGame } from '../../store/actions/start-game';
	import { game } from '../../store/game/game';
	import SkillAnimation from 'src/components/game/SkillAnimation.svelte';
	import SkillAudio from 'src/components/game/SkillAudio.svelte';
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
	on:keydown={(e) => {
		if (e.key === 'Escape') {
			deselectSkill();
		}
	}}
>
	<CharacterSideMenu />
	<main on:click|preventDefault|stopPropagation on:keydown>
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
</div>

<SkillAudio />
<SkillAnimation />

<style>
</style>
