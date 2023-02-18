<script lang="ts">
	import type { GameEntity } from '../../../games-type';
	import CharacterEntity from './CharacterEntity.svelte';
	import EmptyEntity from './EmptyEntity.svelte';

	export let entity: GameEntity;
</script>

{#if entity.type === 'character'}
	<CharacterEntity character={entity.character} />
{:else if entity.type === 'enemy'}
	<div>enemy</div>
{:else if entity.type === 'empty'}
	<EmptyEntity />
{:else if entity.type === 'terrain'}
	<div>terrain</div>
{/if}
