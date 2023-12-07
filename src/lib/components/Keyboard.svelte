<script lang="ts">
	import { ALPHABET_QUERTY } from '$lib/constants';
	import type { Progress } from '$lib/types';
	import getAnswerProgress from '$lib/utilities/getAnswerProgress';

	//
	// Constants
	//

	const ALPHABET_ROWS = [
		ALPHABET_QUERTY.slice(0, 10),
		ALPHABET_QUERTY.slice(10, 19),
		ALPHABET_QUERTY.slice(19, 26)
	];

	//
	// Props
	//

	const { answers, guesses, onKey } = $props<{
		answers: string[];
		guesses: string[];
		onKey: (key: KeyboardEvent['key']) => void;
	}>();

	//
	// State
	//

	const answerProgress: Progress[] = $derived(
		answers.map((answer) => getAnswerProgress(answer, guesses))
	);
</script>

<div class="keyboard">
	{#each ALPHABET_ROWS as row}
		<div class="keyboard-row">
			{#each row as letter}
				<button class="keyboard-key" onclick={() => onKey(letter)}>
					{#each answerProgress as progress}
						<span
							class="keyboard-key-quadrant"
							class:close={progress.close.includes(letter)}
							class:correct={progress.correct.includes(letter)}
							class:inert={progress.inert.includes(letter)}
						/>
					{/each}
					<span class="keyboard-key-letter">{letter}</span>
				</button>
			{/each}
		</div>
	{/each}
</div>

<style lang="scss">
	@import '$lib/styles/_variables.scss';

	$key-size: 40px;

	.keyboard {
		align-items: center;
		display: flex;
		flex-direction: column;
		gap: 4px;
		justify-content: center;
	}

	.keyboard-row {
		display: flex;
		gap: 4px;
	}

	.keyboard-key {
		background: transparent;
		border-radius: 4px;
		border: 1px solid $color-bg-2;
		cursor: pointer;
		font-family: $font-mono;
		overflow: hidden;
		padding: 0;
		position: relative;
		text-transform: uppercase;
	}

	.keyboard-key-letter {
		align-items: center;
		display: flex;
		height: $key-size;
		justify-content: center;
		width: $key-size;
	}

	.keyboard-key-quadrant {
		height: $key-size / 2;
		position: absolute;
		width: $key-size / 2;
		z-index: -1;

		&:nth-child(1) {
			top: 0;
			left: 0;
		}
		&:nth-child(2) {
			top: 0;
			right: 0;
		}
		&:nth-child(3) {
			bottom: 0;
			left: 0;
		}
		&:nth-child(4) {
			bottom: 0;
			right: 0;
		}

		&.close {
			background: $color-close;
		}

		&.correct {
			background: $color-correct;
		}

		&.inert {
			background: $color-inert;
		}
	}
</style>
