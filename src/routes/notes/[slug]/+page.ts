import type { Article } from '$lib/utils/interfaces.js'
import { map_to_entry } from '$lib/utils/utils.js'
import { error } from '@sveltejs/kit'

export const load = async ({ params }) => {
  try {
    const article = await import(`$notes/${params.slug}.md`)
    const meta = map_to_entry(article.metadata as Article)

    return { content: article.default, meta, title: article.metadata.title }
  } catch (err) {
    error(404, `Could not find ${params.slug}`)
  }
}
