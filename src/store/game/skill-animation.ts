import { writable } from 'svelte/store';

export const skillAnimation = writable(0);

export const playSkillAnimation = (duration = 2000) => {
	skillAnimation.set(duration);

	return new Promise((resolve) =>
		setTimeout(() => {
			skillAnimation.set(0);
			resolve(true);
		}, duration)
	);
};
