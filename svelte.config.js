import preprocess from 'svelte-preprocess';
import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: preprocess(),
	kit: {
		adapter: adapter({
			// default options are shown
			pages: 'build',
			assets: 'build',
			fallback: null,
		}),
		appDir: 'internal',
		paths: {
			base: process.env.BASE_PATH ? process.env.BASE_PATH : undefined,
		},
	},
};

export default config;
