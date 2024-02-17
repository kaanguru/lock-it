import { db } from '$lib/db';
import { error } from '@sveltejs/kit';
export const load = async () => {
	const computers = await db.computers.limit(99).toArray();
	if (computers.length < 1 ) throw error(404, 'No Computers found. ');
	return { computers };
};
