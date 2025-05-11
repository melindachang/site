<script lang="ts">
  import GridItem from '$lib/components/GridItem.svelte'
  import Metadata from '$lib/components/Metadata.svelte'
  import { gsap } from 'gsap'
  import { onMount } from 'svelte'
  let { data } = $props()

  let headerHeight = $state(0)
  let title: HTMLHeadingElement
  let titleHeight = 0
  let content: HTMLDivElement
  let stickyDistance = $derived(headerHeight + 64)
  let scrollY = $state(0)
  let innerWidth = $state(0)
  let mounted = $state(false)

  const tl = gsap.timeline()

  $effect(() => {
    if (innerWidth >= 992 && !mounted && scrollY >= stickyDistance) {
      mounted = true
    }

    if (
      (mounted && innerWidth < 992) ||
      (innerWidth >= 992 && mounted && scrollY < stickyDistance)
    ) {
      mounted = false
    }

    mounted ? tl.play() : tl.reverse()
  })

  onMount(() => {
    title.style.visibility = 'hidden'
    title.style.display = 'block'
    titleHeight = title.clientHeight
    title.style.display = 'none'
    title.style.visibility = 'hidden'

    tl.to(title, {
      visibility: 'visible',
      display: 'block',
      translateY: 0,
      opacity: 1,
      duration: 0.3,
      ease: 'power1.inOut',
    }).fromTo(
      content,
      {
        translateY: -titleHeight,
      },
      {
        translateY: 0,
        duration: 0.4,
        ease: 'power1.inOut',
        immediateRender: false,
      },
      '<',
    )
  })
</script>

<svelte:head>
  <title>{data.meta.title} &mdash; Melinda Chang</title>
</svelte:head>

<svelte:window bind:scrollY bind:innerWidth />

<header bind:clientHeight={headerHeight}>
  <h1>{data.meta.title}</h1>
</header>
<article>
  <div class="metadata">
    <div class="metadata__title">
      <h2 bind:this={title}>
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

  header
    margin: 4em 0
    h1
      font-size: variables.$section-title-font-size

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
          transform: translateY(-15px)
          opacity: 0
          display: none
          margin-bottom: 2.4rem
      .metadata__content
        transform: translateY(0)



</style>
