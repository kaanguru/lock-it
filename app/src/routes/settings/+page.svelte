<script lang="ts">
	import { onMount } from 'svelte';
	import { exportComputersData, importDatabase, type Computer } from '$lib/db';
	import { PrepareForExportThenSave } from '$lib/ComputerExporter';
	import { decryptData } from '$lib/crypt';
	let computers: Computer[] = [];
	let saver: PrepareForExportThenSave;

	onMount(async () => {
		computers = await exportComputersData();
		saver = new PrepareForExportThenSave(computers);
	});
	function handleImport(): void {
		const input = document.createElement('input');
		input.type = 'file';
		input.accept = '.bak';
		input.click();

		input.onchange = async (event: Event) => {
			const target = event.target as HTMLInputElement;
			if (target.files?.length) {
				const file = target.files[0];
				const fileGetted: string = await new Response(file).json();
				const computers: Computer[] = JSON.parse(decryptData(fileGetted))[0];
				await importDatabase(computers);
			}
		};
	}
</script>

<button type="button" on:click={() => saver.handleExport()}>Export computers Data</button>
<button type="button" on:click={() => handleImport()}>upload</button>

<style>
	button {
		@apply mx-3;
	}
</style>
