<script lang="ts">
  let { data } = $props()
</script>

<div class="metadata">
  <div class="metadata__item">
    <span class="metadata__item__label">Date:</span>
    <span class="metadata__item__value">{data.date}</span>
  </div>
  <div class="metadata__item">
    <span class="metadata__item__label">Author:</span>
    <span class="metadata__item__value">{data.author}</span>
  </div>
  <div class="metadata__item">
    <span class="metadata__item__label">Categories:</span>
    <div class="metadata__item__value">
      {#each data.categories as tag}
        <span class="metadata__item__tag">{tag}</span>
      {/each}
    </div>
  </div>
</div>

<style lang="sass">
  @use '$lib/sass/_variables'

  .metadata
    text-transform: uppercase
    font-size: 1.2rem
    font-family: variables.$font-monospace
    letter-spacing: -.04em
    .metadata__item
      grid-column: 1 / -1
      display: grid
      grid-template-columns: 1fr 1fr
      padding: 1.2rem 0
      border-bottom: 0.5px dotted variables.$dotted-border-color

      .metadata__item__value
        display: flex
        align-content: flex-start
        gap: 0.5rem
      .metadata__item__tag
        white-space: nowrap
        cursor: pointer
        text-decoration: none
        font-size: 1.2rem
        text-transform: uppercase
        font-family: variables.$font-monospace
        color: variables.$text-color
        border: 0.5px dotted variables.$dotted-border-color
        padding: 1px 4px 3px 4px
        border-radius: 4px
        &:hover
          color: variables.$background-color
          background: variables.$text-color 

</style>
