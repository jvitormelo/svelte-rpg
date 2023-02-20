<script lang="ts">
	import { game } from 'src/store/game/game';

	$: isVictory = $game
		.flat(2)
		.every((entity) => (entity.type === 'enemy' ? entity.character.currentHealth <= 0 : true));

	$: console.log(isVictory);
</script>

{#if isVictory}
	<dialog
		class="fixed left-0 top-0 w-screen h-screen bg-transparent flex justify-center items-center px-0 flex-col z-50"
	>
		<div class="py-32 bg-green-600 w-full text-center ">
			<h3 class="text-3xl">You won!</h3>

			<a href="/" class="btn mt-4">Nice</a>
		</div>
	</dialog>
{/if}
