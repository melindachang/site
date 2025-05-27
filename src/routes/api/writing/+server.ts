import { json } from '@sveltejs/kit'
import type { Article } from '$lib/utils/interfaces'

const get_articles = async () => {
  let articles: Article[] = []

  const paths = import.meta.glob('/src/articles/*.md', { eager: true })

  for (const path in paths) {
    const file = paths[path]
    const slug = 'writing/' + path.split('/').at(-1)?.replace('.md', '')

    if (file && typeof file === 'object' && 'metadata' in file && slug) {
      let metadata = file.metadata as Omit<Article, 'slug'>
      metadata.tags.sort()

      const article = { ...metadata, href: slug } satisfies Article

      article.published && articles.push(article)
    }
  }

  articles.sort(
    (first, second) =>
      new Date(second.date).getTime() - new Date(first.date).getTime()
  )

  return articles
}

export const GET = async () => {
  const articles = await get_articles()
  return json(articles)
}
