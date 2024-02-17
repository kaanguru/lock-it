<script lang="ts">
	export let data;
</script>

<div class="flex flex-col"></div>
<p>Computer name: {data.selectedComputer?.name}</p>
{#if data.selectedComputer?.ipAddress}
	<p>Mac Address: {data.selectedComputer?.ipAddress}</p>
{/if}
