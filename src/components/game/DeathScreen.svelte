<script lang="ts">
	import { isPlayerDead } from 'src/store/game/selected-character';

	let message = 'You are dead';

	function restart() {
		window.location.reload();
	}
</script>

{#if $isPlayerDead}
	<div class="death-screen">
		<h1>YOU DIED</h1>
		<h2>{{ message }}</h2>
		<p><slot /></p>
		<button on:click={restart}>Restart</button>
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
		height: 100vh;
	}

	h1 {
		font-size: 5em;
		margin-top: 5%;
		text-shadow: 2px 2px 0 #800000, -2px -2px 0 #800000;
	}

	h2 {
		font-size: 3em;
		margin-top: 2%;
		text-shadow: 2px 2px 0 #800000, -2px -2px 0 #800000;
	}

	p {
		font-size: 1.5em;
		margin-top: 2%;
		text-shadow: 1px 1px 0 #800000, -1px -1px 0 #800000;
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
