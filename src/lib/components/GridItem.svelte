<script lang="ts">
  let { heading, noGap = false, fn = null, fnName = null, children } = $props()
</script>

<div class={['grid__item', !noGap && 'grid__item--gap']}>
  <div class="grid__item__header">
    <span class="grid__item__header__text">/ {heading}</span>
    {#if fn}
      <button onclick={fn} class="grid__item__header__button">{fnName}</button>
    {/if}
  </div>
  <div class="grid__item__text">
    {@render children()}
  </div>
</div>

<style lang="sass">
  @use '../sass/_variables'
  .grid__item
    display: flex
    flex-direction: column
    &--gap
      gap: 2.4rem
    .grid__item__header
      display: flex
      justify-content: space-between
      padding-bottom: .6rem
      font-size: 1.2rem
      font-family: variables.$font-monospace
      text-transform: uppercase
      border-bottom: .5px solid variables.$text-color
      .grid__item__header__button
        cursor: pointer
        background: none
        border: none
        font-family: inherit
        color: inherit
        text-transform: uppercase
        font-size: inherit

    .grid__item__text
      line-height: 1.5
      ul
        margin-top: 0
        list-style-type: square
        li:not(:last-child)
          margin-bottom: .6em
      a
        text-underline-offset: 2px
</style>
