import { db } from '$lib/db';
export const load = async () => {
	const secret = import.meta.env.VITE_PUBLIC_SECRET_KEY;

	const authTokenCount = await db.authToken.count();
	const firstTime = authTokenCount === 0;
	console.log('ℹ  ~ load ~ firstTime:', firstTime);

	return {
		secret,
		firstTime
	};
};
