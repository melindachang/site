<script>
</script>

<div id="noise__overlay" />

<style lang="sass">
  @use '$lib/sass/animations'

  #noise__overlay
    z-index: 100
    position: fixed
    top: 0
    left: 0
    bottom: 0
    right: 0
    width: 100%
    height: 100vh
    pointer-events: none
    opacity: .4
    mix-blend-mode: difference
    &::before
      content: ""
      z-index: 999
      position: absolute
      top: 0
      left: 0
      width: 100%
      height: 100%
      background: url(https://herdl.com/wp-content/uploads/2020/11/noise-web.webp)
      -webkit-animation: 90ms infinite noise
      animation: 90ms infinite noise


</style>
