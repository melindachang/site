<script lang="ts">
  import { onMount } from 'svelte'
  import { DotLottieSvelte } from '@lottiefiles/dotlottie-svelte'
  import XIcon from '$lib/assets/icons/XIcon.svelte'
  import { gsap } from 'gsap'

  let { song } = $props()
  let closed = $state(false)
  let artist: HTMLSpanElement | undefined = $state()
  let visibleWidth: number | undefined = $state()
  let fullWidth: number | undefined = $state()

  let scrollAmt: number
  $effect(() => {
    if (song) {
      scrollAmt = visibleWidth! - fullWidth!

      tl.clear()
      tl.to(artist!, {
        marginLeft: scrollAmt < 0 ? `${scrollAmt}px` : '0px',
        ease: 'linear',
        duration: -(scrollAmt / 100),
      })
    }
  })

  const closePlayer = () => {
    closed = true
  }

  const tl = gsap.timeline({ paused: true })

  onMount(() => {
    let updateSong = async () => {
      song = await fetch('/api/spotify').then(res => res.json())
    }

    updateSong()
    setInterval(updateSong, 10000)
  })
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<!-- svelte-ignore a11y_mouse_events_have_key_events -->
{#if !closed}
  <div class="player">
    <div class="player__heading">
      <button class="player__heading__x" onclick={closePlayer}>
        <XIcon />
      </button>
      <span class="player__heading__title"
        >{song && song.isPlaying ? 'Now' : 'Not'} Playing &mdash; Spotify</span
      >
      {#if song && song.isPlaying}
        <div class="player__heading__icon">
          <DotLottieSvelte src="/now-playing.lottie" loop autoplay />
        </div>
      {/if}
    </div>
    {#if song && song.isPlaying}
      <div class="player__background">
        <div
          class="player__img"
          style={`background-color: gray; background-image: url('${song.albumImageUrl}')`}
        ></div>
        <div class="player__text">
          <a href={song.songUrl} target="_blank" class="player__text__title"
            >{song.title}</a
          >
          <div
            class="player__text__artist"
            onmouseover={() => tl.play()}
            onmouseleave={() => tl.seek(0) && tl.pause()}
            bind:clientWidth={visibleWidth}
          >
            <span bind:this={artist} bind:clientWidth={fullWidth}
              >{song.artist}</span
            >
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
    position: fixed
    bottom: 0.5em
    right: 0.5em
    display: none
    flex-direction: column
    align-items: center
    gap: 6px
    padding: 4px
    // width: 20em
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
      height: 7em
      padding: 1em
      overflow: hidden
      .player__text
        display: flex
        flex-direction: column
        gap: 0.25em
        width: 12em
        justify-content: end
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
        height: 100%
        aspect-ratio: 1/1
        border: 0.5px solid variables.$dotted-border-color
        filter: grayscale(50%)
        background-size: cover
        background-position: 50% 50%
</style>
