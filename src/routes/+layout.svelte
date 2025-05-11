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
</svelte:head>

<CrtLines />
<Navigation />
<main>
  {@render children()}
</main>

<style lang="sass">
  main
    width: 100%
    padding: 4em 1em 1em 1em
</style>
