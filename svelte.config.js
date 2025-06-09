import { mdsvex, escapeSvelte } from 'mdsvex'
import adapter from '@sveltejs/adapter-vercel'
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'
import externalLinks from 'rehype-external-links'
import toc from 'remark-toc'
import { createHighlighter } from 'shiki'

const config = {
  preprocess: [
    vitePreprocess(),
    mdsvex({
      extensions: ['.md'],
      remarkPlugins: [externalLinks, toc],
      highlight: {
        highlighter: async (code, lang = 'text') => {
          const highlighter = await createHighlighter({
            themes: ['ayu-dark'],
            langs: ['python', 'scss', 'shellscript'],
          })
          await highlighter.loadLanguage(
            'python',
            'scss',
            'shellscript',
          )
          const html = escapeSvelte(
            highlighter.codeToHtml(code, { lang, theme: 'ayu-dark' }),
          )
          return `{@html \`${html}\` }`
        },
      },
    }),
  ],
  kit: { adapter: adapter(), alias: { $articles: 'src/articles' } },
  extensions: ['.svelte', '.md'],
}

export default config
