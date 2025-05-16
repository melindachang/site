<script lang="ts">
  import GridItem from '$lib/components/GridItem.svelte'
  import Metadata from '$lib/components/Metadata.svelte'
  import { gsap } from 'gsap'
  import { onMount } from 'svelte'
  let { data } = $props()

  let title: HTMLHeadingElement
  let titleHeight = $state(0)
  let content: HTMLDivElement
  let metaLoc = $state<HTMLElement>()
  let stickyDistance = $derived(metaLoc!.getBoundingClientRect().y)
  let scrollY = $state(0)
  let innerWidth = $state(0)
  let mounted = $state(false)

  const tl = gsap.timeline()

  $effect(() => {
    mounted = innerWidth >= 992 && scrollY >= stickyDistance

    mounted ? tl.play() : tl.reverse()
  })

  onMount(() => {
    tl.fromTo(
      title,
      {
        autoAlpha: 0,
        translateY: '-15px',
      },
      {
        autoAlpha: 1,
        translateY: 0,
        duration: 0.3,
        ease: 'power2.inOut',
      },
    ).fromTo(
      content,
      {
        translateY: `-${titleHeight + 24}px`,
      },
      {
        translateY: 0,
        duration: 0.4,
        ease: 'power1.inOut',
      },
      '<',
    )
  })
</script>

<svelte:head>
  <title>{data.meta.title} &mdash; Melinda Chang</title>
</svelte:head>

<svelte:window bind:scrollY bind:innerWidth />
<article>
  <div class="metadata" bind:this={metaLoc}>
    <div class="metadata__title">
      <h2 bind:this={title} bind:clientHeight={titleHeight}>
        {data.meta.title}
      </h2>
    </div>
    <div class="metadata__content" bind:this={content}>
      <GridItem heading="Metadata" noGap>
        <Metadata data={data.meta} />
      </GridItem>
    </div>
  </div>
  <GridItem heading="Article">
    <div class="prose">
      <div class="prose__wrapper">
        <data.content />
      </div>
    </div>
  </GridItem>
</article>

<style lang="sass">
  @use '$lib/sass/_breakpoints'
  @use '$lib/sass/_variables'

  article
    display: grid
    gap: 3em
    @include breakpoints.lg
      grid-template-columns: 6fr 17fr
    .metadata
      height: fit-content
      will-change: auto
      @include breakpoints.lg
        position: sticky
        top: 4em
      .metadata__title
        min-height: 0px
        font-size: 2.8rem
        h2
          margin-bottom: 2.4rem
      .metadata__content
        transform: translateY(0)

</style>
