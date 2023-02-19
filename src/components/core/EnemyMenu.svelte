<script lang="ts">
	import { deselectEnemy, selectedEnemyId, selectEnemy } from '../../store/game/enemy';
	import { game } from '../../store/game/game';
	import EntityInfo from './EntityInfo.svelte';

	$: selectedEnemy = $game
		.flat(2)
		.find((item) => item.type === 'enemy' && item.character.id === $selectedEnemyId);
</script>

<aside class="artboard phone-1">
	{#if selectedEnemy && selectedEnemy.type === 'enemy'}
		<EntityInfo showDescription character={selectedEnemy.character} />
		<div class="flex mt-2">
			<button class="btn  mx-auto bg-red-600" on:click={deselectEnemy}>❌</button>
		</div>
	{/if}
</aside>
