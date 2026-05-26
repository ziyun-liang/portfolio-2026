// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import vercel from '@astrojs/vercel';
import rehypeExternalLinks from 'rehype-external-links';

const externalLinksPlugin = [
  rehypeExternalLinks,
  { target: '_blank', rel: ['noopener', 'noreferrer'] },
];

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: vercel(),
  integrations: [mdx({ rehypePlugins: [externalLinksPlugin] })],
  markdown: {
    rehypePlugins: [externalLinksPlugin],
  },
});
