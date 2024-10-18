<script lang="ts">
	import { goto, invalidateAll } from '$app/navigation';
	import { db, setToken } from '$lib/db';
	import MainPasswordInputArea from '../lib/components/MainPasswordInputArea.svelte';
	import CryptoES from 'crypto-es';
	import { loggedIn } from '$lib/store';
	import { getToastStore } from '@skeletonlabs/skeleton';
	const toastStore = getToastStore();
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
		const hash = CryptoES.HmacMD5(plainTextPassword, data.secret);
		console.log('ℹ  ~ unlock ~ hash:', hash.toString(CryptoES.enc.Base64));

		data.authToken.token.length !== 0 && data.authToken.token === hash.toString(CryptoES.enc.Base64)
			? loggedIn.set(true)
			: loggedIn.set(false);
	}

	async function saveMasterPass() {
		if (plainTextPassword.length > 3) {
			shortPassword = false;
			const hash = CryptoES.HmacMD5(plainTextPassword, data.secret);
			setToken(hash.toString(CryptoES.enc.Base64));
			const { token } = await db.authToken.get(0);
			const decryptedToken = CryptoES.AES.decrypt(token, data.secret).toString(CryptoES.enc.Base64);

			toastStore.trigger({
				message: `You have Locked IT`
			});
			loggedIn.set(true);
			invalidateAll();
			goto('/computers');
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
