<script lang="ts">
	import type { VirtualEnemy } from '../../../games-type';
	import { selectEnemy } from '../../../store/game/enemy';

	export let character: VirtualEnemy;

	function onClick() {
		selectEnemy(character.id);
	}

	$: isDead = character.currentHealth <= 0;
</script>

{#if isDead}
	<div class="absolute top-0 left-0 w-full h-full bg-black opacity-50" />
{:else}
	<button class="bg-red-500 left-0 top-0 absolute w-full h-full" on:click={onClick}>
		<div
			draggable="true"
			style="background-image: url({character.image});"
			class={`absolute bg-red-500 z-10 rounded-full top-0 left-0 h-full w-full bg-cover bg-no-repeat bg-center`}
		/>
	</button>
{/if}
