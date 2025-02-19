<script lang="ts">
  import MinusIcon from '$lib/assets/icons/MinusIcon.svelte'
  import PlusIcon from '$lib/assets/icons/PlusIcon.svelte'
  import { gsap } from 'gsap'
  import { onMount } from 'svelte'
  let { title, children } = $props()
  let expanded = $state(false)
  let bodyHeight: number = $state(0)
  let collapsible: HTMLDivElement

  const tl = gsap.timeline()

  $effect(() => {
    expanded ? tl.play() : tl.reverse()
  })

  onMount(() => {
    tl.to(collapsible, {
      height: `calc(36px + ${bodyHeight}px)`,
      duration: 0.3,
      ease: 'power1.inOut',
    }).to(
      collapsible.querySelector('.grid__item__collapsible__body'),
      {
        opacity: 1,
        duration: 0.3,
        ease: 'power1.inOut',
      },
      '<',
    )
  })
</script>

<div class="grid__item__collapsible" bind:this={collapsible}>
  <button
    class="grid__item__collapsible__title"
    onclick={() => (expanded = !expanded)}
  >
    {#if !expanded}
      <PlusIcon />
    {:else}
      <MinusIcon />
    {/if}
    <span>{title}</span>
  </button>
  <div class="grid__item__collapsible__body" bind:clientHeight={bodyHeight}>
    {@render children()}
  </div>
</div>

<style lang="sass">
  @use '../../lib/sass/_variables'

  .grid__item__collapsible
    border-top: .5px dotted variables.$dotted-border-color
    border-bottom: .5px dotted variables.$dotted-border-color
    margin-top: 1.2rem
    overflow-y: hidden
    height: calc(3 * 1.2rem)
    .grid__item__collapsible__title
      line-height: 1
      background: none
      color: variables.$text-color
      border: none
      display: block
      width: 100%
      padding: 1.2rem
      cursor: pointer
      font-family: variables.$font-monospace
      font-size: 1.2rem
      text-transform: uppercase
      display: flex
      align-items: center
      &:hover
        background: variables.$text-color
        color: variables.$background-color
    .grid__item__collapsible__body
      opacity: 0
      padding: 1.2rem
      font-size: 1.2rem
      font-family: variables.$font-monospace
      text-transform: uppercase

</style>
