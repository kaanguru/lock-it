export function load() {
	const secret = import.meta.env.VITE_PUBLIC_SECRET_KEY;
	return {
		secret
	};
}