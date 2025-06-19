import { defineMDSveXConfig, escapeSvelte } from 'mdsvex'
import wrapLi from 'rehype-wrap-li'
import externalLinks from 'rehype-external-links'
import { createHighlighter } from 'shiki'

export default defineMDSveXConfig({
  extensions: ['.md'],
  rehypePlugins: [externalLinks, wrapLi],
  highlight: {
    highlighter: async (code, lang = 'text') => {
      const highlighter = await createHighlighter({
        themes: ['ayu-dark'],
        langs: ['python', 'scss', 'shellscript'],
      })
      await highlighter.loadLanguage('python', 'scss', 'shellscript')
      const html = escapeSvelte(
        highlighter.codeToHtml(code, { lang, theme: 'ayu-dark' }),
      )
      return `{@html \`${html}\` }`
    },
  },
})
