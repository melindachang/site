<script lang="ts">
  import { gsap } from 'gsap'
  import { onMount } from 'svelte'
  let { title, children } = $props()
  let expanded = $state(false)
  let bodyHeight: number = $state(0)

  const tl = gsap.timeline()

  $effect(() => {
    console.log(expanded)
    if (expanded) tl.play()
    else tl.reverse()
  })

  onMount(() => {
    tl.to('.grid__item__collapsible', {
      height: `calc(36px + ${bodyHeight}px)`,
      duration: 0.45,
      ease: 'power1.inOut',
    })
  })
</script>

<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_static_element_interactions (who gaf) -->

<div class="grid__item__collapsible">
  <div
    class="grid__item__collapsible__title"
    onclick={() => (expanded = !expanded)}
  >
    {#if !expanded}
      <svg
        width="15"
        height="15"
        viewBox="0 0 15 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        ><path
          d="M8 2.75C8 2.47386 7.77614 2.25 7.5 2.25C7.22386 2.25 7 2.47386 7 2.75V7H2.75C2.47386 7 2.25 7.22386 2.25 7.5C2.25 7.77614 2.47386 8 2.75 8H7V12.25C7 12.5261 7.22386 12.75 7.5 12.75C7.77614 12.75 8 12.5261 8 12.25V8H12.25C12.5261 8 12.75 7.77614 12.75 7.5C12.75 7.22386 12.5261 7 12.25 7H8V2.75Z"
          fill="currentColor"
          fill-rule="evenodd"
          clip-rule="evenodd"
        ></path></svg
      >
    {:else}
      <svg
        width="15"
        height="15"
        viewBox="0 0 15 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        ><path
          d="M2.25 7.5C2.25 7.22386 2.47386 7 2.75 7H12.25C12.5261 7 12.75 7.22386 12.75 7.5C12.75 7.77614 12.5261 8 12.25 8H2.75C2.47386 8 2.25 7.77614 2.25 7.5Z"
          fill="currentColor"
          fill-rule="evenodd"
          clip-rule="evenodd"
        ></path></svg
      >
    {/if}
    <span>{title}</span>
  </div>
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
      svg
        margin-right: .8rem
        height: 1.2rem
        width: 1.2rem
    .grid__item__collapsible__body
      padding: 1.2rem
      font-size: 1.2rem
      font-family: variables.$font-monospace
      text-transform: uppercase

</style>
