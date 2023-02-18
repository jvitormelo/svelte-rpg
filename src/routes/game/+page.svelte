<script lang="ts">
	import { selectedCharacter } from '../../store/selected-chacter';

	const map = [...Array(8)].map((_, i) => [...Array(8)].fill(null));

	function getAttributes() {
		return {
			style: `background-image: url(${$selectedCharacter?.image});`,
			hidden: false
		};
	}
</script>

<main class="flex justify-center items-center min-h-screen">
	{$selectedCharacter?.name}

	<div class="flex border-2 border-black gap-1">
		{#each map as row, i}
			<div class="flex flex-col gap-1">
				{#each row as space, j}
					<div
						on:drop={(e) => {
							e.preventDefault();
							console.log(i, j);
							active = { x: i, y: j };
						}}
						class={`p-12 relative glass-background rounded-md  `}
						on:dragover|preventDefault
					>
						<div
							draggable="true"
							hidden={active.x !== i || active.y !== j}
							style="background-image: url({$selectedCharacter?.image});"
							class={`absolute z-10 rounded-full top-0 left-0 h-full w-full  bg-cover bg-no-repeat bg-center `}
						/>
					</div>
				{/each}
			</div>
		{/each}
	</div>
</main>

<style>
	.glass-background {
		background-color: rgba(0, 191, 255, 0.3); /* semi-transparent blue background */
		backdrop-filter: blur(10px) saturate(120%);
	}
</style>
