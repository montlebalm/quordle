<script lang="ts">
	const { answer, guesses, input } = $props<{
		answer: string;
		guesses: string[];
		input: string;
	}>();

	// Why can't we use `$derived` here?
	let answerIndex: number = $state(0);
	$effect(() => {
		answerIndex = guesses.indexOf(answer);
	});
</script>

<ul class="tile-set" role="list">
	{#each Array(9) as _, guessIndex}
		{@const guess = guesses[guessIndex]}
		{@const inert = answerIndex !== -1 && guessIndex > answerIndex}

		<li class="tile-row" class:inert>
			{#each Array(5) as _, letterIndex}
				{@const guessLetter = guess?.[letterIndex]}
				{@const inputLetter = input[letterIndex]}

				<span
					class="tile"
					class:active={guessIndex === guesses.length}
					class:close={!inert && answer.includes(guessLetter)}
					class:correct={!inert && answer[letterIndex] === guessLetter}
				>
					{#if !inert}
						{#if guessLetter}
							{guessLetter}
						{:else if guessIndex === guesses.length}
							{inputLetter}
						{/if}
					{/if}
				</span>
			{/each}
		</li>
	{/each}
</ul>

<style lang="scss">
	@import '$lib/styles/_variables.scss';

	$tile-size: 30px;

	.tile-set {
		display: flex;
		flex-direction: column;
		gap: 4px;
	}

	.tile-row {
		display: flex;
		gap: 4px;

		&.inert .tile.active {
			background: $color-bg-1;
		}
	}

	.tile {
		align-items: center;
		background: $color-bg-1;
		border-radius: 4px;
		display: flex;
		font-family: $font-mono;
		height: $tile-size;
		justify-content: center;
		text-transform: uppercase;
		transition: height 200ms;
		width: $tile-size * 2;

		&.active {
			background: $color-inert;
			font-size: 1.8em;
			height: $tile-size * 2;
		}

		&.close {
			background: $color-close;
		}

		&.correct {
			background: $color-correct;
		}
	}
</style>
