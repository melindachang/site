<script lang="ts">
  import Checkbox from '$lib/assets/icons/Checkbox.svelte'
  import Folder from '$lib/assets/icons/Folder.svelte'
  import MinusIcon from '$lib/assets/icons/MinusIcon.svelte'
  import PlusIcon from '$lib/assets/icons/PlusIcon.svelte'

  let { data = $bindable() } = $props()

  let open = $state(true)
</script>

<div class="filters">
  <div class="filters__folder">
    <button class="filters__folder__button" onclick={() => (open = !open)}>
      {#if open}
        <MinusIcon width="14" height="14" />
      {:else}
        <PlusIcon width="14" height="14" />
      {/if}
    </button>
    <Folder {open} width="22" height="22" />
    <span class="filters__folder__label">Topics</span>
  </div>
  {#if open}
    <div class="filters__list">
      {#each data as tag}
        <div class={['filters__list__item', tag.checked && 'highlight']}>
          <Checkbox bind:checked={tag.checked} width="20" height="20" />
          <span class="filters__list__item__label">{tag.name}</span>
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
      margin-left: 2.4rem
      display: grid
      row-gap: 5px
      &::before
        content: ''
        position: absolute
        left: -1.5rem
        height: 100%
        width: 2px
        opacity: 0.2
        background: variables.$text-color
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
