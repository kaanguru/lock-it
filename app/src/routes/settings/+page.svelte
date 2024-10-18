<script lang="ts">
	import { onMount } from 'svelte';
	import { exportComputersData, type Computer } from '$lib/db';
	import { PrepareForExportThenSave } from '$lib/ComputerExporter';
	import { decryptData } from '$lib/crypt';
	import CryptoES from 'crypto-es';

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
		input.onchange = async (event: Event) => {
			const target = event.target as HTMLInputElement;
			if (!target.files || target.files.length === 0) return;
			const file = target.files[0];
			const reader = new FileReader();
			reader.onload = async (e) => {
				if (typeof e.target?.result !== 'string') return;
				try {
					const data = JSON.parse(decryptData(JSON.parse(e.target.result)).toString(CryptoES.enc.Utf8))[0];

					console.log('ℹ  ~ reader.onload= ~ data:', data[0].name);
				} catch (error) {
					console.error('Error parsing JSON file:', error);
				}
			};
			reader.readAsText(file);
		};
		input.click();
	}
</script>

<button type="button" on:click={() => saver.handleExport()}>Export computers Data</button>
<button type="button" on:click={() => handleImport()}>upload</button>

<style>
	button {
		@apply mx-3;
	}
</style>
