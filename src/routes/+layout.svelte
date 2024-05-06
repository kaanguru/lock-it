<script lang="ts">
	import '../app.postcss';
	import 'iconify-icon';
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { initializeStores, storePopup, Modal, TabGroup, TabAnchor } from '@skeletonlabs/skeleton';
	import EditComputerForm from '$lib/components/EditComputerForm.svelte';
	import { page } from '$app/stores';
	const modalRegistry = {
		EditComputerForm: { ref: EditComputerForm }
	};
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });
	initializeStores();
</script>

<Modal components={modalRegistry} />

<TabGroup
	justify="justify-center"
	active="variant-filled-primary text-light"
	hover="hover:variant-soft-primary"
	flex="flex-1 lg:flex-none"
	rounded=""
	border=""
	class="bg-surface-100-800-token w-full mb-6"
>
	<TabAnchor href="/" selected={$page.url.pathname === '/'} title="Home">
		<svelte:fragment slot="lead">
			<img src="/icons/favicon-32x32.png" alt="lockit" class="ps-1 pb-2" />
		</svelte:fragment>
		<span>LockIT</span>
	</TabAnchor>
	<TabAnchor href="/computers" title="Computers" selected={$page.url.pathname === '/computers'}>
		<svelte:fragment slot="lead">
			<iconify-icon icon="fxemoji:threenetworkedcomputers" height="2em"></iconify-icon>
		</svelte:fragment>
		<span>Computers</span>
	</TabAnchor>
</TabGroup>

<!-- Page Route Content -->
<slot />
