<script>
  import { scrollY } from "$lib/store.js";
  import NavBar from "../lib/components/NavBar.svelte";
  // import NoiseOverlay from "../lib/components/NoiseOverlay.svelte";
  // import UnderConstruction from "../lib/components/UnderConstruction.svelte";

  let scroll;

  $: scroll && scrollY.update(() => scroll);
</script>

<svelte:head>
  <title>Melinda Chang</title>
  <meta charset="UTF-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</svelte:head>

<svelte:window bind:scrollY={scroll} />

<div class="body__container">
  <NavBar />
  <slot />
  <!-- <p>
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo ipsum eius
    expedita qui velit perspiciatis consequuntur asperiores molestias, culpa
    porro magnam earum totam delectus placeat quia neque nulla commodi quo.
  </p> -->
</div>

<style lang="sass">
  @use '$lib/sass/fonts'
  @use '$lib/sass/variables'

  :global(*), :global(*::before), :global(*::after)
    box-sizing: border-box

  :global(html)
    font-size: 62.5%

  :global(body)
    width: 100%
    position: relative
    margin: 0
    padding: 0
    overflow-x: hidden
    // display: flex
    // justify-content: center
    // align-items: center
    font-size: 2.2rem
    // padding: 4em
    color: variables.$font-color
    background-color: variables.$background-color
    font-family: variables.$font-default

  .body__container
    position: relative
    padding: 1.2rem
  //   padding: 0
  //   margin: 0
  //   width: 100%
  //   height: 100%
  //   border: variables.$border-standard
  //   border-radius: 2rem
  //   background-color: variables.$background-color
  //   background-image: url('$lib/assets/images/dots.svg'), url('$lib/assets/images/dust-and-scratches.png')
  //   background-size: auto auto
  //   background-position: 50% 50%, 50% 50%
  //   padding: 4em


</style>
