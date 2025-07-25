<script lang="ts">
  import GridItem from '$lib/components/GridItem.svelte'
  import { gsap } from 'gsap'
  import { onMount, type Snippet } from 'svelte'

  let { data } = $props()

  let title: HTMLHeadingElement
  let content: HTMLDivElement
  let metadata = $state<HTMLElement>()
  let stickyDistance = $derived(
    metadata ? metadata.getBoundingClientRect().y : 400,
  )
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
      { autoAlpha: 0, translateY: '-15px' },
      { autoAlpha: 1, translateY: 0, duration: 0.3, ease: 'power2.inOut' },
    ).fromTo(
      content,
      { translateY: `-${title.clientHeight + 24}px` },
      { translateY: 0, duration: 0.4, ease: 'power1.inOut' },
      '<',
    )
  })
</script>

<svelte:head>
  <title>{data.meta.title.title} &mdash; Melinda Chang</title>
</svelte:head>

<svelte:window bind:scrollY bind:innerWidth />

{#snippet metadataItem(
  key: string,
  value: string | string[],
  snip: Snippet<[any]>,
)}
  <div class="metadata__item">
    <span class="metadata__item-label">{key}</span>
    {@render snip(value)}
  </div>
{/snippet}

{#snippet tags(value: string[])}
  <div class="metadata__item-value">
    {#each value as tag}
      <span class="metadata__item-value--tag tag">{tag}</span>
    {/each}
  </div>
{/snippet}

{#snippet text(value: string)}
  <span class="metadata__item-value">{value}</span>
{/snippet}

<article>
  <div class="metadata" bind:this={metadata}>
    <div class="metadata__title">
      <h2 bind:this={title}>
        {data.meta.title.title}
      </h2>
    </div>
    <div class="metadata__content" bind:this={content}>
      <GridItem heading="Metadata" noGap>
        {@render metadataItem('Date', data.meta.title.date, text)}
        {#each Object.entries(data.meta.body).filter(el => el[0] != 'description' && typeof el[1] != 'boolean') as [key, value]}
          {@render metadataItem(
            key,
            value as string | string[],
            key === 'tags' ? tags : text,
          )}
        {/each}
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

<style lang="scss">
  article {
    display: grid;
    row-gap: 2.8em;
    @include breakpoint-lg {
      grid-template-columns: 6fr 17fr;
      column-gap: 3em;
    }
  }
  .metadata {
    height: fit-content;
    will-change: auto;
    @include breakpoint-lg {
      position: sticky;
      top: 4em;
    }
    &__title {
      min-height: 0px;
      font-size: 2.8rem;
      h2 {
        margin-bottom: 2.4rem;
      }
      display: none;
      @include breakpoint-lg {
        display: block;
      }
    }
    &__content {
      color: $minor-text-color;
      transform: translateY(0);
      text-transform: uppercase;
      font-size: 1.2rem;
      font-family: $font-monospace;
      letter-spacing: -0.04em;
    }
    &__item {
      grid-column: 1 / -1;
      display: grid;
      grid-template-columns: 1fr 1fr;
      padding: 1.2rem 0;
      border-bottom: 0.5px solid $body-text-color;
      &-value {
        display: flex;
        align-content: flex-start;
        flex-wrap: wrap;
        gap: 0.5rem;
      }
    }
  }
</style>
