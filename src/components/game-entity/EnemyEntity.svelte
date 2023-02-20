<script lang="ts">
	import { useSkill } from 'src/store/actions/use-skill';
	import { selectedSkill } from 'src/store/game/skill';
	import type { VirtualEnemy } from '../../types/game';
	import { selectEnemy } from '../../store/game/enemy';

	export let character: VirtualEnemy;

	function onClick() {
		if ($selectedSkill) {
			return useSkill($selectedSkill.skill, $selectedSkill.character);
		}

		selectEnemy(character.id);
	}

	$: isDead = character.currentHealth <= 0;
</script>

{#if isDead}
	<div class="bg-black" />
{:else}
	<button data-entity-id={character.id} class="bg-red-400 w-full relative" on:click={onClick}>
		<div
			draggable={false}
			style="background-image: url({character.image});"
			class="absolute z-10 top-0 left-0  h-full w-full rounded-full bg-cover bg-no-repeat bg-center"
		/>
	</button>
{/if}

<style></style>
