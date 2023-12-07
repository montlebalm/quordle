export default function getGuessEmoji(answer: string, guess: string): string {
	const emoji: string[] = [];

	for (let i = 0; i < answer.length; i++) {
		const answerLetter = answer[i];
		const guessLetter = guess[i];

		if (answerLetter === guessLetter) {
			emoji.push('🟩');
		} else if (answer.includes(guessLetter)) {
			emoji.push('🟨');
		} else {
			emoji.push('⬜️');
		}
	}

	return emoji.join('');
}
