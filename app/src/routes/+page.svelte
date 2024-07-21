<script lang="ts">
	import CryptoJS from 'crypto-js';
	import { writable } from 'svelte/store';
	export let data;
	let plainTextPassword = '';
	let plainTextPasswordtoSave = '';
	const loggedIn = writable(false);
	const authToken = writable('');
	let visiblePasswordInputArea = false;
	let loin = false;
	loggedIn.subscribe((v) => {
		console.log(v);
		loin = v;
	});
	async function unlock() {
		console.log('ℹ  ~ plainTextPassword:', plainTextPassword);
		console.log('ℹ  ~ Passwords data.secret', data.secret);
		const hash = CryptoJS.HmacMD5(plainTextPassword, data.secret);
		console.log('ℹ  ~ unlock ~ hash:', hash.toString(CryptoJS.enc.Base64));
		authToken.subscribe((v) =>
			v.length !== 0 || v === hash.toString(CryptoJS.enc.Base64) ? (loin = true) : (loin = false)
		);
	}

	function save() {
		console.log('ℹ  ~ plainTextPasswordtoSave:', plainTextPasswordtoSave);
		console.log('ℹ  ~ Passwords data.secret', data.secret);
		const hash = CryptoJS.HmacMD5(plainTextPasswordtoSave, data.secret);
		authToken.set(hash.toString(CryptoJS.enc.Base64));
		authToken.subscribe((v) => console.log('saved', v));
	}
	function toggleEye(event: MouseEvent) {
		visiblePasswordInputArea = !visiblePasswordInputArea;
	}
</script>

{#if loin}
	<div class="flex flex-col text-center">
		<h1>Hello friend!</h1>
		<img src="img/lockit-logo.png" alt="logo" />
		<p>Enter your Password to go on</p>
		<form on:submit|preventDefault={unlock}>
			<div class="input-group input-group-divider grid-cols-[1fr_auto]">
				<input
					type={visiblePasswordInputArea ? 'text' : 'password'}
					bind:value={plainTextPasswordtoSave}
					placeholder="Enter main password"
					required
				/>
				<button type="button" on:click={toggleEye} class="btn-icon btn-icon-md variant-filled">
					<iconify-icon icon="la:eye"></iconify-icon>
				</button>
			</div>
			<button type="submit">UnLock</button>
		</form>
	</div>
{:else}
	<div class="flex flex-col text-center">
		<h1>Hello stranger!</h1>
		<img src="img/lockit-logo.png" alt="logo" />
		<p>Enter a Password which will be your main password after all</p>
		<form on:submit|preventDefault={save}>
			<div class="input-group input-group-divider grid-cols-[1fr_auto]">
				<input
					type={visiblePasswordInputArea ? 'text' : 'password'}
					bind:value={plainTextPasswordtoSave}
					placeholder="Enter main password"
					required
				/>
				<button type="button" on:click={toggleEye} class="btn-icon btn-icon-md variant-filled">
					{#if visiblePasswordInputArea}
						<iconify-icon icon="la:eye"></iconify-icon>
					{:else}
						<iconify-icon icon="la:eye-slash"></iconify-icon>
					{/if}
				</button>
			</div>
			<button type="submit">Save</button>
		</form>
	</div>
{/if}

<style>
	img {
		@apply py-9;
	}
</style>
