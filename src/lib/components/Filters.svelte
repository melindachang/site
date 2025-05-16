<script lang="ts">
  import Checkbox from '$lib/assets/icons/Checkbox.svelte'
  import Folder from '$lib/assets/icons/Folder.svelte'
  import PlusMinusIcon from '$lib/assets/icons/PlusMinusIcon.svelte'

  let { tags = $bindable() } = $props()

  let open = $state(true)
</script>

<div class="filters">
  <div class="filters__folder">
    <button class="filters__folder__button" onclick={() => (open = !open)}>
      <PlusMinusIcon expanded={open} width={14} height={14} />
    </button>
    <Folder {open} width="22" height="22" />
    <span class="filters__folder__label">Topics</span>
  </div>
  {#if open}
    <div class="filters__list">
      {#each tags as tag}
        <div class={['filters__list__item', tag.checked && 'highlight']}>
          <Checkbox bind:checked={tag.checked} width="20" height="20" />
          <span class="filters__list__item__label">{tag.name} ({tag.amount})</span>
        </div>
      {/each}
    </div>
  {/if}
</div>

<style lang="sass">
  @use '$lib/sass/_variables'

  .filters
    display: grid
    row-gap: 8px
    .filters__folder
      display: flex
      justify-content: flex-start
      gap: 6px
      align-items: center
      .filters__folder__button
        background: none
        border: none
        cursor: pointer
    .filters__list
      position: relative
      margin-left: 1.4rem
      padding-left: 1rem
      display: grid
      row-gap: 5px
      border-left: 0.5px dotted variables.$dotted-border-color
      .filters__list__item
        opacity: 0.5
        display: flex
        align-items: center
        gap: 8px
        &:hover
          opacity: 1
        &.highlight
          opacity: 1
          .filters__list__item__label
            background-color: variables.$accent-aqua
        .filters__list__item__label
          // font-family: variables.$font-monospace
          // text-transform: uppercase
          font-size: 1.4rem
          line-height: 100%
</style>
