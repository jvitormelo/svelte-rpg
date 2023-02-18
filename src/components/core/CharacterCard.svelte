<script lang="ts">
	import type { Character } from '../../types';

	export let character: Character;

	export let onClick: (character: Character) => void;
</script>

<div class="card w-96 bg-base-100 shadow-xl">
	<figure><img src={character.image} alt="Shoes" /></figure>
	<div class="card-body">
		<h2 class="card-title">{character.name}</h2>
		<p>{character.description}</p>
		<div class="card-actions justify-end">
			<button class="btn btn-primary" on:click={() => onClick(character)}>Select</button>
		</div>
	</div>
</div>
