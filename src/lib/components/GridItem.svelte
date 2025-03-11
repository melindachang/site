<script lang="ts">
  let { heading, noGap = false, children } = $props()
</script>

<div class={`grid__item ${noGap ? '' : 'grid__item--gap'}`}>
  <div class="grid__item__header">/ {heading}</div>
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
      padding-bottom: .6rem
      font-size: 1.2rem
      font-family: variables.$font-monospace
      text-transform: uppercase
      border-bottom: .5px solid variables.$text-color
    .grid__item__text
      line-height: 1.5
      :global(ul)
        margin-top: 0
        list-style-type: square
        :global(li:not(:last-child))
          margin-bottom: .6em
      :global(a)
        text-underline-offset: 2px
</style>
