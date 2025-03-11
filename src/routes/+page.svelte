<script lang="ts">
  import GridItem from '$lib/components/GridItem.svelte'
  import ListItem from '$lib/components/ListItem.svelte'
  import TimelineItem from '$lib/components/TimelineItem.svelte'

  let { data } = $props()

  let showFailures = $state(false)
</script>

<div class="grid">
  <aside></aside>
  <div class="grid__content">
    <GridItem heading="Bio">
      <div class="grid__blurb">
        Hello! I'm a first-year student at Northwestern University studying <b
          >Computer Science</b
        >
        and <b>English Literature</b> with a minor in <b>Art History</b>.
        <br />My research interests include programming languages,
        human-computer interaction, natural language processing, cultural
        analytics, and the computational humanities. Elsewhere: 19th- and
        20th-century European fiction, aesthetics, cultural theory, global
        literary and cinematic modernism.
        <br />
        A lot of people think the Internet isn't fun anymore&mdash;I like to make
        software to prove that it still can be. I also take pictures of Chicago and
        <a href="/writing">write whatever I want</a>.
      </div>
    </GridItem>
    <GridItem heading="Publications">
      <div class="link-list">
        {#each data.publications as { title, authors, venue, tags, links }}
          <ListItem
            {title}
            subtitle={`${authors
              .map(a => (a === 'Melinda Chang' ? `<em>${a}</em>` : a))
              .join(', ')} &mdash; ${venue}`}
            {tags}
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
      {#each data.work as el}
        {#if !el.isFailure || showFailures}
          <TimelineItem data={el} alert={el.isFailure} />
        {/if}
      {/each}
    </GridItem>
    <GridItem heading="Play" noGap>
      {#each data.play as el}
        <TimelineItem data={el} />
      {/each}
    </GridItem>
    <!-- <GridItem heading="Play"><div class="link-list"></div></GridItem> -->
    <GridItem heading="Everywhere">
      You can reach me via email at <code>melinda [at] u.northwestern.edu</code
      >. I'm also on
      <a href="https://goodreads.com/hychang" target="_blank">Goodreads</a>
      and
      <a href="https://letterboxd.com/hychang" target="_blank">Letterboxd</a>.
      You will never find my Twitter account.
      <br />
      <div class="grid__item__socials">
        <a
          class="grid__item__socials__link"
          href="https://github.com/melindachang"
          target="_blank"
        >
          GitHub
        </a>
        <a
          class="grid__item__socials__link"
          href="https://linkedin.com/in/melindahchang"
          target="_blank"
        >
          Linkedin
        </a>
        <a
          class="grid__item__socials__link"
          href="https://instagram.com/changrybird"
          target="_blank"
        >
          Instagram
        </a>
      </div>
    </GridItem>
  </div>
</div>

<style lang="sass">
  @use '../lib/sass/_variables'
  @use '../lib/sass/_breakpoints'

  .grid
    display: grid
    grid-template-columns: 0 3fr
    @include breakpoints.lg
      gap: 5.6rem 
      grid-template-columns: 1fr 3fr
    .grid__content
      display: grid
      line-height: 1.5
      gap: 5.6rem
      @include breakpoints.lg
        max-width: 65ch
      .grid__item__socials
        .grid__item__socials__link
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
