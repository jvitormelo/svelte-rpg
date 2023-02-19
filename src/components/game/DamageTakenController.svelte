<script lang="ts">
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

	function getPosition(id: String) {
		const element = document.querySelector(`[data-entity-id="${id}"]`);

		if (element) {
			const rect = element.getBoundingClientRect();
			const x = rect.x;
			const y = rect.y;

			return {
				x: x + rect.width / 2 - 20,
				y: y + rect.height / 2 - 20
			};
		}

		return { x: 0, y: 0 };
	}
</script>
