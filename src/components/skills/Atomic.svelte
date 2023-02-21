<script>
	import { NavigationDomain } from 'src/domain/navigation';
	import { useSkill } from 'src/store/actions/use-skill';
	import { selectedSkill } from 'src/store/game/skill';

	$: position = $selectedSkill
		? NavigationDomain.getEntityAbsolutePosition($selectedSkill?.character.character.id)
		: null;

	function handleClick() {
		if ($selectedSkill) useSkill($selectedSkill.skill, $selectedSkill.character);
		console.log('click');
	}
</script>

{#if position}
	<div
		class="circle-container"
		on:click={handleClick}
		style="left: {position.x}px; top: {position.y}px"
	>
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
		cursor: pointer;

		z-index: 1;
		animation: expand 0.5s ease-out forwards;
	}

	@keyframes expand {
		0% {
			width: 100px;
			height: 100px;
		}
		100% {
			width: 950px;
			height: 950px;
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
