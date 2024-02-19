<script lang="ts">
	import { _computerSchema } from '$lib/db';
	import { goto } from '$app/navigation';
	import { DataHandler } from '@vincjo/datatables';
	import Search from '$lib/components/table/Search.svelte';
	import ThFilter from '$lib/components/table/ThFilter.svelte';
	import ThSort from '$lib/components/table/ThSort.svelte';
	import RowCount from '$lib/components/table/RowCount.svelte';
	import RowsPerPage from '$lib/components/table/RowsPerPage.svelte';
	import Pagination from '$lib/components/table/Pagination.svelte';

	export let data;
	const handler = new DataHandler(data.computers, { rowsPerPage: 10 });
	const rows = handler.getRows();
	function navigateToComputer(i: string | number) {
		goto(`/computers/computer/${i.toString()}`);
		return null;
	}
</script>

<div class="mx-auto max-w-md flex basis-2 flex-col">
	<a
		href="/computers/add"
		class="btn variant-soft-primary justify-end"
		data-sveltekit-preload-data="hover">➕ 🖥️</a
	>

	<div class=" overflow-x-auto space-y-2">
		<header class="flex justify-between gap-4">
			<Search {handler} />
			<RowsPerPage {handler} />
		</header>
		<table class="table table-hover table-compact table-auto w-full">
			<thead>
				<tr>
					<ThSort {handler} orderBy="name">Name</ThSort>
					<ThSort {handler} orderBy="ipAddress">Ip Address</ThSort>
					<ThSort {handler} orderBy="macAddress">Mac Address</ThSort>
				</tr>
				<tr>
					<ThFilter {handler} filterBy="name" />
					<ThFilter {handler} filterBy="ipAddress" />
					<ThFilter {handler} filterBy="macAddress" />
				</tr>
			</thead>
			<tbody>
				{#each $rows as row}
					<tr on:click={row.id ? navigateToComputer(row.id) : undefined}>
						<td>{row.name}</td>
						<td>{row.ipAddress}</td>
						<td>{row.macAddress}</td>
					</tr>
				{/each}
			</tbody>
		</table>
		<footer class="flex justify-between">
			<RowCount {handler} />
			<Pagination {handler} />
		</footer>
	</div>
</div>
