export function getEntityPosition(id: string) {
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
