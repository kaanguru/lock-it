<script lang="ts">
	import { onMount } from 'svelte';
	import { exportComputersData, type Computer } from '$lib/db';
	import { PrepareForExportThenSave } from '$lib/ComputerExporter';
	let computers: Computer[] = [];
	let saver: PrepareForExportThenSave;

	onMount(async () => {
		computers = await exportComputersData();
		saver = new PrepareForExportThenSave(computers);
	});
</script>

<button type="button" on:click={() => saver.handleExport()}>Export computers Data</button>
