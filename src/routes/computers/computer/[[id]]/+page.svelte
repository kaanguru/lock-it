<script lang="ts">
	export let data;
	type KeyType = keyof typeof data.selectedComputer;
</script>

<div class="flex max-w-md justify-center">
	<div class="card">
		<header class="card-header"><h1>{data.selectedComputer?.name}</h1></header>
		<section class="p-4">
			{#each Object.keys(data.selectedComputer) as key}
				{#if data.selectedComputer}
				<p>{key}: {data.selectedComputer[key]}</p>			{/each}
			<!-- {#if data.selectedComputer?.ipAddress}
				<p>IP Address: {data.selectedComputer?.ipAddress}</p>
			{/if}
			{#if data.selectedComputer?.macAddress}
				<p>IP Address: {data.selectedComputer?.macAddress}</p>
			{/if} -->
		</section>
		<footer class="card-footer">(footer)</footer>
	</div>
</div>
