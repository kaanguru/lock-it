<script lang="ts">
	export let data;
</script>

<div class="flex max-w-md justify-center basis-2"></div>
<h1>{data.selectedComputer?.name}</h1>
{#if data.selectedComputer?.ipAddress}
	<p>Mac Address: {data.selectedComputer?.macAddress}</p>
{/if}
