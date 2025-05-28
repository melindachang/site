import { userState } from '$lib/data/state.svelte.js'
import type { Track } from '@spotify/web-api-ts-sdk'

export const load = async ({ fetch }) => {
  userState.playback_state = (await fetch('/api/spotify').then(res =>
    res.json(),
  )) as Track

  return { title: 'About', amount: 5 }
}
