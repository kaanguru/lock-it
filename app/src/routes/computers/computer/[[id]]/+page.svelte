<script lang="ts">
	import { getModalStore, type ModalSettings } from '@skeletonlabs/skeleton';
	import { selectedComputer } from '$lib/store';
	import { deleteComputer } from '$lib/db';
	import { goto } from '$app/navigation';
	import { loggedIn } from '$lib/store';

	loggedIn.subscribe((v) => {
		if (v) {
			console.log('🟩');
		} else {
			console.log('🟥');
			goto('/');
		}
	});
	const modalStore = getModalStore();
	export let data;
	selectedComputer.set(data.selectedComputer);
	const modal: ModalSettings = {
		type: 'component',
		component: 'EditComputerForm'
	};

	async function deleteAndTurntoList() {
		await deleteComputer(data.selectedComputer.id);
		goto(`/computers/`);
	}
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
			<button type="button" class="icon-button" on:click={() => modalStore.trigger(modal)}>
				<iconify-icon icon="lucide:edit"></iconify-icon>
			</button>
			<button type="button" class="icon-button" on:click={() => deleteAndTurntoList()}>
				<iconify-icon icon="lucide:trash"></iconify-icon>
			</button>
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
