import { writable } from 'svelte/store';

export const skillSound = writable<string | null>(null);

export const playSkillSound = (sound: string) => {
	skillSound.set(sound);
};

export const stopSkillSound = () => {
	skillSound.set(null);
};

export const spawnSound = async (src: string) => {
	const audio = new Audio(src);
	await audio.play();
	audio.remove();
};
