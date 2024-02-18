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
			<label for="ul">Computers</label>
			<ul>
				{#each data.computers as computer}
					<li>
						<a href="/computers/computer/{computer.id}">
							<span class="badge bg-primary-500">🖥️</span>
							<span class="flex-auto">
								<dt>{computer.name}</dt>
								<dd>{computer.removeConnectionSoftware}</dd>
								<dd>{computer.ipAddress}</dd>
							</span>
						</a>
					</li>
				{/each}
			</ul>
		</nav>
	{/if}
</div>
