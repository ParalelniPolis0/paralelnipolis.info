import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import ViteYaml from '@modyfi/vite-plugin-yaml';
import pkg from './package.json';
import markdown from '@vavt/vite-plugin-import-markdown';

export default defineConfig({
	plugins: [
		ViteYaml(),
		markdown(),
		sveltekit(),
	],
	assetsInclude: [
		//"**/*.md"
	],
	define: {
		__PACKAGE__: pkg,
		__BUILD__: {
			time: new Date().toISOString()
		},
	},
	server: {
		fs: {
			allow: ['./locales']
		}
	}
});
