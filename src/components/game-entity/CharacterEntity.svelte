<script lang="ts">
	import { deselectSkill, selectedSkill } from 'src/store/game/skill';
	import type { GameEntity } from 'src/types/game';
	import { MOVE_COST } from '../../constants';
	import { actionPoints } from '../../store/game/action-points';
	import { removeCurrentDragging, setCurrentDragging } from '../../store/game/drag';
	import type { Character } from '../../types/types';

	export let character: Character;
	export let position: GameEntity['position'];

	function onDragStart() {
		if ($actionPoints < MOVE_COST) return alert('Not enough action points');
		if ($selectedSkill) {
			deselectSkill();
		}

		setCurrentDragging({
			entityId: character.id,
			position
		});
	}

	function onDragEnd() {
		removeCurrentDragging();
	}

	$: canMove = $actionPoints >= MOVE_COST;
</script>

<div
	data-entity-id={character.id}
	draggable={canMove}
	on:dragstart={onDragStart}
	on:click={onDragStart}
	on:dragend={onDragEnd}
	style="background-image: url({character.image});"
	class="rounded-full bg-cover bg-no-repeat bg-center cursor-pointer"
/>
