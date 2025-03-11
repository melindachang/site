import * as projects from '$lib/data/publications.json'
import * as timelines from '$lib/data/timelines.json'

export const load = () => {
  let { publications } = projects
  let { work, play } = timelines

  publications.forEach(p => p.tags.sort((a, b) => a.localeCompare(b)))

  return {
    title: 'Home',
    publications,
    work,
    play,
  }
}
