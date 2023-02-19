<script lang="ts">
	import { selectedCharacter } from 'src/store/game/selected-character';
	import { skillAnimation } from 'src/store/game/skill-animation';
</script>

{#if $skillAnimation}
	<dialog class="dialog-container">
		<h1 class="text-6xl mb-4">ATOMIC</h1>
		<img width="600" class="aspect-auto rounded-3xl" src={$selectedCharacter?.image} alt="Skill" />
	</dialog>
{/if}

<style>
	.dialog-container {
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 100%;
		max-height: 100vh;
		height: fit-content;
		background: linear-gradient(to right, #355c7d, #32174d, #000);
		background-size: 600% 600%;
		animation: gradient 10s ease infinite;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		z-index: 1000;
		transition: opacity 0.5s ease-in-out;
		animation: opacity-animate 0.25s ease-in-out;
	}

	@keyframes opacity-animate {
		0% {
			opacity: 0;
		}
		100% {
			opacity: 1;
		}
	}

	@keyframes gradient {
		0% {
			background-position: 0% 50%;
		}
		50% {
			background-position: 100% 50%;
		}
		100% {
			background-position: 0% 50%;
		}
	}
</style>
