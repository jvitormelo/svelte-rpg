<script lang="ts">
	import { getPosition } from 'src/lib/utils/get-position';
	import type { CustomDamageEvent } from 'src/store/actions/apply-damage';
	import { onMount, onDestroy } from 'svelte';

	onMount(() => {
		addEventListener('damage-taken', (e) => {
			if ('detail' in e) {
				const { damage, entityId } = e.detail as CustomDamageEvent;
				const div = document.createElement('div');

				const { x, y } = getPosition(entityId);

				div.innerText = `-${damage}`;
				div.classList.add('damage-taken');
				div.style.left = `${x}px`;
				div.style.top = `${y}px`;

				window.document.body.appendChild(div);

				setTimeout(() => {
					div.remove();
				}, 1000);
			}
		});
	});
</script>
