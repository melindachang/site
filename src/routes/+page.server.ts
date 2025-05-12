import * as projects from '$lib/data/publications.json'
import * as timelines from '$lib/data/timelines.json'
import type { Timeline } from '$lib/utils/interfaces.js'

export const load = async ({ fetch }) => {
  let song = await fetch('/api/spotify').then(res => res.json())
  let { publications } = projects
  let { work }: { work: Timeline[] } = timelines

  publications.forEach(p => p.tags.sort((a, b) => a.localeCompare(b)))

  return {
    song,
    title: 'About',
    amount: 4,
    publications,
    work,
  }
}
