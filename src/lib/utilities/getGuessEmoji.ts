import getGuessScore from './getGuessScore';

export default function getGuessEmoji(answer: string, guess: string): string {
	const emoji: string[] = [];

	for (let i = 0; i < answer.length; i++) {
		const score = getGuessScore(answer, guess, i);

		if (score === 'correct') {
			emoji.push('🟩');
		} else if (score === 'close') {
			emoji.push('🟨');
		} else {
			emoji.push('⬜️');
		}
	}

	return emoji.join('');
}
