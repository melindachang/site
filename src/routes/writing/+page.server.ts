import type { Article } from '$lib/utils/interfaces.js'

export const load = async ({ fetch }) => {
  const response = await fetch('/api/writing')
  let articles: Article[] = await response.json()
  let tags = new Set<string>()
  articles.forEach(a => a.categories.forEach(c => tags.add(c)))

  return {
    title: 'Writing',
    amount: articles.length,
    articles,
    tags,
  }
}
