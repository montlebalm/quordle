/**
 * Determine whether a letter index corresponds to a "correct" or "close" guess.
 */
export default function getGuessScore(
	answer: string,
	guess: string,
	index: number
): 'correct' | 'close' | undefined {
	if (answer[index] === guess[index]) return 'correct';

	if (answer.includes(guess[index])) return 'close';
}
