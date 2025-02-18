<script lang="ts">
  // import SpotifyIcon from '$lib/assets/icons/SpotifyIcon.svelte'
  import { onMount } from 'svelte'
  import { DotLottieSvelte } from '@lottiefiles/dotlottie-svelte'
  import XIcon from '$lib/assets/icons/XIcon.svelte'

  let { song } = $props()

  let player = $state()
  let closed = $state(false)

  const closePlayer = () => {
    closed = true
  }

  onMount(() => {
    setInterval(async () => {
      song = await fetch('/api/spotify').then(res => res.json())
    }, 10000)
  })
</script>

{#if !closed && song && song.isPlaying}
  <div class="player" bind:this={player}>
    <div class="player__heading">
      <div class="player__heading__x" onclick={closePlayer}>
        <XIcon />
      </div>
      <span class="player__heading__title">Now Playing</span>
      <div class="player__heading__icon">
        <DotLottieSvelte src="/now-playing.lottie" loop autoplay />
      </div>
    </div>
    <div class="player__background">
      <div
        class="player__img"
        style={`background-color: gray; background-image: url(${song.albumImageUrl})`}
      ></div>
      <div class="player__text">
        <a href={song.songUrl} class="player__text__title">{song.title}</a>
        <span class="player__text__artist">{song.artist}</span>
      </div>
    </div>
  </div>
{/if}

<style lang="sass">
  @use '../sass/_variables'
  @use '../sass/_breakpoints'

  .player
    position: fixed
    bottom: 0.5em
    right: 0.5em
    display: none
    flex-direction: column
    align-items: center
    gap: 6px
    padding: 4px
    width: 20em
    background: variables.$background-color
    border: 0.5px solid variables.$text-color
    @include breakpoints.lg
      display: flex
    .player__heading
      color: variables.$text-color
      width: 100%
      position: relative
      display: flex
      align-items: center
      justify-content: end
      gap: .1em
      .player__heading__title
        text-transform: uppercase
        font-size: 1rem
        line-height: 1
        font-family: variables.$font-monospace
      .player__heading__icon
        height: 1.4rem
      .player__heading__x
        height: 1.2rem
        line-height: 1
        width: 1.2rem
        margin-right: auto
        cursor: pointer
    .player__background
      position: relative
      border: 0.5px solid variables.$text-color
      width: 100%
      display: flex
      gap: 1em
      height: 7em
      padding: 1em
      overflow: hidden
      .player__text
        display: flex
        flex-direction: column
        // gap: .3em
        justify-content: end
        & > *
          text-overflow: ellipsis
        .player__text__title
          text-decoration: none
          overflow: hidden
          text-overflow: ellipsis
          display: -webkit-box
          -webkit-box-orient: vertical
          -webkit-line-clamp: 2
          line-height: 1.5em
          max-height: 3em
        .player__text__artist
          overflow: hidden
          color: variables.$dotted-border-color
          text-overflow: ellipses
          display: -webkit-box
          -webkit-box-orient: vertical
          -webkit-line-clamp: 1
          line-height: 1.5em
          max-height: 1.5em
      .player__img
        height: 100%
        aspect-ratio: 1/1
        border: 0.5px solid variables.$dotted-border-color
        filter: grayscale(50%)
        background-size: cover
        background-position: 50% 50%
</style>
