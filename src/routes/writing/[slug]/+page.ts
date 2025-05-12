import { error } from '@sveltejs/kit'

export const load = async ({ params }) => {
  try {
    const article = await import(`$articles/${params.slug}.md`)

    return {
      content: article.default,
      meta: article.metadata,
      title: article.metadata.title
    }
  } catch (err) {
    error(404, `Could not find ${params.slug}`)
  }
}
