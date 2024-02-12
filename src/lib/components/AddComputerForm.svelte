<script lang="ts">
	import { setMessage, superForm, defaults } from 'sveltekit-superforms/client';
	import { _computerSchema, addComputer } from '$lib/db';
	import { zod } from 'sveltekit-superforms/adapters';
	//@ts-ignore
	const handleOnUpdate = async ({ form }) => {
		try {
			if (form.valid) {
				console.log('ℹ  ~ handleOnUpdate ~ form.valid:', form.valid);

				const id = await addComputer(form.data);
				setMessage(form, `Computer: ${form.data.name} has been added! with id: ${id}`);
				setTimeout(() => {
					reset({ keepMessage: true });
				}, 600);
			} else {
				setMessage(form, 'Form is invalid!');
			}
		} catch (error) {
			console.error(error);
		}
	};
	const { form, errors, constraints, enhance, message, reset } = superForm(
		defaults(zod(_computerSchema)),
		{
			SPA: true,
			validators: zod(_computerSchema),
			onUpdate: handleOnUpdate
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
				aria-invalid={$errors.ipAddress ? 'true' : undefined}
				bind:value={$form.ipAddress}
				{...$constraints.ipAddress}
			/>
		</label>
		{#if $errors.ipAddress}<span class="error">{$errors.ipAddress}</span>{/if}
	</p>
	<button>Add Computer</button>
</form>
