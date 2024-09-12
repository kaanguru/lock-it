<script lang="ts">
	import { db, setToken } from '$lib/db';
	import MainPasswordInputArea from '../lib/components/MainPasswordInputArea.svelte';
	import CryptoJS from 'crypto-js';
	import { writable } from 'svelte/store';
	export let data;
	let plainTextPassword = 'test';
	const loggedIn = writable(false);

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

		data.authToken.token.length !== 0 || data.authToken.token === hash.toString(CryptoJS.enc.Base64)
			? loggedIn.set(true)
			: loggedIn.set(false);
	}

	function saveMasterPass() {
		console.log('ℹ  ~ plainTextPasswordtoSave:', plainTextPassword);
		console.log('ℹ  ~ Passwords data.secret', data.secret);
		const hash = CryptoJS.HmacMD5(plainTextPassword, data.secret);
		setToken(hash.toString(CryptoJS.enc.Base64));
		console.log('saved', data.authToken.token);
	}
	console.log('ℹ  ~ load ~ firstTime:', data.firstTime);
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
