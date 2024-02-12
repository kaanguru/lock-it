<script lang="ts">
	import { setMessage, superForm, defaults } from 'sveltekit-superforms/client';
	import { _userSchema, addUser } from '$lib/db';
	import { zod } from 'sveltekit-superforms/adapters'
	// @ts-ignore
	const handleOnUpdate = async ({ form }) => {
		try {
			const id = await addUser(form.data);
			setMessage(form, `User: ${form.data.name} has been added! with id: ${id}`);
			setTimeout(() => {
				reset({ keepMessage: true });
			}, 600);
		} catch (error) {
			console.error(error);
		}
	};
	const { form, errors, constraints, enhance, message, reset } = superForm(
		defaults(zod(_userSchema)),
		{
			SPA: true,
			validators: zod(_userSchema),
			onUpdate: handleOnUpdate
		}
	);
</script>

<form method="POST" use:enhance>
	{#if $message}<p>{$message}</p>{/if}
	<p>
		<label>
			Name<br />
			<input
				aria-invalid={$errors.name ? 'true' : undefined}
				bind:value={$form.name}
				{...$constraints.name}
			/>
		</label>
		{#if $errors.name}<span>{$errors.name}</span>{/if}

		<label>
			E-mail<br />
			<input
				type="email"
				aria-invalid={$errors.email ? 'true' : undefined}
				bind:value={$form.email}
				{...$constraints.email}
			/>
		</label>
		{#if $errors.email}<span>{$errors.email}</span>{/if}
	</p>
	<button>Submit</button>
</form>
