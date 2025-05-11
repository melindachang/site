export const load = async ({ fetch }) => {
  let song = await fetch('/api/spotify').then(res => res.json())
  return { song }
}
