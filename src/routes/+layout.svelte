<script lang="ts">
  import { page } from '$app/state'
  import CrtLines from '$lib/components/CrtLines.svelte'
  import LocalTime from '$lib/components/LocalTime.svelte'
  import Navigation from '$lib/components/Navigation.svelte'
  import SpotifyWidget from '$lib/components/SpotifyWidget.svelte'
  import '$lib/sass/app.sass'

  let { data, children } = $props()
</script>

<svelte:head>
  <title>{page.data.title} &mdash; Melinda Chang</title>
  <meta charset="utf-8" />
  <meta http-equiv="x-ua-compatible" content="ie=edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
</svelte:head>

<CrtLines />
<Navigation />
<main>
  <div class="content-left">
    <LocalTime />
    <SpotifyWidget song={data.song} />
    <div class="box"></div>
  </div>
  <div class="content-right">
    {@render children()}
  </div>
</main>

<style lang="sass">
  @use '../lib/sass/_variables'
  @use '../lib/sass/_breakpoints'
  @use 'sass:map'
  
  main
    position: relative
    padding: 1em
    width: 100%
    display: grid
    position: relative
    padding-top: 4em
    @include breakpoints.lg
      gap: 5.6rem
      grid-template-columns: 1fr 2fr
    @include breakpoints.xl
      grid-template-columns: minmax(0, 1fr) minmax(0, 4fr)
    .content-left
      position: relative
      @include breakpoints.lg
        height: calc(100vh - 6em)
      .box
        width: 15vw
        height: 20vw
        background: variables.$dotted-border-color
        position: absolute
        bottom: 0
        left: 0
        display: none
        @include breakpoints.lg
          display: block
</style>
