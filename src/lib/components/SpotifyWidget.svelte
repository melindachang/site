<script lang="ts">
  import { onMount } from 'svelte'
  import { DotLottieSvelte } from '@lottiefiles/dotlottie-svelte'
  import XIcon from '$lib/assets/icons/XIcon.svelte'
  import { gsap } from 'gsap'
  import type { PlaybackState, SimplifiedTrack, Track } from '@spotify/web-api-ts-sdk'

  let { song }: { song: PlaybackState } = $props()

  let closed = $state(false)
  let artist = $state<HTMLSpanElement>()
  let artistName = $derived(
    song && song.is_playing
      ? (song.item as SimplifiedTrack).artists.map(a => a.name).join(', ')
      : '',
  )
  let visibleWidth = $state(0)
  let fullWidth = $state(0)
  let scrollAmt = $derived(visibleWidth! - fullWidth!)

  $effect(() => {
    if (artistName.length) {
      tl.clear()
      tl.to(artist!, {
        marginLeft: scrollAmt < 0 ? `${scrollAmt}px` : '0px',
        ease: 'linear',
        duration: -(scrollAmt / 100),
      })
    }
  })

  const tl = gsap.timeline({ paused: true })

  let updateSong = async () => {
    song = await fetch('/api/spotify').then(res => res.json())
  }

  onMount(() => {
    updateSong()
    setInterval(updateSong, 10000)
  })
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<!-- svelte-ignore a11y_mouse_events_have_key_events -->
{#if !closed}
  <div class="player">
    <div class="player__heading">
      <button class="player__heading__x" onclick={() => (closed = true)}>
        <XIcon />
      </button>
      <span class="player__heading__title"
        >{song && song.is_playing ? 'Now' : 'Not'} Playing &mdash; Spotify</span
      >
      {#if song && song.is_playing}
        <div class="player__heading__icon">
          <DotLottieSvelte src="/now-playing.lottie" loop autoplay />
        </div>
      {/if}
    </div>
    {#if song && song.is_playing}
      <div class="player__background">
        <div
          class="player__img"
          style:background-color="gray"
          style:background-image={`url('${(song.item as Track).album.images[0].url}')`}
        ></div>
        <div class="player__text">
          <a href={song.item.href} target="_blank" class="player__text__title">{song.item.name}</a>
          <div
            class="player__text__artist"
            onmouseover={() => tl.play()}
            onmouseleave={() => tl.seek(0).pause()}
            bind:clientWidth={visibleWidth}
          >
            <span bind:this={artist} bind:clientWidth={fullWidth}>{artistName}</span>
          </div>
        </div>
      </div>
    {/if}
  </div>
{/if}

<style lang="sass">
  @use '../sass/_variables'
  @use '../sass/_breakpoints'

  .player
    // position: fixed
    // bottom: 0.5em
    // right: 0.5em
    // display: none
    margin: 1em 0 3em 0
    display: flex
    flex-direction: column
    align-items: center
    gap: 6px
    padding: 4px
    background: variables.$background-color
    border: 0.5px solid variables.$text-color
    max-width: 23em
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
        margin-left: 1em
      .player__heading__icon
        height: 1.4rem
      .player__heading__x
        height: 1.2rem
        line-height: 1
        width: 1.2rem
        margin-right: auto
        background: none
        border: none
        cursor: pointer
    .player__background
      position: relative
      border: 0.5px solid variables.$text-color
      width: 100%
      display: flex
      gap: 1em
      padding: 1em
      overflow: hidden
      .player__text
        display: grid
        gap: 0.25em
        width: calc(12em - 6px)
        align-content: end
        .player__text__title
          text-decoration: none
          overflow: hidden
          text-overflow: ellipsis
          display: -webkit-box
          -webkit-box-orient: vertical
          -webkit-line-clamp: 2
          line-height: 1.5em
          max-height: 3em
          &:hover
            text-decoration: underline
        .player__text__artist
          overflow: hidden
          color: variables.$dotted-border-color
          display: -webkit-box
          -webkit-box-orient: vertical
          -webkit-line-clamp: 1
          line-height: 1em
          max-height: 1em
          // cursor: pointer
          position: relative
          span
            display: inline-block
            overflow: hidden
            text-wrap: nowrap
          &::before
            content: ''
            position: absolute
            right: 0
            top: 0
            height: 100%
            width: 2em
            background-image: linear-gradient(to right, rgba(255,0,0,0), variables.$background-color)
          &:hover
            &::before
              background: transparent
      .player__img
        height: 6em
        aspect-ratio: 1/1
        border: 0.5px solid variables.$dotted-border-color
        filter: grayscale(50%)
        background-size: cover
        background-position: 50% 50%
</style>
