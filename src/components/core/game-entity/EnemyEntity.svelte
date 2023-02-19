<script lang="ts">
	import type { Character } from '../../../types';

	export let character: Character;
</script>

<div class="bg-red-500 left-0 top-0 absolute w-full h-full ">
	<div
		draggable="true"
		style="background-image: url({character.image});"
		class={`absolute bg-red-500 z-10 rounded-full top-0 left-0 h-full w-full bg-cover bg-no-repeat bg-center`}
	/>
</div>
