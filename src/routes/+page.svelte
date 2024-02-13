<script lang="ts">
	import AddComputerForm from '$lib/components/AddComputerForm.svelte';
</script>

<div class="containpage">
	<div class="coln">
		<AddComputerForm />
	</div>
</div>

<style lang="postcss">
	.containpage {
		@apply container h-full mx-auto flex justify-center items-center;
	}
	.coln {
		@apply space-y-5 text-center flex flex-col items-center;
	}
</style>
