<script lang="ts">
  import Entry from '$lib/components/Entry.svelte'
  import GridItem from '$lib/components/GridItem.svelte'
  import ListItem from '$lib/components/ListItem.svelte'
  import LocalTime from '$lib/components/LocalTime.svelte'
  import SpotifyWidget from '$lib/components/SpotifyWidget.svelte'
  import { map_to_entry } from '$lib/utils/utils'

  let { data } = $props()

  let showFailures = $state(false)
</script>

<svelte:head>
  <title>Melinda Chang</title>
</svelte:head>

<div class="grid">
  <GridItem heading="Info">
    <LocalTime />
    <SpotifyWidget song={data.song} />
  </GridItem>
  <div class="subgrid">
    <div class="subgrid__content">
      <GridItem heading="Bio">
        <p class="subgrid__blurb">
          Hello! I'm a first-year student at Northwestern majoring in <b>Computer Science</b>
          and <b>Comparative Literary Studies</b>.
          <br />My research interests span natural language processing (NLP), computer vision, and
          cultural analytics. That is, I leverage <em>humanistic</em> theoretical resources to
          develop
          <em>computational</em>
          tools and methods, as well as explore their affordances in the study of cultural objects and
          cultural production broadly defined.
          <br />
          Elsewhere: 19th- and 20th-century European literature, Sinophone cinema, aesthetics, global
          modernism. I also play with programming languages a lot and
          <a href="/writing">write whatever I want</a>.
        </p>
      </GridItem>
      <GridItem heading="Publications">
        <div class="link-list">
          {#each data.publications as { title, authors, venue, tags, links }}
            <ListItem
              {title}
              subtitle={`${authors
                .map(a => (a === 'Melinda Chang' ? `<em>${a}</em>` : a))
                .join(', ')} &mdash; ${venue}`}
              {links}
            />
          {/each}
        </div>
      </GridItem>
      <GridItem
        heading="Work"
        noGap
        fn={() => (showFailures = !showFailures)}
        fnName={showFailures ? 'Hide Failures' : 'Show Failures'}
      >
        <!-- {#each data.work as el}
          {#if !el.isFailure || showFailures}
            <TimelineItem data={el} alert={el.isFailure} />
          {/if}
        {/each} -->

        {#each data.work as el}
          {#if !el.isFailure || showFailures}
            <Entry data={map_to_entry(el)} isFailure={el.isFailure} />
          {/if}
        {/each}
      </GridItem>
      <!-- <GridItem heading="Play" noGap>
      {#each data.play as el}
        <TimelineItem data={el} />
      {/each}
    </GridItem> -->
      <!-- <GridItem heading="Play"><div class="link-list"></div></GridItem> -->
      <GridItem heading="Everywhere">
        You can reach me via email at <code>melinda [at] u.northwestern.edu</code>. I'm also on
        <a href="https://goodreads.com/hychang" target="_blank">Goodreads</a>
        and
        <a href="https://letterboxd.com/hychang" target="_blank">Letterboxd</a>. You will never find
        my Twitter account.
        <br />
        <div class="subgrid__item__socials">
          <a
            class="subgrid__item__socials__link"
            href="https://github.com/melindachang"
            target="_blank"
          >
            GitHub
          </a>
          <a
            class="subgrid__item__socials__link"
            href="https://linkedin.com/in/melindahchang"
            target="_blank"
          >
            Linkedin
          </a>
          <a
            class="subgrid__item__socials__link"
            href="https://instagram.com/changrybird"
            target="_blank"
          >
            Instagram
          </a>
        </div>
      </GridItem>
    </div>
  </div>
</div>

<style lang="sass">
  @use '$lib/sass/_variables'
  @use '$lib/sass/_breakpoints'

  .grid
    display: grid
    @include breakpoints.lg
      grid-template-columns: 1fr 3fr
      column-gap: 5.6rem
    .subgrid
      display: grid
      .subgrid__content
        display: grid
        line-height: 1.5
        row-gap: 5.6rem
        // @include breakpoints.lg
        //   max-width: 65ch
        .subgrid__item__socials
          .subgrid__item__socials__link
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
