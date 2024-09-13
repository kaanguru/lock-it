<script lang="ts">
	import { goto, invalidateAll } from '$app/navigation';
	import { db, setToken } from '$lib/db';
	import MainPasswordInputArea from '../lib/components/MainPasswordInputArea.svelte';
	import CryptoJS from 'crypto-js';
	import { loggedIn } from '$lib/store';
	export let data;
	let plainTextPassword: string;
	let shortPassword = false;
	loggedIn.subscribe((v) => {
		if (v) {
			console.log('🟩');
			goto('/computers');
		} else {
			console.log('🟥');
			goto('/');
		}
	});
	function handleUpdate(event: CustomEvent<string>) {
		plainTextPassword = event.detail;
	}
	async function unlock() {
		console.log('ℹ  ~ plainTextPassword:', plainTextPassword);
		console.log('ℹ  ~ Passwords data.secret', data.secret);
		const hash = CryptoJS.HmacMD5(plainTextPassword, data.secret);
		console.log('ℹ  ~ unlock ~ hash:', hash.toString(CryptoJS.enc.Base64));

		data.authToken.token.length !== 0 && data.authToken.token === hash.toString(CryptoJS.enc.Base64)
			? loggedIn.set(true)
			: loggedIn.set(false);
	}

	async function saveMasterPass() {
		console.log('ℹ  ~ plainTextPasswordtoSave:', plainTextPassword);
		console.log('ℹ  ~ data.secret is: ', data.secret);
		if (plainTextPassword.length > 3) {
			shortPassword = false;
			const hash = CryptoJS.HmacMD5(plainTextPassword, data.secret);
			setToken(hash.toString(CryptoJS.enc.Base64));
			const tok = await db.authToken.get(0);
			console.log('saved', tok);
			invalidateAll();
			goto('/');
		} else {
			shortPassword = true;
		}
	}
	if (data.firstTime) {
		console.log('ℹ  ~ load ~ firstTime');
	}
</script>

<div class="orta-kolon">
	{#if data.firstTime}
		<h1>Hello stranger!</h1>
		<img src="img/lockit-logo.png" alt="logo" />
		<p>Enter a strong Password which will be your main password after all</p>
		<form on:submit|preventDefault={saveMasterPass}>
			<MainPasswordInputArea submit="Save Your Main Password" on:update={handleUpdate}></MainPasswordInputArea>
		</form>
	{:else}
		<h1>Hello friend!</h1>
		<img src="img/lockit-logo.png" alt="logo" />
		<p>Enter your Password to go on</p>
		<form on:submit|preventDefault={unlock}>
			<MainPasswordInputArea submit="UnLock" on:update={handleUpdate}></MainPasswordInputArea>
		</form>
	{/if}
	{#if shortPassword}
		<h4>Try longer password</h4>
	{/if}
</div>

<style>
	img {
		@apply py-9;
	}
	.orta-kolon {
		@apply flex flex-col text-center;
	}
</style>
