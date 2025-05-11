<script lang="ts">
  import LocalTime from '$lib/components/LocalTime.svelte'
  import SpotifyWidget from '$lib/components/SpotifyWidget.svelte'
  import '$lib/sass/app.sass'

  let { data, children } = $props()
</script>

<div class="wrapper">
  <div class="content-left">
    <LocalTime />
    <SpotifyWidget song={data.song} />
    <div class="box"></div>
  </div>
  <div class="content-right">
    {@render children()}
  </div>
</div>

<style lang="sass">
  @use '$lib/sass/_variables'
  @use '$lib/sass/_breakpoints'
  
  .wrapper
    position: relative
    width: 100%
    display: grid
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
