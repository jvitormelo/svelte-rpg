<script lang="ts">
	let spaces = [...Array(8)].fill(null);

	let active = 0;

	let isDragging = false;
</script>

<div class={`flex min-h-screen justify-center items-center `}>
	<div class={`${isDragging ? 'border-4 border-red-200' : ''} flex gap-1`}>
		{#each spaces as space, index}
			<div
				class="p-12 bg-black relative"
				on:dragover|preventDefault
				on:drop={(e) => {
					e.preventDefault();
					active = index;
				}}
			>
				<div
					on:dragend={(e) => {
						isDragging = false;
					}}
					on:dragstart={(e) => {
						isDragging = true;
					}}
					draggable={true}
					hidden={active !== index}
					class="absolute top-0 left-0 h-full w-full scale-95 bg-white"
				/>
			</div>
		{/each}
	</div>
</div>
