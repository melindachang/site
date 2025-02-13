import * as projects from '$lib/data/projects.json'

export const load = () => {
  const { publications, software } = projects

  return {
    title: 'Projects',
    publications,
    software,
  }
}
