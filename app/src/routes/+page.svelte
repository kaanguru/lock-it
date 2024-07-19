<script lang="ts">
	import CryptoJS from 'crypto-js';
	import { writable } from 'svelte/store';
	export let data;
	let plainTextPassword = '';
	let plainTextPasswordtoSave = '';
	const loggedIn = writable(false);
	const authToken = writable('');
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
</script>

{#if loin}
	<div class="flex flex-col text-center">
		<h1>Hello friend!</h1>
		<img src="img/lockit-logo.png" alt="logo" />
		<p>Enter your Password to go on</p>
		<form on:submit|preventDefault={unlock}>
			<input type="password" bind:value={plainTextPassword} placeholder="Enter main password" required />
			<button type="submit">Unlock</button>
		</form>
	</div>
{:else}
	<div class="flex flex-col text-center">
		<h1>Hello stranger!</h1>
		<img src="img/lockit-logo.png" alt="logo" />
		<p>Enter a Password which will be your main password after all</p>
		<form on:submit|preventDefault={save}>
			<input type="password" bind:value={plainTextPasswordtoSave} placeholder="Enter main password" required />
			<button type="submit">Save</button>
		</form>
	</div>
{/if}

<style>
	img {
		@apply py-9;
	}
</style>
