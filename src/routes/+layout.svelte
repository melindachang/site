<script lang="ts">
  import { page } from '$app/state'
  import CrtLines from '$lib/components/CrtLines.svelte'
  import Header from '$lib/components/Header.svelte'
  import Navigation from '$lib/components/Navigation.svelte'
  import '$lib/scss/app.scss'
  import { onMount } from 'svelte'

  let theme = $state()

  let { children } = $props()

  onMount(() => {
    theme = window.matchMedia('(prefers-color-scheme: dark)').matches
      ? '_light'
      : ''
  })
</script>

<svelte:head>
  <title
    >{page.url.pathname === '/' ? '' : `${page.data.title} | `}Melinda Chang</title>
  <meta charset="utf-8" />
  <meta http-equiv="x-ua-compatible" content="ie=edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <link
    rel="icon"
    href={`/favicon_48x48${theme}.ico`}
    media="screen"
    type="image/x-icon" />
</svelte:head>

<CrtLines />

<Navigation />
<main class="wrapper">
  <div class="header">
    <Header title={page.data.title} amount={page.data.amount} />
  </div>
  <div class="content">
    {@render children()}
  </div>
</main>

<style lang="scss">
  .wrapper {
    width: 100%;
    padding: 4em 1em;
    .header {
      width: fit-content;
    }
  }
</style>
