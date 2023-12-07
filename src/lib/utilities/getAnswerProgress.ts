import type { Progress } from '$lib/types';
import setAdd from './setAdd';

function getAnswerProgressForGuess(answer: string, guess: string): Progress {
	const progress: Progress = {
		close: [],
		correct: [],
		inert: []
	};

	for (let i = 0; i < answer.length; i++) {
		const answerLetter = answer[i];
		const guessLetter = guess[i];

		if (answerLetter === guessLetter) {
			progress.correct.push(answerLetter);
		} else if (answer.includes(guessLetter)) {
			progress.close.push(guessLetter);
		} else {
			progress.inert.push(guessLetter);
		}
	}

	return progress;
}

export default function getAnswerProgress(answer: string, guesses: string[]): Progress {
	const closeSet = new Set<string>();
	const correctSet = new Set<string>();
	const inertSet = new Set<string>();

	guesses.forEach((guess) => {
		const progress = getAnswerProgressForGuess(answer, guess);

		setAdd(closeSet, progress.close);
		setAdd(correctSet, progress.correct);
		setAdd(inertSet, progress.inert);
	});

	return {
		close: [...closeSet].filter((letter) => !correctSet.has(letter)),
		correct: [...correctSet],
		inert: [...inertSet]
	};
}
