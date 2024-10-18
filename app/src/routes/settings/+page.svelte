<script lang="ts">
	import { exportComputersData } from '$lib/db';

	async function handleExport() {
		try {
			const data = await exportComputersData();
			// Create a Blob with the exported data
			const blob = new Blob([JSON.stringify(data)], { type: 'application/json' });

			// Create a download link
			const url = URL.createObjectURL(blob);
			const a = document.createElement('a');
			a.href = url;
			a.download = 'database_backup.json';

			// Trigger the download
			document.body.appendChild(a);
			a.click();

			// Clean up
			document.body.removeChild(a);
			URL.revokeObjectURL(url);
		} catch (error) {
			console.error('Error exporting database:', error);
			// Handle error (e.g., show an error message to the user)
		}
	}
</script>

<button type="button" on:click={handleExport}>Export computers Data</button>
