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
				aria-invalid={$errors.name ? 'true' : undefined}
				bind:value={$form.name}
				{...$constraints.name}
			/>
		</label>
		{#if $errors.name}<span class="error">{$errors.name}</span>{/if}

		<label>
			<span>IP Address</span>
			<input
			title="IPAddress"
				aria-invalid={$errors.ipAddress ? 'true' : undefined}
				bind:value={$form.ipAddress}
				{...$constraints.ipAddress}
			/>
		</label>
		{#if $errors.ipAddress}<span class="error">{$errors.ipAddress}</span>{/if}
	</p>
	<button>Add Computer</button>
</form>
