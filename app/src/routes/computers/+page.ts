import { goto } from '$app/navigation';
import { db } from '$lib/db';
import { loggedIn } from '$lib/store';

loggedIn.subscribe((v) => {
	console.log('🟥 loggedIn:' + v);
	if (v) {
		goto('/computers');
	} else {
		goto('/');
	}
});
export const load = async () => {
	const computers = await db.computers.limit(99).toArray();
	if (computers.length < 1) {
		goto('/computers/add');
	}

	return { computers };
};
