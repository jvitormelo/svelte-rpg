<script lang="ts">
	import GameEntityController from 'src/components/game-entity/GameEntityController.svelte';
	import DeathScreen from 'src/components/game/DeathScreen.svelte';
	import SkillAnimation from 'src/components/game/SkillAnimation.svelte';
	import SkillAudio from 'src/components/game/SkillAudio.svelte';
	import VictoryDialog from 'src/components/game/VictoryDialog.svelte';
	import SkillsController from 'src/components/skills/SkillsController.svelte';
	import { finishTurn } from 'src/store/actions/finish-turn';
	import { deselectSkill } from 'src/store/game/skill';
	import { onDestroy, onMount } from 'svelte';
	import CharacterSideMenu from '../../components/core/CharacterMenu.svelte';
	import GameMenu from '../../components/core/EnemyMenu.svelte';
	import { availableCharacters } from '../../data/characters';
	import { generateId } from '../../lib/utils/generate-id';
	import { startGame } from '../../store/actions/start-game';
	import { game } from '../../store/game/game';

	let intervalId: NodeJS.Timer;

	onMount(() => {
		startGame({
			...availableCharacters[0],
			id: generateId()
		});

		intervalId = setInterval(() => {
			finishTurn();
		}, 1000);
	});

	onDestroy(() => {
		clearInterval(intervalId);
	});
</script>

<div
	class="flex px-32 items-center min-h-screen justify-between overflow-hidden"
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
	<main
		on:click|preventDefault|stopPropagation
		on:keydown
		on:dragover|preventDefault
		class="flex gap-1"
	>
		{#each $game as row}
			<section class="flex flex-col gap-1 [&>*]:w-32 [&>*]:h-32">
				{#each row as entity}
					<GameEntityController {entity} />
				{/each}
			</section>
		{/each}
	</main>
	<GameMenu />
</div>

<DeathScreen />
<SkillAudio />
<SkillAnimation />

<SkillsController />
<VictoryDialog />

<style>
</style>
