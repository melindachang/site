import type { RequestHandler } from '@sveltejs/kit'

const client_id = import.meta.env.VITE_SPOTIFY_CLIENT_ID
const client_secret = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET
const refresh_token = import.meta.env.VITE_SPOTIFY_REFRESH_TOKEN
const redirect_uri = import.meta.env.VITE_SPOTIFY_REDIRECT_URI
const token_endpoint = `https://accounts.spotify.com/api/token`
const now_playing_endpoint = `https://api.spotify.com/v1/me/player/currently-playing`

export const GET: RequestHandler = async () => {
  const { access_token } = await fetch(token_endpoint, {
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

  const res = await fetch(now_playing_endpoint, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  })

  if (res.status === 204 || res.status > 400) {
    return new Response(JSON.stringify({ isPlaying: false }))
  }

  const song = await res.json()
  console.log(song)
  const isPlaying = song.is_playing
  const title = song.item.name
  const artist = song.item.artists
    .map((_artist: any) => _artist.name)
    .join(', ')
  const album = song.item.album.name
  const albumImageUrl = song.item.album.images[0].url
  const songUrl = song.item.external_urls.spotify

  return new Response(
    JSON.stringify({ title, artist, album, isPlaying, albumImageUrl, songUrl }),
  )
}
