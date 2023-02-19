<script lang="ts">
	import type { Character } from '../../types';

	export let character: Character;
</script>

<div class="flex flex-col gap-4">
	<img src={character.image} alt={character.name} />
	<h3>{character.name}</h3>
	<div>
		Health: {character.health}
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
