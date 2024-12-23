import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { preprocessMeltUI, sequence } from '@melt-ui/pp';
import { load } from 'js-yaml';
import { readFileSync } from 'node:fs';

const ppConfig = load(readFileSync('./src/data/config.yaml'));

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
		// If your environment is not supported, or you settled on a specific environment, switch out the adapter.
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
		adapter: adapter(),
		prerender: {
			entries: [
				'*',
				...Object.keys(ppConfig.redirects)
			]
		}
	},
	preprocess: sequence([
		vitePreprocess(),
		preprocessMeltUI()
	])
};

export default config;
