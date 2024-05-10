<script lang="ts">
	import CryptoJS from 'crypto-js';
	export let data;
	let plainTextPassword = '';

	async function unlock() {
		console.log('ℹ  ~ plainTextPassword:', plainTextPassword);
		console.log('ℹ  ~ Passwords secret', data.secret);
		const hash = CryptoJS.HmacMD5(plainTextPassword, data.secret);
		console.log('ℹ  ~ unlock ~ hash:', hash.toString(CryptoJS.enc.Base64));
	}
</script>

{#if data.visited}
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
		<form on:submit|preventDefault={unlock}>
			<input type="password" bind:value={plainTextPassword} placeholder="Enter main password" required />
			<button type="submit">Unlock</button>
		</form>
	</div>
{/if}

<style>
	img {
		@apply py-9;
	}
</style>
