import type { PlaybackState } from '@spotify/web-api-ts-sdk'

export const load = async ({ fetch }) => {
  let song = (await fetch('/api/spotify').then(res => res.json())) satisfies Partial<PlaybackState>

  return {
    song,
    title: 'About',
    amount: 5,
  }
}
