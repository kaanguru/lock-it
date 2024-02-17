<script lang="ts">
	export let data;
</script>

<div class="flex flex-col"></div>
<h1> {data.selectedComputer?.name}</h1>
{#if data.selectedComputer?.ipAddress}
	<p>Mac Address: {data.selectedComputer?.macAddress}</p>
{/if}
