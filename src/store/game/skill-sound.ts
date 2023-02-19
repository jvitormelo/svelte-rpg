import { writable } from 'svelte/store';

export const skillSound = writable<string | null>(null);

export const playSkillSound = (sound: string) => {
	skillSound.set(sound);
};

export const stopSkillSound = () => {
	skillSound.set(null);
};
