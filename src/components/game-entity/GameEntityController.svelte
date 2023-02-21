<script lang="ts">
	import type { GameEntity } from 'src/types/game';
	import CharacterEntity from './CharacterEntity.svelte';
	import EmptyEntity from './EmptyEntity.svelte';
	import EnemyEntity from './EnemyEntity.svelte';

	export let entity: GameEntity;
</script>

{#if entity.type === 'character'}
	<CharacterEntity {entity} position={entity.position} character={entity.character} />
{:else if entity.type === 'enemy'}
	<EnemyEntity enemyEntity={entity} />
{:else if entity.type === 'empty'}
	<EmptyEntity {entity} />
{:else if entity.type === 'terrain'}
	<div>terrain</div>
{/if}
