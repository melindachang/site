<script lang="ts">
  import MinusIcon from '$lib/assets/icons/MinusIcon.svelte'
  import PlusIcon from '$lib/assets/icons/PlusIcon.svelte'
  import { gsap } from 'gsap'
  import { onMount } from 'svelte'

  let { data } = $props()

  let expanded = $state(false)
  let collapsible: HTMLDivElement
  let bodyHeight = $state(0)

  const toggleExpanded = () => {
    expanded = !expanded
  }

  const tl = gsap.timeline()

  $effect(() => {
    expanded ? tl.play() : tl.reverse()
  })

  onMount(() => {
    tl.to(collapsible, {
      height: `${45 + bodyHeight}px`,
      duration: 0.35,
      ease: 'power1.inOut',
    }).to(
      collapsible.querySelector('.entry__body'),
      {
        opacity: 1,
        duration: 0.35,
        ease: 'power1.inOut',
      },
      '<',
    )
  })
</script>

<div class="entry" bind:this={collapsible}>
  <div class="entry__title">
    <div class="entry__caption entry__date">
      <div class="entry__date__text">
        <i class="entry__date__icon"></i>
        <span>{data.date}</span>
      </div>
    </div>
    <a class="entry__title__text" href={data.slug}>{data.title}</a>
    <button class="entry__title__icon" onclick={toggleExpanded}>
      {#if !expanded}
        <PlusIcon width="18" height="18" />
      {:else}
        <MinusIcon width="18" height="18" />
      {/if}
    </button>
  </div>

  <div class="entry__body" bind:clientHeight={bodyHeight}>
    <div class="entry__description">
      <div class="entry__caption">
        <span class="entry__caption__text"> Description: </span>
      </div>
      <p class="entry__description__text">{data.description}</p>
    </div>
    <div class="entry__author">
      <div class="entry__caption">
        <span class="entry__caption__text">Author:</span>
      </div>
      <div class="entry__author__text">
        <p>{data.author}</p>
      </div>
    </div>
    <div class="entry__tags">
      <div class="entry__caption">
        <span class="entry__caption__text">Tags:</span>
      </div>
      <div class="entry__tags__text">
        {#each data.categories as tag}
          <span class="tag">{tag}</span>
        {/each}
      </div>
    </div>
  </div>
</div>

<style lang="sass">
  @use '../sass/_variables'

  .entry
    display: grid
    grid-template-columns: 2fr 11fr
    column-gap: 4px
    height: 4.5rem
    border-bottom: 0.5px dotted variables.$dotted-border-color
    overflow-y: hidden
    p, a
      text-decoration: none
      margin: 0
      padding: 0
      color: inherit
      letter-spacing: -.04em
    .entry__caption
      text-transform: uppercase
      font-family: variables.$font-monospace
      font-size: 1.2rem
      display: flex
      align-items: flex-start
      &__text
        display: flex
        align-items: center
        justify-content: center
        &::after
          content: 'A'
          visibility: hidden
          font-size: 2rem
      &.entry__date
        .entry__date__text
          display: inline-flex
          gap: 1rem
          align-items: center
          .entry__date__icon
            background: variables.$text-color
            height: 0.6rem
            width: 0.6rem
    &__title
      text-decoration: none
      grid-column: 1 / -1
      display: grid
      grid-template-columns: 2fr 10fr 1fr
      grid-auto-rows: min-content
      align-items: center
      &:hover
        color: variables.$background-color
        background: variables.$text-color
        .entry__date__icon
          background: variables.$background-color !important
      .entry__title__text
        font-size: 2.5rem
        white-space: nowrap
        text-overflow: ellipsis
        overflow: hidden
        padding: 1rem 0
        line-height: 100%
      .entry__title__icon
        cursor: pointer
        background: none
        color: variables.$text-color
        padding: 1.35rem 0
        border: none
        
    &__body
      grid-column: 1 / -1
      opacity: 0
      padding: 2.4rem 0
      display: grid
      grid-template-columns: subgrid
      font-size: 2rem

      & > div
        &:not(:last-child)
          margin-bottom: 1em
        grid-column: 1 / -1
        display: grid
        grid-template-columns: subgrid
        line-height: 1.3
      .entry__tags
        &__text
          display: flex
          align-items: flex-start
          flex-wrap: wrap
          gap: 0.2rem
          .tag
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
