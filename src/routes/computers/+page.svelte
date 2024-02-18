<script lang="ts">
	import { _computerSchema } from '$lib/db';
	import { goto } from '$app/navigation';
	let { data } = $props();

</script>

<div class="mx-auto max-w-md flex basis-2 flex-col">
	<a
		href="/computers/add"
		class="btn variant-soft-primary justify-end"
		data-sveltekit-preload-data="hover">➕ 🖥️</a
	>
	{#if !data.computers}
		<p>No computers found.</p>
	{:else}
	
<nav class="list-nav">
	<!-- (optionally you can provide a label here) -->
	<ul>
		{#each data.computers  as computer}
					<li>
			<a href="/computers/computer/{computer.id}">
				<span class="badge bg-primary-500">({computer.id})</span>
				<span class="flex-auto">{computer.name}</span>
			</a>
		</li>
		{/each}

	</ul>
</nav>

	{/if}
</div>
