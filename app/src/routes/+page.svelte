<script lang="ts">
	import MainPasswordInputArea from '../lib/components/MainPasswordInputArea.svelte';
	import CryptoJS from 'crypto-js';
	import { writable } from 'svelte/store';
	export let data;
	let plainTextPassword = 'test';
	const loggedIn = writable(false);
	const authToken = writable('');

	loggedIn.subscribe((v) => {
		console.log('loggedIn:' + v);
	});
	function handleUpdate(event: CustomEvent<string>) {
		plainTextPassword = event.detail;
	}
	async function unlock() {
		console.log('ℹ  ~ plainTextPassword:', plainTextPassword);
		console.log('ℹ  ~ Passwords data.secret', data.secret);
		const hash = CryptoJS.HmacMD5(plainTextPassword, data.secret);
		console.log('ℹ  ~ unlock ~ hash:', hash.toString(CryptoJS.enc.Base64));
		authToken.subscribe((v) =>
			v.length !== 0 || v === hash.toString(CryptoJS.enc.Base64) ? loggedIn.set(true) : loggedIn.set(false)
		);
	}

	function saveMasterPass() {
		console.log('ℹ  ~ plainTextPasswordtoSave:', plainTextPassword);
		console.log('ℹ  ~ Passwords data.secret', data.secret);
		const hash = CryptoJS.HmacMD5(plainTextPassword, data.secret);
		authToken.set(hash.toString(CryptoJS.enc.Base64));
		authToken.subscribe((v) => console.log('saved', v));
	}
</script>

{#if data.firstTime}
	<div class="flex flex-col text-center">
		<h1>Hello stranger!</h1>
		<img src="img/lockit-logo.png" alt="logo" />
		<p>Enter a Password which will be your main password after all</p>
		<form on:submit|preventDefault={saveMasterPass}>
			<MainPasswordInputArea submit="Save Your Main Password" on:update={handleUpdate}></MainPasswordInputArea>
		</form>
	</div>
{:else}
	<div class="flex flex-col text-center">
		<h1>Hello friend!</h1>
		<img src="img/lockit-logo.png" alt="logo" />
		<p>Enter your Password to go on</p>
		<form on:submit|preventDefault={unlock}>
			<MainPasswordInputArea submit="UnLock" on:update={handleUpdate}></MainPasswordInputArea>
		</form>
	</div>
{/if}

<style>
	img {
		@apply py-9;
	}
</style>
