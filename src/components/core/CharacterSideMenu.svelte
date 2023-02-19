<script lang="ts">
	import { actionPoints } from '../../store/game/action-points';
	import { game } from '../../store/game/game';
	import { deselectSkill, selectedSkill, selectSkill } from '../../store/game/skill';
	import { selectedCharacter, selectedCharacterId } from '../../store/game/selected-character';
	import type { Skill } from '../../types';

	function handleSelectSkill(skill: Skill) {
		if ($actionPoints < skill.cost) return alert('Not enough action points');

		if (skill.name === $selectedSkill?.skill.name) {
			return deselectSkill();
		}

		if (!$selectedCharacter) return;

		const foundPosition = $game
			.flat(2)
			.find(
				(entity) => entity.type === 'character' && entity.character.id === $selectedCharacter?.id
			);

		if (foundPosition) {
			selectSkill(skill, {
				character: $selectedCharacter,
				type: 'character',
				position: foundPosition.position
			});
		}
	}
</script>

<aside>
	{#if $selectedCharacter}
		<div class="artboard phone-1 bg-black">
			<img alt={$selectedCharacter.name} src={$selectedCharacter.image} />

			<h4 class="text-center my-4 text-3xl font-bold">
				{$selectedCharacter.name}
			</h4>

			<div>
				<h5 class="text-center my-4 text-2xl font-bold">Health</h5>
				<div class="flex justify-center">
					<div class="bg-red-500 w-1/2 h-4 rounded-full">
						<div class="bg-green-500 h-full rounded-full" style="width: 50%" />
					</div>
					{$selectedCharacter.currentHealth} /
					{$selectedCharacter.health}
				</div>

				<h5 class="text-center my-4 text-2xl font-bold">Defense</h5>
				<div>
					{$selectedCharacter.defense}
				</div>

				<h5 class="text-center my-4 text-2xl font-bold">Attack</h5>
				<div>
					{$selectedCharacter.attack}
				</div>

				<div>
					Actions points: {$actionPoints}
				</div>

				<section class="mt-4">
					{#each $selectedCharacter.skills as skill}
						<button on:click|preventDefault|stopPropagation={() => handleSelectSkill(skill)}>
							<img width="40" height="40" alt={skill.name} src={skill.icon} />
						</button>
					{/each}
				</section>
			</div>
		</div>
	{/if}
</aside>
