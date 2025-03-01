<script lang="ts">
  import { navigating, page } from '$app/state'
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
  <meta
    name="description"
    content="18 y/o student researcher studying Computer Science and English Literature at Northwestern"
  />
</svelte:head>

<CrtLines />
{#if navigating == null}
  Loading...
{:else}
  <main>
    <Navigation />
    <aside class="content-left">
      <LocalTime />
      <SpotifyWidget song={data.song} />
    </aside>
    <div class="content-right">
      {@render children()}
    </div>
  </main>
{/if}

<style lang="sass">
  @use '../lib/sass/_variables'
  @use '../lib/sass/_breakpoints'
  @use 'sass:map'
  
  main
    position: relative
    padding: 1em
    width: 100%
    display: flex
    flex-direction: column
    position: relative
    padding-top: 4em
    @include breakpoints.lg
      flex-direction: row
    .content
      &-left
        flex: 2
      &-right
        flex: 3

</style>
