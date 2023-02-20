<script lang="ts">
	import { goto } from '$app/navigation';
	import CharacterCard from '../components/core/CharacterCard.svelte';
	import { availableCharacters } from '../data/characters';
	import { generateId } from '../lib/utils/generate-id';
	import { startGame } from '../store/actions/start-game';
	import type { Character } from '../types/types';

	function selectCharacter(character: Omit<Character, 'id'>) {
		startGame({ ...character, id: generateId() });
		goto('/game');
	}
</script>

<main class="min-h-screen flex justify-center items-center flex-col ">
	<h1 class="text-3xl mb-4">SELECT YOUR CHARACTER!</h1>
	<section class="flex gap-4">
		{#each availableCharacters as character}
			<CharacterCard {character} onClick={selectCharacter} />
		{/each}
	</section>
</main>
