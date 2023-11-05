<script>
  import gsap from "gsap";
  import { eventFired, activeContexts } from "../store";
  import { onMount } from "svelte";
  export let context, i;
  let contextMenu, collapsed, animation;

  activeContexts.subscribe((value) => {
    collapsed = value[i];
  });

  const reset = () => {
    if (animation) animation.kill();
    gsap.set(contextMenu, {
      autoAlpha: 0,
      height: 0,
      scale: 0.8,
    });
  };

  $: {
    if (collapsed) {
      reset();
    }
  }

  export const toggleContext = (e, xOffset, yOffset) => {
    let x = e.clientX - xOffset,
      y = e.clientY - yOffset;

    if (collapsed) {
      activeContexts.update((currentData) => {
        currentData = currentData.fill(true);
        currentData[i] = false;
        return currentData;
      });
    }

    reset();
    gsap.set(contextMenu, { x, y });

    animation = gsap.to(contextMenu, {
      height: "auto",
      scale: 1,
      autoAlpha: 1,
      duration: 0.7,
      ease: "Power4.easeOut",
    });
    eventFired.update((currentData) => {
      return currentData.fill({ active: false, e: null });
    });
  };

  onMount(() => {
    reset();
  });
</script>

<div class="context__menu" bind:this={contextMenu}>
  {#each context as item}
    <div class="context__menu-item">
      <a href={item.url} target="_blank">{item.name}</a>
    </div>
  {/each}
</div>

<style lang="sass">
  @use '$lib/sass/variables'

  .context__menu
    z-index: 2
    position: absolute
    height: 0
    display: flex
    flex-direction: column
    border-radius: 1.6rem
    background: variables.$background-color
    border: variables.$border-standard
    &-item
      margin: 0
      text-align: center
      padding: 2rem
      &:not(:last-child)
        border-bottom: variables.$border-standard
      a
        color: variables.$font-color
        text-decoration: none
        text-transform: uppercase
        letter-spacing: .1rem
        &:hover
          color: variables.$font-accent
</style>
