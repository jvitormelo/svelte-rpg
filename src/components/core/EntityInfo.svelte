<script lang="ts">
	import type { VirtualCharacter } from '../../games-type';

	export let character: VirtualCharacter;
</script>

<div class="flex flex-col gap-4">
	<img src={character.image} alt={character.name} />
	<h3>{character.name}</h3>
	<div>
		Health: {character.currentHealth} / {character.health}
	</div>
	<div>
		Attack: {character.attack}
	</div>
	<div>
		Defense: {character.defense}
	</div>

	<div>
		Defense: {character.defense}
	</div>

	<div>
		{character.description}
	</div>
</div>
