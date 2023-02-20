<script lang="ts">
	import type { Character } from '../../types/types';

	export let character: Omit<Character, 'id'>;

	export let onClick: (character: Omit<Character, 'id'>) => void;
</script>

<div class="card w-96 bg-base-100 shadow-xl border-2 border-blue-200">
	<figure><img src={character.image} alt="Shoes" /></figure>
	<div class="card-body">
		<h2 class="card-title">{character.name}</h2>
		<p>{character.description}</p>
		<div class="card-actions justify-end">
			<button class="btn btn-primary" on:click={() => onClick(character)}>Select</button>
		</div>
	</div>
</div>
