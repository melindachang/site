import { SpotifyApi, type AccessToken, type PlaybackState } from '@spotify/web-api-ts-sdk'
import type { RequestHandler } from '@sveltejs/kit'

const client_id = import.meta.env.VITE_SPOTIFY_CLIENT_ID
const client_secret = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET
const refresh_token = import.meta.env.VITE_SPOTIFY_REFRESH_TOKEN
const redirect_uri = import.meta.env.VITE_SPOTIFY_REDIRECT_URI

const get_access_token = async () => {
  const access_token = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token,
      redirect_uri,
      client_id,
      client_secret,
    }),
  }).then(res => res.json())
  return access_token as AccessToken
}

export const GET: RequestHandler = async () => {
  const access_token = await get_access_token()
  const sdk = SpotifyApi.withAccessToken(client_id, access_token)
  const res = await sdk.player.getCurrentlyPlayingTrack()

  if (!res) return new Response(JSON.stringify({ is_playing: false } as Partial<PlaybackState>))

  return new Response(JSON.stringify(res))
}
