<script lang="ts">
	import { setMessage, superForm, defaults } from 'sveltekit-superforms/client';
	import { _computerSchema, addComputer } from '$lib/db';
	import { zod } from 'sveltekit-superforms/adapters';
	
	const addComputerAndSetMessage = async ({form}: {form: any}):Promise<void> => {
		if (form.valid) {
			await addComputer(form.data);
			setMessage(form, `Computer: ${form.data.name} has been added!`);
		} else {
			setMessage(form, 'Form is invalid!');
		}
	};
	const { form, errors, constraints, enhance, message } = superForm(
		defaults(zod(_computerSchema)),
		{
			SPA: true,
			validators: zod(_computerSchema),
			onUpdate: addComputerAndSetMessage,
		}
	);
</script>

<form method="POST" use:enhance>
	{#if $message}<p>{$message}</p>{/if}
	<p>
		<label>
			<span>Name</span>
			<input
				title="Name"
				type="text"
				placeholder="Name"
				class={$errors.name ? 'input-error' : undefined}
				aria-invalid={$errors.name ? 'true' : undefined}
				bind:value={$form.name}
				{...$constraints.name}
			/>
			{#if $errors.name}<span class="error">{$errors.name}</span>{/if}
		</label>
		<label>
			<span>IP Address</span>
			<input
				title="IP Address"
				type="text"
				placeholder="IP Address"
				class={$errors.ipAddress ? 'input-error' : undefined}
				aria-invalid={$errors.ipAddress ? 'true' : undefined}
				bind:value={$form.ipAddress}
				{...$constraints.ipAddress}
			/>
			{#if $errors.ipAddress}<span class="error">{$errors.ipAddress}</span>{/if}
		</label>
		<label>
			<span>Mac Address</span>
			<input
				title="Mac Address"
				type="text"
				placeholder="Mac Address"
				class={$errors.macAddress ? 'input-error' : undefined}
				aria-invalid={$errors.macAddress ? 'true' : undefined}
				bind:value={$form.macAddress}
				{...$constraints.macAddress}
			/>
			{#if $errors.macAddress}<span class="error">{$errors.macAddress}</span>{/if}
		</label>
		<label>
			<span>Memory</span>
			<input
				title="Memory"
				type="number"
				placeholder="16"
				class={$errors.memory ? 'input-error' : undefined}
				aria-invalid={$errors.memory ? 'true' : undefined}
				bind:value={$form.memory}
				{...$constraints.memory}
			/>
			{#if $errors.memory}<span class="error">{$errors.memory}</span>{/if}
		</label>

		
	</p>
	<button>Add Computer</button>
</form>
