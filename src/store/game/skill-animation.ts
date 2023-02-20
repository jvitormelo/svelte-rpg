import { writable } from 'svelte/store';

interface State {
	duration: number;
	name: string;
	image: string;
}

export const skillAnimation = writable<State | null>(null);

export const playSkillAnimation = ({ duration = 2000, name = 'default', image }: State) => {
	skillAnimation.set({
		duration,
		name,
		image
	});

	return new Promise((resolve) =>
		setTimeout(() => {
			skillAnimation.set(null);
			resolve(true);
		}, duration)
	);
};
