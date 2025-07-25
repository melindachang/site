<script lang="ts">
  import PlusMinusIcon from '$lib/assets/icons/PlusMinusIcon.svelte'
  import type { Article, Entry, Work } from '$lib/utils/interfaces'
  import { gsap } from 'gsap'
  import { onMount, type Snippet } from 'svelte'

  type Props = { data: Entry<Article> | Entry<Work>; isFailure: boolean }
  let { data, isFailure = false }: Props = $props()

  let expanded = $state(false),
    collapsible: HTMLDivElement,
    collapsibleBody: HTMLDivElement,
    titleHeight = $state(0)

  const tl = gsap.timeline()

  $effect(() => {
    expanded ? tl.play() : tl.reverse()
  })

  onMount(() => {
    tl.fromTo(
      collapsible,
      { height: `${titleHeight}px` },
      {
        height: `${titleHeight + collapsibleBody.clientHeight}px`,
        duration: 0.35,
        ease: 'power1.inOut',
      },
    ).fromTo(
      collapsibleBody,
      { autoAlpha: 0 },
      { autoAlpha: 1, duration: 0.35, ease: 'power1.inOut' },
      '<',
    )
  })
</script>

{#snippet entryItem(
  key: string,
  value: string | string[],
  snippet: Snippet<[any]>,
)}
  <div class="body__item">
    <div class="body__item-caption">
      <span class="body__item-caption-text minor-text"
        >{key.toUpperCase()}:
      </span>
    </div>
    {@render snippet(value)}
  </div>
{/snippet}

{#snippet tags(value: string[])}
  <div class="body__item__value--tags">
    {#each value as tag}
      <span class="tag minor-text">{tag}</span>
    {/each}
  </div>
{/snippet}

{#snippet text(value: string)}
  <p class="body__item__value--text">{@html value}</p>
{/snippet}

<div class={['entry', isFailure && 'entry--failure']} bind:this={collapsible}>
  <div class="title" bind:clientHeight={titleHeight}>
    <div class="title__date">
      <div class="title__date-text minor-text">
        <i class="title__date-text-icon"></i>
        <span>{data.title.date}</span>
      </div>
    </div>
    <a class="title__link" href={data.title.href}
      ><h3 class="title__link-text">{@html data.title.title}</h3></a>
    <button class="title__icon" onclick={() => (expanded = !expanded)}>
      <PlusMinusIcon {expanded} width={18} height={18} />
    </button>
  </div>
  <div class="body" bind:this={collapsibleBody}>
    {#each Object.entries(data.body).filter(el => typeof el[1] != 'boolean') as [key, value]}
      {@render entryItem(
        key,
        value as string | string[],
        key === 'tags' ? tags : text,
      )}
    {/each}
  </div>
</div>

<style lang="scss">
  .entry {
    display: grid;
    border-bottom: 0.5px solid $body-text-color;
    overflow-y: hidden;
    @include breakpoint-lg {
      column-gap: 4px;
      grid-template-columns: 2fr 11fr;
    }

    p,
    a {
      text-indent: 0;
      text-decoration: none;
      margin: 0;
      padding: 0;
      color: inherit;
      // letter-spacing: -0.04em;
    }

    &#{&}--failure {
      .title {
        &__date-text-icon {
          background: $graphic-color;
        }
        &__link-text {
          color: $graphic-color;
        }
      }
    }
    .title {
      text-decoration: none;
      grid-column: 1 / -1;
      display: grid;
      grid-auto-rows: min-content;
      align-items: center;
      grid-template-columns: 10fr 1fr;

      @include breakpoint-lg {
        gap: 1rem;
        grid-template-columns: 2fr 10fr 1fr;
      }

      &:hover {
        background: $highlight-color;

        .title {
          &__date {
            color: $text-inverted-color;

            &-text-icon {
              background: $text-inverted-color;
            }
          }
          &__link-text,
          &__icon {
            color: $text-inverted-color;
          }
        }

        /* &__date {
           color: $text-inverted-color;
           &-text-icon {
           background: $text-inverted-color;
           }
           }

           &__link-text {
           color: $text-inverted-color;
           } */
      }

      &__date {
        color: $minor-text-color;
        padding-top: 1.3rem;
        grid-column: 1 / -1;
        @include breakpoint-lg {
          grid-column: 1;
          padding: 0;
        }
        &-text {
          display: inline-flex;
          gap: 1rem;
          align-items: center;
          &-icon {
            background: $minor-text-color;
            height: 0.8rem;
            width: 0.8rem;
          }
        }
      }

      &__link {
        &-text {
          padding: 1.3rem 0;
          font-size: 2.2rem;
          line-height: 100%;
          @include breakpoint-md {
            font-size: 2.5rem;
          }
        }
      }
      &__icon {
        cursor: pointer;
        background: none;
        color: $major-text-color;
        border: none;
      }
    }

    .body {
      grid-column: 1 / -1;
      padding: 2.4rem 0;
      display: grid;
      grid-template-columns: subgrid;

      &__item {
        &:not(:last-child) {
          margin-bottom: 1em;
        }
        grid-column: 1 / -1;
        display: grid;
        grid-template-columns: subgrid;
        row-gap: 1rem;
        line-height: 1.3;
        &-caption {
          grid-column: 1 / -1;
          @include breakpoint-lg {
            grid-column: 1;
          }
        }

        &__value {
          &--tags {
            display: flex;
            align-items: flex-start;
            flex-wrap: wrap;
            gap: 2px;
          }
        }
      }
    }
  }
</style>
