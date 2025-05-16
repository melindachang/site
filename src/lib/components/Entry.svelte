<script lang="ts">
  import PlusMinusIcon from '$lib/assets/icons/PlusMinusIcon.svelte'
  import type { Article, Entry, Work } from '$lib/utils/interfaces'
  import { gsap } from 'gsap'
  import { onMount } from 'svelte'

  let { data, isFailure = false }: { data: Entry<Article> | Entry<Work>; isFailure: boolean } =
    $props()

  let expanded = $state(false)
  let collapsible: HTMLDivElement
  let titleHeight = $state(0)
  let bodyHeight = $state(0)

  const toggleExpanded = () => {
    expanded = !expanded
  }

  const tl = gsap.timeline()

  $effect(() => {
    expanded ? tl.play() : tl.reverse()
  })

  onMount(() => {
    tl.fromTo(
      collapsible,
      {
        height: `${titleHeight}px`,
      },
      {
        height: `${titleHeight + bodyHeight}px`,
        duration: 0.35,
        ease: 'power1.inOut',
      },
    ).fromTo(
      collapsible.querySelector('.entry__body'),
      {
        autoAlpha: 0,
      },
      {
        autoAlpha: 1,
        duration: 0.35,
        ease: 'power1.inOut',
      },
      '<',
    )
  })
</script>

<div class={['entry', isFailure && 'entry--failure']} bind:this={collapsible}>
  <div class="entry__title" bind:clientHeight={titleHeight}>
    <div class="entry__caption entry__date">
      <div class="entry__date__text">
        <i class="entry__date__icon"></i>
        <span>{data.date}</span>
      </div>
    </div>
    <a class="entry__title__text" href={data.href}>{@html data.title}</a>
    <button class="entry__title__icon" onclick={toggleExpanded}>
      <PlusMinusIcon {expanded} width={18} height={18} />
    </button>
  </div>
  <div class="entry__body" bind:clientHeight={bodyHeight}>
    {#each data.content as el}
      {#if el && el.value && typeof el.value != 'boolean'}
        {#if el.key === 'categories'}
          <div class="entry__tags">
            <div class="entry__caption">
              <span class="entry__caption__text">Tags:</span>
            </div>
            <div class="entry__tags__text">
              {#each el.value as tag}
                <span class="tag">{tag}</span>
              {/each}
            </div>
          </div>
        {:else}
          <div class="entry__item">
            <div class="entry__caption">
              <span class="entry__caption__text"> {el.key.toUpperCase()}: </span>
            </div>
            <p class="entry__item__text">{@html el.value}</p>
          </div>
        {/if}
      {/if}
    {/each}
  </div>
</div>

<style lang="sass">
  @use '$lib/sass/_variables'
  @use '$lib/sass/_breakpoints'

  .entry
    display: grid
    border-bottom: 0.5px dotted variables.$dotted-border-color
    overflow-y: hidden
    @include breakpoints.lg
      column-gap: 4px
      grid-template-columns: 2fr 11fr
    &--failure
      .entry__date__icon
        background: variables.$accent-red !important
      .entry__title__text
        color: variables.$accent-red

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
      line-height: 100%
      display: flex
      align-items: flex-start
      grid-column: 1 / -1
      @include breakpoints.lg
        grid-column: 1
      &__text
        display: flex
        align-items: center
        justify-content: center
        &::after
          content: 'A'
          visibility: hidden
          font-size: 2rem
      &.entry__date
        padding-top: 1.3rem
        @include breakpoints.lg
          padding: 0
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
      grid-auto-rows: min-content
      align-items: center
      grid-template-columns: 10fr 1fr
      @include breakpoints.lg
        gap: 1rem
        grid-template-columns: 2fr 10fr 1fr
      &:hover
        color: variables.$background-color
        background: variables.$text-color
        .entry__date__icon
          background: variables.$background-color
      .entry__title__text
        padding: 1.3rem 0
        font-size: 2.2rem
        line-height: 100%
        @include breakpoints.md
          font-size: 2.5rem
      .entry__title__icon
        cursor: pointer
        background: none
        color: variables.$text-color
        // padding: 1.35rem 0
        border: none
        
    &__body
      grid-column: 1 / -1
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
        row-gap: 1rem
        line-height: 1.3
      .entry__item__text
        font-size: 2rem
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
