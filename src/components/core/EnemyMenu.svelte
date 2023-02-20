<script lang="ts">
	import { GameDomain } from 'src/domain/game';
	import { deselectEnemy, selectedEnemyId } from '../../store/game/enemy';
	import { game } from '../../store/game/game';
	import EntityInfo from './EntityInfo.svelte';

	$: selectedEnemy = new GameDomain($game).findCharacter($selectedEnemyId);
</script>

<aside class="artboard phone-1">
	{#if selectedEnemy}
		<EntityInfo showDescription character={selectedEnemy.character} />
		<div class="flex mt-2">
			<button class="btn  mx-auto bg-red-600" on:click={deselectEnemy}>❌</button>
		</div>
	{/if}
</aside>
