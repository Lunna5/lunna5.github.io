// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';

import mdx from '@astrojs/mdx';

import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';

// https://astro.build/config
export default defineConfig({
  site: 'https://lunna.dev',
  integrations: [react(), mdx(), sitemap()],
  vite: {
    plugins: [
      tailwindcss(),
      vanillaExtractPlugin({
        unstable_mode: 'inlineCssInDev',
      }),
    ],
  },
});
