import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
	site: 'https://brack.io',
	output: 'static',
	// Preserve HTML whitespace behavior from before Astro 7.
	compressHTML: true,
	integrations: [sitemap()],
});
