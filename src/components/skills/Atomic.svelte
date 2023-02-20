<script>
	import { getEntityPosition } from 'src/domain/get-entity-position';
	import { selectedSkill } from 'src/store/game/skill';

	$: position = $selectedSkill ? getEntityPosition($selectedSkill?.character.character.id) : null;
</script>

{#if position}
	<div class="circle-container" style="left: {position.x}px; top: {position.y}px">
		<div class="circle" />
	</div>
{/if}

<style>
	.circle-container {
		width: 100px;
		height: 100px;
		border-radius: 50%;
		display: flex;
		justify-content: center;
		align-items: center;
		overflow: hidden;
		position: absolute;
		transform: translateX(-50%) translateY(-50%);

		z-index: -1;
		animation: expand 0.5s ease-out forwards;
	}

	@keyframes expand {
		0% {
			width: 100px;
			height: 100px;
		}
		100% {
			width: 900px;
			height: 900px;
		}
	}

	.circle {
		width: 100%;
		height: 100%;
		background-color: #0f0;
		animation: circle 1.5s ease-out infinite;
		background-image: radial-gradient(circle at center, #682fee, #843cf8, #ca6df2, #e2b6e1);
	}

	@keyframes circle {
		0% {
			transform: scale(1);
		}

		50% {
			transform: scale(1.3);
		}
		100% {
			transform: scale(1);
		}
	}
</style>
