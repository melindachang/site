import type { Article, Tag } from '$lib/utils/interfaces.js'

export const load = async ({ fetch }) => {
  const response = await fetch('/api/notes')
  let articles: Article[] = await response.json()
  let tags: Tag[] = []
  for (const a of articles) {
    for (const c of a.tags) {
      let tag = tags.find(t => t.name === c)
      tag
        ? (tag.amount += 1)
        : tags.push({ name: c, amount: 1, checked: false } satisfies Tag)
    }
  }

  return { title: 'Notes', amount: articles.length, articles, tags }
}
