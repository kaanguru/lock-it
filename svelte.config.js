import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte'],
	vitePlugin: {
		inspector: true
	},
	kit: {
		adapter: adapter()
	}
};
export default config;
