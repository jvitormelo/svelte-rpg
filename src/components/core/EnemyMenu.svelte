<script lang="ts">
	import { deselectEnemy, selectedEnemyId, selectEnemy } from '../../store/game/enemy';
	import { game } from '../../store/game/game';
	import EntityInfo from './EntityInfo.svelte';

	$: selectedEnemy = $game
		.flat(2)
		.find((item) => item.type === 'enemy' && item.character.id === $selectedEnemyId);
</script>

<aside class="artboard phone-1 bg-black">
	{#if selectedEnemy && selectedEnemy.type === 'enemy'}
		<button on:click={deselectEnemy}>close</button>
		<EntityInfo character={selectedEnemy.character} />
	{/if}
</aside>
