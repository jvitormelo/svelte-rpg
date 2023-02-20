<script lang="ts">
	import { GameDomain } from 'src/domain/game-domain';
	import { actionPoints } from '../../store/game/action-points';
	import { game } from '../../store/game/game';
	import { selectedCharacter } from '../../store/game/selected-character';
	import { deselectSkill, selectedSkill, selectSkill } from '../../store/game/skill';
	import type { Skill } from '../../types/types';
	import EntityInfo from './EntityInfo.svelte';

	function handleSelectSkill(skill: Skill) {
		if ($actionPoints < skill.cost) return alert('Not enough action points');

		if (skill.name === $selectedSkill?.skill.name) {
			return deselectSkill();
		}

		if (!$selectedCharacter) return;

		const foundPosition = new GameDomain($game).findCharacter($selectedCharacter.id);

		if (foundPosition) {
			selectSkill(skill, $selectedCharacter.id);
		}
	}
</script>

<aside class="artboard phone-1">
	{#if $selectedCharacter}
		<EntityInfo character={$selectedCharacter}>
			<div slot="body">⚡ {$actionPoints}</div>
			<section slot="bottom" class="mt-4">
				{#each $selectedCharacter.skills as skill}
					<button on:click|preventDefault|stopPropagation={() => handleSelectSkill(skill)}>
						<img width="40" height="40" alt={skill.name} src={skill.icon} />
					</button>
				{/each}
			</section>
		</EntityInfo>
	{/if}
</aside>
