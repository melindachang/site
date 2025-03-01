import * as projects from '$lib/data/projects.json'

export const load = () => {
  let { publications, software } = projects
  let numItems = `${publications.length + software.length}`

  publications.forEach(p => p.tags.sort((a, b) => a.localeCompare(b)))

  return {
    title: 'Home',
    numItems,
    publications,
    software,
  }
}
