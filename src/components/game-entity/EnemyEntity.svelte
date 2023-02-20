<script lang="ts">
	import { useSkill } from 'src/store/actions/use-skill';
	import { selectedSkill } from 'src/store/game/skill';
	import { selectEnemy } from '../../store/game/enemy';
	import type { GameEntityWithCharacter, VirtualEnemy } from '../../types/game';

	export let enemyEntity: GameEntityWithCharacter;

	$: character = enemyEntity.character as VirtualEnemy;

	function onClick() {
		if ($selectedSkill) {
			return useSkill($selectedSkill.skill, $selectedSkill.character, enemyEntity);
		}

		selectEnemy(character.id);
	}

	$: isDead = character.currentHealth <= 0;
</script>

{#if isDead}
	<div class="bg-black" />
{:else}
	<button data-entity-id={character.id} class=" w-full relative" on:click={onClick}>
		<div
			draggable={false}
			style="background-image: url({character.image});"
			class="absolute z-10 top-0 left-0  h-full w-full rounded-full bg-cover bg-no-repeat bg-center"
		/>
	</button>
{/if}

<style></style>
