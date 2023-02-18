<script lang="ts">
	import type { Character } from '../../../types';

	export let character: Character;
</script>

<div
	draggable="true"
	style="background-image: url({character.image});"
	class={`absolute z-10 rounded-full top-0 left-0 h-full w-full bg-cover bg-no-repeat bg-center`}
/>
