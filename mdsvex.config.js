import { defineMDSveXConfig, escapeSvelte } from 'mdsvex'
import wrapLi from 'rehype-wrap-li'
import externalLinks from 'rehype-external-links'
import { transformerNotationDiff } from '@shikijs/transformers'
import { createHighlighter } from 'shiki'

const highlighterPromise = createHighlighter({
  themes: ['ayu-dark'],
  langs: ['python', 'scss', 'shellscript', 'typescript'],
})

export default defineMDSveXConfig({
  extensions: ['.md'],
  rehypePlugins: [externalLinks, wrapLi],
  highlight: {
    highlighter: async (code, lang = 'text') => {
      const highlighter = await highlighterPromise

      const safeLang = highlighter.getLoadedLanguages().includes(lang)
        ? lang
        : 'text'

      return `{@html \`${escapeSvelte(
        highlighter.codeToHtml(code, {
          lang: safeLang,
          theme: 'ayu-dark',
          transformers: [transformerNotationDiff()],
        }),
      )}\` }`
    },
  },
})
