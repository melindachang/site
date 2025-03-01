<script lang="ts">
  import GridItem from '$lib/components/GridItem.svelte'
  import ListItem from '$lib/components/ListItem.svelte'

  let { data } = $props()
</script>

<div class="grid">
  <GridItem heading="Bio">
    <div class="grid__blurb">
      Hello! I'm a first-year student at Northwestern University studying <b
        >Computer Science</b
      >
      and <b>English Literature</b> with a minor in <b>Art History</b>.
      <br />My interests include programming languages, human-computer
      interaction, AI ethics, and the computational humanities. Elsewhere: 19th-
      and 20th-century European fiction, aesthetics, cultural theory, global
      literary and cinematic modernism.
      <br />
      A lot of people think the Internet isn't fun anymore&mdash;I like to make software
      to prove that it still can be. I also take pictures of Chicago,
      <a href="/writing">write about whatever I want</a>, and commit human
      rights violations on
      <em>The Sims 4</em>.
    </div>
    <!-- <GridItemCollapsible title="Things I'm looking forward to">
      <ul>
        <li>
          Seeing FKA twigs live on the <em>EUSEXUA</em> tour! - March 2025
        </li>
        <li>Seeing Ichiko Aoba in concert - May 2025</li>
      </ul>
    </GridItemCollapsible> -->
  </GridItem>
  <!-- <GridItem heading="Research interests">
    <ul>
      <li>
        The intersection between <b>programming languages</b> and
        <b>human-computer interaction</b>: Democratizing software engineering
        such that everyone can leverage programming tools to their maximum
        effect
      </li>
      <li>
        <b>Computational humanities</b>: Building diverse computer-scientific
        solutions to facilitate humanities scholarship, esp. in heritage science
      </li>
      <li>
        <b>AI ethics</b>: Exploring how creatives can live and work effectively
        within a generative information economy; developing technologies to
        combat exploitative AI
      </li>
    </ul>
  </GridItem> -->
  <GridItem heading="Work">
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
  <!-- <GridItem heading="Play"><div class="link-list"></div></GridItem> -->
  <GridItem heading="Find me everywhere">
    You can reach me via email at <code>melinda [at] u.northwestern.edu</code>.
    If you want to watch me shout into the void, I'm also on
    <a href="https://goodreads.com/hychang" target="_blank">Goodreads</a>
    and
    <a href="https://letterboxd.com/hychang" target="_blank">Letterboxd</a>.
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

<style lang="sass">
  @use '../lib/sass/_variables'
  @use '../lib/sass/_breakpoints'

  .grid
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
