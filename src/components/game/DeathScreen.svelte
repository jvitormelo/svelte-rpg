<script lang="ts">
	import { isPlayerDead } from 'src/store/game/selected-character';

	function restart() {
		window.location.reload();
	}
</script>

{#if $isPlayerDead}
	<div
		class="w-screen h-screen fixed left-0 top-0 flex justify-center items-center z-50 bg-transparent"
	>
		<div class="death-screen">
			<h1>YOU DIED</h1>

			<button on:click={restart}>Restart</button>
		</div>
	</div>
{/if}

<style>
	.death-screen {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		background-color: #000;
		color: #fff;
		font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
		text-align: center;
		width: 100%;
		height: 50vh;
	}

	h1 {
		font-size: 5em;
		margin-top: 5%;
		text-shadow: 2px 2px 0 #800000, -2px -2px 0 #800000;
	}

	button {
		margin-top: 3%;
		background-color: #800000;
		color: #fff;
		text-decoration: none;
		border-radius: 5px;
		text-shadow: 1px 1px 0 #000;
		box-shadow: 2px 2px 0 #000;
		transition: all 0.2s ease-in-out;
		border: none;
		padding: 10px 20px;
	}

	button:hover {
		background-color: #c50000;
		box-shadow: 2px 2px 0 #000;
		cursor: pointer;
	}
</style>
