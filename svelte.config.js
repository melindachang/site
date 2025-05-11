import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'
import { mdsvex, escapeSvelte } from 'mdsvex'
import { createHighlighter } from 'shiki'
import adapter from '@sveltejs/adapter-vercel'
import toc from 'remark-toc'
import externalLinks from 'rehype-external-links'

const mdsvexOptions = {
  extensions: ['md'],
  remarkPlugins: [toc, externalLinks],
  highlight: {
    highlighter: async (code, lang = 'text') => {
      const highlighter = await createHighlighter({
        themes: ['gruvbox-dark-medium'],
        langs: ['python', 'shellscript', 'toml'],
      })
      await highlighter.loadLanguage('python', 'shellscript', 'toml')
      const html = escapeSvelte(
        highlighter.codeToHtml(code, { lang, theme: 'gruvbox-dark-medium' }),
      )
      return `{@html \`${html}\` }`
    },
  },
}

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://svelte.dev/docs/kit/integrations
  // for more information about preprocessors
  extensions: ['.svelte', '.md'],
  preprocess: [vitePreprocess({ sass: false }), mdsvex(mdsvexOptions)],

  adapter: adapter({
    runtime: 'nodejs20.x'
  }),
  kit: {
    // adapter-auto only supports some environments, see https://svelte.dev/docs/kit/adapter-auto for a list.
    // If your environment is not supported, or you settled on a specific environment, switch out the adapter.
    // See https://svelte.dev/docs/kit/adapters for more information about adapters.

    alias: {
      $articles: 'src/articles',
    },
  },
}

export default config
