import * as h from '$lib/data/highlights.json'

export const load = () => {
  let { highlights } = h

  highlights.sort((a, b) => a.date.localeCompare(b.date))

  return {
    title: 'Highlights',
    highlights,
  }
}
