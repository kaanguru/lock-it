<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	export let submit: string;
	let plainTextPassword: string;
	const dispatch = createEventDispatcher();
	let visiblePasswordInputArea = false;
	function toggleEye(event: MouseEvent) {
		visiblePasswordInputArea = !visiblePasswordInputArea;
		console.log('ℹ  ~ plainTextPassword:', plainTextPassword);
	}
	function updateValue(event: Event) {
		plainTextPassword = (event.target as HTMLInputElement).value;
		dispatch('update', plainTextPassword);
	}
</script>

<div class="input-group input-group-divider grid-cols-[1fr_auto]">
	<input
		type={visiblePasswordInputArea ? 'text' : 'password'}
		bind:value={plainTextPassword}
		placeholder="Enter main password"
		required
		on:input={updateValue}
	/>
	<button type="button" on:click={toggleEye} class="btn-icon btn-icon-md variant-filled">
		{#if visiblePasswordInputArea}
			<iconify-icon icon="la:eye"></iconify-icon>
		{:else}
			<iconify-icon icon="la:eye-slash"></iconify-icon>
		{/if}
	</button>
</div>
<button type="submit">{submit}</button>
