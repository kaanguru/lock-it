<script lang="ts">
	import { _computerSchema } from '$lib/db';
	import { Table, tableMapperValues } from '@skeletonlabs/skeleton';
	import { goto } from '$app/navigation';
	let { data } = $props();

	const tableConstruction = {
		head: ['Name', 'IP Address'],
		body: tableMapperValues(data.computers, ['name', 'ipAddress']),
		meta: tableMapperValues(data.computers, ['id']),
		foot: ['Total', `<code class="code">${data.computers.length}</code>`]
	};

	function navigateToComputer(event: CustomEvent<string[]>) {
		const selectedComputerId = event.detail[0];
		goto(`/computers/computer/${selectedComputerId}`);
	}
</script>

<div class="mx-auto max-w-md flex basis-2 flex-col">
	<a
		href="/computers/add"
		class="btn variant-soft-primary justify-end"
		data-sveltekit-preload-data="hover">➕ 🖥️</a
	>
	{#if !data.computers}
		<p>No computers found.</p>
	{:else}
		<Table source={tableConstruction} interactive={true} on:selected={navigateToComputer} />
	{/if}
</div>
