import type { Article } from '$lib/utils/interfaces.js'

export const load = async ({ fetch }) => {
  const response = await fetch('/api/writing')
  let articles: Article[] = await response.json();

  return {
    title: 'Writing',
    articles,
  }
}
