<script lang="ts">
	import { GameDomain } from 'src/domain/game-domain';
	import { game } from 'src/store/game/game';
	import type { GameEnemyEntity } from 'src/types/game';

	$: isVictory = new GameDomain($game)
		.findAll<GameEnemyEntity>('enemy')
		.every((entity) => entity.character.currentHealth <= 0);
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
