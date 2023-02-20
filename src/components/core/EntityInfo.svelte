<script lang="ts">
	import type { VirtualCharacter } from '../../types/game';

	export let character: VirtualCharacter;

	export let showDescription = false;
</script>

<div class="flex flex-col gap-4 bg-black p-3 rounded-lg">
	<img class="rounded-lg" src={character.image} alt={character.name} />
	<h3 class="text-center text-2xl text-bold text-white">{character.name}</h3>

	<slot name="body" />

	<div class="flex flex-col">
		<div class="flex">
			❤
			<progress
				class="rounded-lg ml-2 h-[24px] w-full relative"
				value={character.currentHealth}
				max={character.health}
			/>
		</div>
		<div class="mx-auto">
			{character.currentHealth}/{character.health}
		</div>
	</div>
	<div>
		⚔ {character.attack}
	</div>
	<div>
		🛡 {character.defense}
	</div>

	{#if showDescription}
		<div>
			{character.description}
		</div>
	{/if}

	<slot name="bottom" />
</div>
