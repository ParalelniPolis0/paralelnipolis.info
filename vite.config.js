import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import ViteYaml from '@modyfi/vite-plugin-yaml';
import pkg from './package.json';

export default defineConfig({
	plugins: [
		sveltekit(),
		ViteYaml(),
	],
	define: {
		__PACKAGE__: pkg,
		__BUILD__: {
			time: new Date().toISOString()
		},
	}
});
