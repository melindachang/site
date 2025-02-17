<script lang="ts">
  import GridItem from '$lib/components/GridItem.svelte'
  import GridItemCollapsible from '$lib/components/GridItemCollapsible.svelte'
  import Section from '$lib/components/Section.svelte'

  // let { data } = $props();
</script>

<Section title="About" numItems="4">
  <div class="grid">
    <GridItem heading="Bio">
      Hello! I'm Melinda, a first-year student at Northwestern University
      double-majoring in <b>Computer Science</b>
      and <b>English Literature</b> with a (prospective) minor in
      <b>Art History</b>.
      <br />
      In my free time, I take pictures of Chicago,
      <a href="/writing">write about whatever I want</a>, and commit human
      rights violations on
      <em>The Sims 4</em>.
      <GridItemCollapsible title="Books I'm reading">
        <ul>
          <li><em>Beloved</em> by Toni Morrison</li>
          <li>
            <em>Committed: On Meaning and Madwomen</em> by Suzanne Scanlon
          </li>
          <li><em>A Lover's Discourse: Fragments</em> by Roland Barthes</li>
        </ul>
      </GridItemCollapsible>
    </GridItem>
    <GridItem heading="Research interests">
      <ul>
        <li>
          The intersection between <b>programming languages</b>,
          <b>systems</b>, and
          <b>human-computer interaction</b>: Democratizing software engineering
          such that everyone can leverage programming tools to their maximum
          effect
        </li>
        <li>
          <b>Digital humanities</b>: Building diverse computational solutions to
          facilitate humanities scholarship, esp. in heritage science
        </li>
        <li>
          <b>AI ethics</b>: Exploring how creatives can live and work
          effectively within a generative information economy, developing
          technologies to combat exploitative AI
        </li>
      </ul>
    </GridItem>
    <GridItem heading="What I'm doing">
      Apart from research, I'm one of the organizers of WildHacks, the biggest
      hackathon at Northwestern; I'm a staff writer for our campus satire
      magazine, <em>The Flipside</em>; and I'm a member of the Responsible AI
      Student Organization (RAISO).
      <br />
      The Internet isn't as fun as it used to be&mdash;most of the non-academic software
      I write these days is in service of fixing that.
      <a href="/projects">See what I'm working on</a>.
    </GridItem>
    <GridItem heading="Find me everywhere">
      You can reach me via email at <code>melinda [at] u.northwestern.edu</code
      >. If you want to watch me shout into the void, I'm also on
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
</Section>

<style lang="sass">
  @use '../lib/sass/_variables'
  @use '../lib/sass/_breakpoints'

  .grid
    display: grid
    gap: 5.6rem
    @include breakpoints.lg
      grid-template-columns: repeat(2, 1fr)
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
