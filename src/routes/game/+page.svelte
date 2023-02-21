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
	import { game } from '../../store/game/game';

	let intervalId: NodeJS.Timer;

	onMount(() => {
		// startGame({
		// 	...availableCharacters[0],
		// 	id: generateId()
		// });

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
		class="flex bg-slate-50 bg"
	>
		{#each $game as row}
			<section class="flex flex-col [&>*]:w-32 [&>*]:h-32">
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
	.bg {
		background-image: url('https://th.bing.com/th/id/R.edc24462b2ca830491d57e40a7822fd0?rik=0E%2b06hmSPtPi4A&pid=ImgRaw&r=0');
		background-repeat: no-repeat;
		background-size: cover;
		background-position: center;
	}
</style>
