<script lang="ts">
	import { goto } from '$app/navigation';
	import AddComputerForm from '$lib/components/AddComputerForm.svelte';
	import { loggedIn } from '$lib/store';

	loggedIn.subscribe((v) => {
		if (v) {
			console.log('🟩');
		} else {
			console.log('🟥');
			goto('/');
		}
	});
</script>

<div class="flex justify-center">
	<AddComputerForm />
</div>
