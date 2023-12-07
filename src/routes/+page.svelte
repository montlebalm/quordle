<script lang="ts">
	import CompletionModal from '$lib/components/CompletionModal.svelte';
	import Keyboard from '$lib/components/Keyboard.svelte';
	import TileSet from '$lib/components/TileSet.svelte';
	import { ALPHABET_QUERTY } from '$lib/constants';
	import { onMount } from 'svelte';

	//
	// State
	//

	let answers: string[] = ['plate', 'smush', 'pinky', 'brain'];

	let guesses: string[] = $state([]);

	let input: string = $state('');

	//
	// Lifecycle
	//

	// Listen for keypresses
	onMount(() => {
		function handleKeyDown(e: KeyboardEvent) {
			// Ignore modifiers
			if (e.metaKey || e.ctrlKey || e.altKey || e.shiftKey) return;

			handleKey(e.key);
		}

		document.addEventListener('keydown', handleKeyDown);

		return () => {
			document.removeEventListener('keydown', handleKeyDown);
		};
	});

	//
	// Handlers
	//

	function handleKey(key: KeyboardEvent['key']) {
		const keyLower = key.toLowerCase();

		// Type
		if (ALPHABET_QUERTY.includes(keyLower) && input.length < 5) {
			input += keyLower;
			return;
		}

		// Delete
		if (key === 'Backspace') {
			input = input.slice(0, -1);
			return;
		}

		// Submit
		if (key === 'Enter' && input.length === 5) {
			guesses.push(input);

			// Reset
			input = '';
			return;
		}
	}
</script>

<div class="app">
	<div class="tile-sets">
		{#each answers as answer, i}
			<div style="grid-area: set-{i}">
				<TileSet {answer} {guesses} {input} />
			</div>
		{/each}
	</div>
	<div class="keyboard">
		<Keyboard {answers} {guesses} onKey={handleKey} />
	</div>
</div>

<CompletionModal {answers} {guesses} />

<style lang="scss">
	.app {
		align-items: center;
		display: flex;
		flex-direction: column;
		gap: 20px;
		max-height: 100%;
		min-height: 100%;
		justify-content: center;
		margin: 0 auto;
		padding: 20px;
	}

	// Convert to flexbox
	.tile-sets {
		display: grid;
		gap: 20px;
		grid-template-areas:
			'set-0 set-1'
			'set-2 set-3';
	}

	.keyboard {
		grid-area: keyboard;
	}
</style>
