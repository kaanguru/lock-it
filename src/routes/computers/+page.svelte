<script lang="ts">
	import { _computerSchema } from '$lib/db';
	export let data;
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
						<a href={`/computers/computer/${computer.id}`} class="block">
							<span class="badge bg-primary-500">🖥️</span>
							<span class="flex-auto">
								<dt class="text-end">{computer.name}</dt>
								{#if computer.remoteConnectionId}
									<dd>
										<iconify-icon icon="material-symbols-light:numbers"
										></iconify-icon>{computer.remoteConnectionId}
									</dd>
								{/if}
								{#if computer.ipAddress}
									<dd>{computer.ipAddress}</dd>
								{/if}
							</span>
						</a>
					</li>
				{/each}
			</ul>
		</nav>
	{/if}
</div>
