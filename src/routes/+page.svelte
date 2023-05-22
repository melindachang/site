<script>
  import Nav from '../lib/components/Nav.svelte'
  import Showreel from '../lib/components/Showreel.svelte';
</script>

<svelte:head>
  <title>Melinda Chang</title>
  <meta charset="UTF-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</svelte:head>

<Nav />
<Showreel />

<style lang="sass">
  @use '../lib/sass/fonts'
  $background-color: #0e0e0e
  $font-default: "Neue Montreal", "HelveticaNeue-Light", "Helvetica Neue Light", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif

  :global(html)
    font-size: 62.5%

  :global(body)
    height: 100vh
    overflow: hidden
    display: flex
    justify-content: center
    align-items: center
    font-size: 2.2rem
    background: $background-color
    font-family: $font-default

</style>

