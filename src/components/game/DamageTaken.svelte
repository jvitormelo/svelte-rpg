<script lang="ts">
	export let damage: number;
	export let position: { x: number; y: number };
</script>

<div class="damage-taken" style="top: {position.y}px; left: {position.x}px;">
	<span>-{damage}</span>
</div>

<style>
	.damage-taken {
		position: absolute;
		border: 2px solid red;
		border-radius: 50%;
		width: 50px;
		height: 50px;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 24px;
		color: red;
		animation: damageTaken 1s ease-out forwards;
	}

	@keyframes damageTaken {
		0% {
			transform: scale(1);
			opacity: 1;
		}
		50% {
			transform: scale(1.5);
			opacity: 0.7;
		}
		100% {
			transform: scale(1);
			opacity: 0;
		}
	}
</style>
