<!-- EditComputerForm.svelte -->
<script>
	export let computer = {};
	let name = '';

	function handleSubmit() {
		// Logic to handle form submission
		console.log('Submitting form with name:', name);
		// Close the modal or perform other actions
	}
</script>

<form on:submit|preventDefault={handleSubmit}>
	<label>
		Name:
		<input bind:value={name} type="text" required />
	</label>
	<button type="submit">Submit</button>
</form>
