<div class="crt-effect"></div>

<style lang="sass">
  @use '../sass/_animations'

  .crt-effect
    position: fixed
    top: -4px
    right: 0
    bottom: 0
    left: 0
    background: linear-gradient(180deg,#323232 2px,#dcdcdc 0)
    z-index: 999
    background-size: 100% 4px
    opacity: .07
    animation: crt-line-movement .5s linear 0s infinite normal none running
    pointer-events: none
</style>
