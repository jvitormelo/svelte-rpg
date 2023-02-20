<script lang="ts">
	import { selectedSkill } from 'src/store/game/skill';
	import Atomic from './Atomic.svelte';

	$: $selectedSkill;
</script>

{#if $selectedSkill?.skill.animation === 'atomic'}
	<Atomic />
{/if}
