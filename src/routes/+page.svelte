<script>
  import Nav from "$lib/components/Nav.svelte";
</script>

<svelte:head>
  <title>Melinda Chang</title>
  <meta charset="UTF-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</svelte:head>

<Nav />

<style lang="sass">
  @use '$lib/sass/fonts'
  @use '$lib/sass/variables'

  :global(html)
    font-size: 62.5%

  :global(body)
    width: 100%
    overflow-x: hidden
    // display: flex
    // justify-content: center
    // align-items: center
    font-size: 2.2rem
    padding: 4em
    color: variables.$font-color
    background: variables.$background-color
    font-family: variables.$font-default

</style>
