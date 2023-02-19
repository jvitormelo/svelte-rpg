<script lang="ts">
	import { deselectEnemy, selectedEnemy, selectEnemy } from '../../store/game/enemy';
	import EntityInfo from './EntityInfo.svelte';
</script>

<aside class="artboard phone-1 bg-black">
	{#if $selectedEnemy}
		<button on:click={deselectEnemy}>close</button>
		<EntityInfo character={$selectedEnemy} />
	{/if}
</aside>
