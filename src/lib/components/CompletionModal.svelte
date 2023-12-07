<script lang="ts">
	import Modal from '$lib/components/Modal.svelte';
	import { CONGRATULATIONS, CONSOLATIONS } from '$lib/constants';
	import getGuessEmoji from '$lib/utilities/getGuessEmoji';
	import _intersection from 'lodash/intersection';
	import _sample from 'lodash/sample';

	//
	// Props
	//

	const { answers, guesses } = $props<{
		answers: string[];
		guesses: string[];
	}>();

	//
	// State
	//

	let completion: 'success' | 'failure' | undefined = $state();

	// Detect completion
	$effect(() => {
		const numAnswered = _intersection(answers, guesses).length;

		if (numAnswered === 4) {
			completion = 'success';
		} else if (guesses.length === 9) {
			completion = 'failure';
		}
	});
</script>

<Modal showModal={!!completion}>
	{#snippet children()}
		<div class="body">
			{#if completion === 'success'}
				<h1>Success!</h1>
				<p>{_sample(CONGRATULATIONS)}</p>
			{:else if completion === 'failure'}
				<h1>So close!</h1>
				<p>{_sample(CONSOLATIONS)}</p>
			{/if}

			<div class="results">
				{#each answers as answer, i}
					<div style="grid-area: answer-{i}">
						<div class="results-answer">{answer}</div>
						<ul class="results-list" role="list">
							{#each guesses as guess}
								<li class="results-row">{getGuessEmoji(answer, guess)}</li>
							{/each}
						</ul>
					</div>
				{/each}
			</div>
		</div>
	{/snippet}
</Modal>

<style lang="scss">
	@import '$lib/styles/_variables.scss';

	.body {
		display: flex;
		flex-direction: column;
		font-family: $font-body;
		gap: 8px;
		padding: 20px;
	}

	.results {
		display: grid;
		gap: 20px;
		grid-template-areas:
			'answer-0 answer-1'
			'answer-2 answer-3';
		margin: 8px auto;
		width: 50%;
	}

	.results-answer {
		font-family: $font-mono;
		letter-spacing: 6px;
		margin-bottom: 4px;
		padding: 0 3px;
	}

	.results-row {
		line-height: 1;
	}
</style>
