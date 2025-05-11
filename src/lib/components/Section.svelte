<script lang="ts">
  import type { Snippet } from 'svelte'

  interface ComponentProps {
    title: string
    numItems?: string
    children: Snippet
  }

  let { title, numItems, children }: ComponentProps = $props()
</script>

<div class="section">
  <div class="section__title">
    <h1>{title}</h1>
    {#if numItems}
      <span class="section__num-items">({numItems})</span>
    {/if}
  </div>
  <div class="section__content">
    {@render children()}
  </div>
</div>

<style lang="sass">
  @use '../sass/_variables'
  
  .section
    padding: 9.3rem 1.2rem
    display: flex
    flex-direction: column
    .section__title
      display: flex
      align-items: start
      line-height: 1
      margin-bottom: 56px
      h1
        margin: 0
        font-weight: 400
        font-size: variables.$section-title-font-size
        letter-spacing: -.08em
      span.section__num-items
        font-size: calc(12px + ((20 - 12) * (100vw - 390px) / (1728 - 390)))
        margin-left: .8rem
        letter-spacing: -.08em
        font-weight: 500
</style>
