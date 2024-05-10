export function load({ cookies }) {
	const visited = cookies.get('visited');
	const secret = 'rainbow';
	cookies.set('visited', 'true', { path: '/' });
	return {
		visited,secret
	};
}