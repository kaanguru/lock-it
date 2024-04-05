<script lang="ts">
	import { getModalStore, type ModalComponent, type ModalSettings } from '@skeletonlabs/skeleton';

	const modalStore = getModalStore();

	const modal: ModalSettings = {
		type: 'component',
		component: 'EditComputerForm'
	};

	export let data;
</script>

<div class="flex justify-center">
	<div class="card card-hover overflow-hidden">
		<header class="card-header"><h1>{data.selectedComputer?.name}</h1></header>
		<div class="p-4 space-y-4">
			<article>
				{#each Object.entries(data.selectedComputer) as [key, value]}
					<div class="flex items-center">
						{#if value}
							<p class="title">{key}:</p>
							<p class="value">{value}</p>
						{/if}
					</div>
				{/each}
			</article>
		</div>
		<footer class="card-footer">
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<iconify-icon icon="lucide:edit" on:click={() => modalStore.trigger(modal)}></iconify-icon>
		</footer>
	</div>
</div>

<style>
	.title {
		@apply mr-2 text-lg font-semibold text-primary-900 dark:text-white;
	}
	.value {
		@apply ml-auto text-base font-medium text-secondary-500;
	}
</style>
