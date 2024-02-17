<script lang="ts">
	import { _computerSchema } from '$lib/db';
	import { Table, tableMapperValues } from '@skeletonlabs/skeleton';
	import { goto } from '$app/navigation';
	export let data;

	const tableConstruction = {
		head: ['Name', 'IP Address', 'Mac Address'],
		body: tableMapperValues(data.computers, ['name', 'ipAddress', 'macAddress']),
		meta: tableMapperValues(data.computers, ['id']),
		foot: ['Total', '', `<code class="code">${data.computers.length}</code>`]
	};

	function navigateToComputer(event: CustomEvent<string[]>) {
		const selectedComputerId = event.detail[0];
		goto(`/computers/computer/${selectedComputerId}`);
	}
</script>

{#if !data.computers}
	<p>No computers found.</p>
{:else}
	<Table source={tableConstruction} interactive={true} on:selected={navigateToComputer} />
{/if}