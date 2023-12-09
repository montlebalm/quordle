import type { Progress } from '$lib/types';
import getGuessScore from './getGuessScore';

export default function getAnswerProgress(answer: string, guesses: string[]): Progress {
	const closeSet = new Set<string>();
	const correctSet = new Set<string>();
	const inertSet = new Set<string>();

	guesses.forEach((guess) => {
		for (let i = 0; i < answer.length; i++) {
			const score = getGuessScore(answer, guess, i);

			if (score === 'correct') {
				correctSet.add(guess[i]);
			} else if (score === 'close') {
				closeSet.add(guess[i]);
			} else {
				inertSet.add(guess[i]);
			}
		}
	});

	return {
		close: [...closeSet].filter((letter) => !correctSet.has(letter)),
		correct: [...correctSet],
		inert: [...inertSet]
	};
}
