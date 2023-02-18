<script lang="ts">
	import { goto } from '$app/navigation';
	import CharacterCard from '../../components/core/CharacterCard.svelte';
	import { availableCharacters } from '../../store/characters';
	import { startGame } from '../../store/game';
	import { selectedCharacter } from '../../store/selected-chacter';
	import type { Character } from '../../types';

	function selectCharacter(character: Character) {
		selectedCharacter.set(character);
		startGame();
		goto('/game');
	}
</script>

<main class="min-h-screen flex justify-center items-center">
	{#each $availableCharacters as character}
		<CharacterCard {character} onClick={selectCharacter} />
	{/each}
</main>
