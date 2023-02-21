export class Random {
	static generateRandomNumber(min: number, max: number): number {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	static pick<T>(array: T[]): T {
		const index = this.generateRandomNumber(0, array.length - 1);
		return array[index];
	}
}
