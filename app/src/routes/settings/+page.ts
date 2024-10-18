import { db, exportComputersData } from '$lib/db';

export const load = async () => {
	return { db, exportDatabase: exportComputersData };
};
