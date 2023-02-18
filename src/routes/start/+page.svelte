<script lang="ts">
	import { goto } from '$app/navigation';
	import CharacterCard from '../../components/core/CharacterCard.svelte';
	import { availableCharacters } from '../../data/characters';
	import { startGame } from '../../store/game/game';
	import type { Character } from '../../types';

	function selectCharacter(character: Character) {
		startGame(character);
		goto('/game');
	}
</script>

<main class="min-h-screen flex justify-center items-center">
	{#each availableCharacters as character}
		<CharacterCard {character} onClick={selectCharacter} />
	{/each}
</main>
