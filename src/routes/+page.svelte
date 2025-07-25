<script lang="ts">
  import Entry from '$lib/components/Entry.svelte'
  import GridItem from '$lib/components/GridItem.svelte'
  import LinkEntry from '$lib/components/LinkEntry.svelte'
  import SpotifyWidget from '$lib/components/SpotifyWidget.svelte'
  import { map_to_entry } from '$lib/utils/utils'
  import { userState } from '$lib/data/state.svelte.js'
  import { onMount } from 'svelte'

  let showFailures = $state(false)
  let time = $state(new Date()),
    locale_str = $derived(
      time.toLocaleTimeString('en-US', { timeZone: 'America/Los_Angeles' }),
    )

  onMount(() => {
    const interval = setInterval(() => {
      time = new Date()
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  })
</script>

<svelte:head>
  <title>Melinda Chang</title>
</svelte:head>

{#snippet detail()}
  <svg
    class="grid__item--info-icon"
    width="13"
    height="14"
    viewBox="0 0 13 14"
    xmlns="http://www.w3.org/2000/svg">
    <path d="M5.2 10.883H2.6v2.588h2.6v-2.588Z"></path>
    <path d="M5.2 5.708H2.6v2.588h2.6V5.708Z"></path>
    <path d="M2.6 8.296H0v2.587h2.6V8.296Z"></path>
    <path d="M5.2.53H2.6v2.587h2.6V.529Z"></path>
    <path d="M2.6 3.12H0v2.588h2.6V3.121Z"></path>
    <path d="M13 3.12h-2.6v2.588H13V3.121Z"></path>
    <path d="M7.801 3.12h-2.6v2.588h2.6V3.121Z"></path>
    <path d="M10.399.53h-2.6v2.587h2.6V.529Z"></path>
    <path d="M7.801 8.296h-2.6v2.587h2.6V8.296Z"></path>
    <path d="M13 8.296h-2.6v2.587H13V8.296Z"></path>
    <path d="M10.399 10.883h-2.6v2.588h2.6v-2.588Z"></path>
    <path d="M10.399 5.708h-2.6v2.588h2.6V5.708Z"></path>
  </svg>
{/snippet}

<div class="grid">
  <div class="grid__column--left">
    <GridItem heading="Info">
      <p class="grid__item--info-locale minor-text">
        {@render detail()}
        <span>It is {locale_str} in San Diego, CA.</span>
      </p>
      <SpotifyWidget />
    </GridItem>
    <GridItem heading="Everywhere">
      <p class="grid__item--social">
        <a
          class="grid__item--social-link tag"
          href="mailto:melindachang.hy@gmail.com"
          target="_blank">
          Email
        </a>
        <a
          class="grid__item--social-link tag"
          href="https://codeberg.org/melindachang"
          target="_blank">
          Codeberg
        </a>
        <a
          class="grid__item--social-link tag"
          href="https://linkedin.com/in/melindahchang"
          target="_blank">
          Linkedin
        </a>
        <a
          class="grid__item--social-link tag"
          href="https://instagram.com/changrybird"
          target="_blank">
          Instagram
        </a>
        <a
          class="grid__item--social-link tag"
          href="https:/letterboxd.com/hychang"
          target="_blank">
          Letterboxd
        </a>
        <a
          class="grid__item--social-link tag"
          href="https://goodreads.com/hychang"
          target="_blank">
          Goodreads
        </a>
        <span class="grid__item--social-link"> 🍉 </span>
      </p>
    </GridItem>
  </div>
  <div class="grid__column--right">
    <GridItem heading="Bio">
      <LinkEntry
        links={[
          {
            type: 'Software',
            href: 'https://www.codeberg.org/melindachang',
            external: true,
          },
          { type: 'Writing', href: '/notes', external: false },
        ]}>
        <p>
          Hello! I'm a rising second-year student at Northwestern majoring in <span
            class="highlight">Computer Science</span>
          and <span class="highlight">Comparative Literary Studies</span>.
        </p>
        <p>
          My research interests span <span class="highlight"
            >natural language processing</span
          >, <span class="highlight">computer vision</span>, and
          <span class="highlight">cultural analytics</span>. That is, I want to
          leverage humanistic theoretical resources to develop computational
          tools and methods, as well as explore their affordances in the study
          of cultural objects and cultural production broadly defined.
        </p>
        <p>
          A few secondary interests: the theory and practice of (<a
            href="https://www.gnu.org/philosophy/free-sw.en.html#four-freedoms"
            target="_blank">free</a
          >) software engineering&mdash;programming language design, compilers,
          type systems, language-based security, defensive computing. 19th- and
          20th-century European literature, Sinophone cinema, aesthetics, global
          modernism.
        </p>
      </LinkEntry>
    </GridItem>
    <GridItem
      heading="Work"
      noGap
      fn={() => (showFailures = !showFailures)}
      fnName={showFailures ? 'Hide Failures' : 'Show Failures'}>
      {#each userState.work_timeline as work}
        {#if !work.isFailure || showFailures}
          <Entry data={map_to_entry(work)} isFailure={work.isFailure} />
        {/if}
      {/each}
    </GridItem>
    <GridItem heading="Publications">
      {#each userState.publications as { title, authors, venue, links }}
        <LinkEntry {links}>
          <div class="publication">
            <h2 class="publication__title">{title}</h2>
            <p class="publication__subtitle">
              {@html `${authors
                .map(a =>
                  a === 'Melinda Chang'
                    ? `<span class="highlight">${a}</span>`
                    : a,
                )
                .join(', ')} &mdash; ${venue}`}
            </p>
          </div>
        </LinkEntry>
      {/each}
    </GridItem>
  </div>
</div>

<style lang="scss">
  .grid {
    display: grid;
    row-gap: 5.6rem;
    @include breakpoint-lg {
      grid-template-columns: minmax(0, 1fr) minmax(0, 3fr);
      column-gap: 5.6rem;
    }
    &__column {
      &--left {
        height: fit-content;
        will-change: auto;
        @include breakpoint-lg {
          top: 4em;
          position: sticky;
        }
      }
      &--right {
        display: grid;
        // line-height: 1.5;
        row-gap: 5.6rem;
      }
    }

    &__item {
      &--info {
        &-locale {
          display: flex;
          align-items: center;
          gap: 1em;
        }
        &-icon {
          fill: $body-text-color;
        }
      }
      &--social {
        display: flex;
        flex-wrap: wrap;
        gap: 4px;
        &-link {
          font-size: 1.2rem;
        }
      }
    }
  }

  .publication {
    &__title {
      margin-bottom: 1.6rem;
    }
    &__subtitle {
      text-indent: 0;
    }
  }
</style>
