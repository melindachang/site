<script lang="ts">
  import { page } from '$app/state'
  import CrtLines from '$lib/components/CrtLines.svelte'
  import Navigation from '$lib/components/Navigation.svelte'
  import '$lib/sass/app.sass'

  let { children } = $props()
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
<main>
  <Navigation />
  {@render children()}
</main>

<style lang="sass">
  @use '../lib/sass/_variables'
  @use '../lib/sass/_breakpoints'
  @use 'sass:map'
  
  main
    position: relative
    margin: 0 auto
    width: 100%
    max-width: map.get(breakpoints.$breakpoints, xxl)
</style>
