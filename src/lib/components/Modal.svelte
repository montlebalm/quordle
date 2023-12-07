<script lang="ts">
	//
	// Props
	//

	const { children, showModal } = $props<{
		children: () => any; // TODO: type
		showModal: boolean;
	}>();

	//
	// State
	//

	let dialog: HTMLDialogElement | undefined = $state();

	//
	// Lifecycle
	//

	$effect(() => {
		if (showModal) {
			dialog?.showModal();
		}
	});
</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<dialog bind:this={dialog}>
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div on:click|stopPropagation>
		{#if showModal}
			{@render children()}
		{/if}
	</div>
</dialog>

<style lang="scss">
	dialog {
		border-radius: 8px;
		border: none;
		max-width: 32em;
		padding: 0;

		&::backdrop {
			background: rgba(0, 0, 0, 0.3);
		}

		&[open] {
			animation: zoom 300ms cubic-bezier(0.34, 1.56, 0.64, 1);

			&::backdrop {
				animation: fade 200ms ease-out;
			}
		}
	}

	@keyframes zoom {
		from {
			transform: scale(0.95);
		}
		to {
			transform: scale(1);
		}
	}

	@keyframes fade {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
</style>
