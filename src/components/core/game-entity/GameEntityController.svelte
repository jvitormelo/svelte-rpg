<script lang="ts">
	import type { GameEntity } from '../../../games-type';
	import CharacterEntity from './CharacterEntity.svelte';
	import EmptyEntity from './EmptyEntity.svelte';
	import EnemyEntity from './EnemyEntity.svelte';

	export let entity: GameEntity;
</script>

{#if entity.type === 'character'}
	<CharacterEntity position={entity.position} character={entity.character} />
{:else if entity.type === 'enemy'}
	<EnemyEntity character={entity.character} />
{:else if entity.type === 'empty'}
	<EmptyEntity position={entity.position} />
{:else if entity.type === 'terrain'}
	<div>terrain</div>
{/if}
