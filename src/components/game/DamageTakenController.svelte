<script lang="ts">
	import { generateId } from 'src/lib/utils/generate-id';
	import { getPosition } from 'src/lib/utils/get-position';
	import { Random } from 'src/lib/utils/random';
	import type { CustomDamageEvent } from 'src/store/actions/apply-damage';
	import { onMount, onDestroy } from 'svelte';

	onMount(() => {
		addEventListener('damage-taken', (e) => {
			if ('detail' in e) {
				const { damage, entityId } = e.detail as CustomDamageEvent;
				const div = document.createElement('div');

				const { x, y } = getPosition(entityId);

				const randomX = Random.generateRandomNumber(0, 50);
				const randomY = Random.generateRandomNumber(0, 50);

				div.innerText = `-${damage}`;
				div.classList.add('damage-taken');
				div.style.left = `${x - randomX}px`;

				div.style.top = `${y - randomY}px`;

				window.document.body.appendChild(div);

				setTimeout(() => {
					div.remove();
				}, 1000);
			}
		});
	});
</script>
