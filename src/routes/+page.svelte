<script>
  import GridItemCollapsible from '$lib/components/GridItemCollapsible.svelte'
  import Section from '$lib/components/Section.svelte'

  // let { data } = $props();
</script>

<Section title="About" numItems="4">
  <div class="grid">
    <div class="grid__item">
      <div class="grid__item__header">/ Bio</div>
      <div class="grid__item__text">
        Hello! I'm Melinda, a first-year student at Northwestern University
        double-majoring in <b>Computer Science</b>
        and <b>English Literature</b> with a (prospective) minor in Philosophy.
        <br />
        In my free time, I take pictures of Chicago,
        <a href="/writing">write about whatever I want</a>, and commit human
        rights violations on
        <em>The Sims 4</em>.
        <GridItemCollapsible title="Books I'm reading">
          <ul>
            <li><em>Culture and Imperialism</em> by Edward Said</li>
            <li>
              <em>Camera Lucida: Reflections on Photography</em> by Roland Barthes
            </li>
            <li><em>Intercourse</em> by Andrea Dworkin</li>
            <li><em>The Master and Margarita</em> by Mikhail Bulgakov</li>
          </ul>
        </GridItemCollapsible>
      </div>
    </div>
    <div class="grid__item">
      <div class="grid__item__header">/ Research interests</div>
      <div class="grid__item__text">
        <ul>
          <li>
            The intersection between <b>programming languages</b>,
            <b>systems</b>, and
            <b>human-computer interaction</b>: Democratizing software
            engineering such that everyone can leverage programming tools to
            their maximum effect
          </li>
          <li>
            <b>Digital humanities</b>: Building diverse computational solutions
            to facilitate humanities research
          </li>
          <li>
            <b>AI ethics</b>: Exploring how creatives can live and work
            effectively within a generative information economy, developing
            technologies to combat exploitative AI
          </li>
        </ul>
      </div>
    </div>
    <div class="grid__item">
      <div class="grid__item__header">/ What I'm doing</div>
      <div class="grid__item__text">
        Apart from research, I'm one of the organizers of WildHacks, the biggest
        hackathon at Northwestern. I also write for our campus satire magazine, <em
          >The Flipside</em
        >, and I'm a member of the Responsible AI Student Organization (RAISO).
        <GridItemCollapsible title="Other things I'm looking forward to">
          <ul>
            <li>
              Attending the FKA twigs <a
                href="https://x.com/FKAtwigs/status/1834578269267705971"
                target="_blank">EUSEXUA</a
              > tour &dash; March
            </li>
            <li>Seeing Ichiko Aoba in concert &mdash; May</li>
          </ul>
        </GridItemCollapsible>
      </div>
    </div>
    <div class="grid__item">
      <div class="grid__item__header">/ Find me everywhere</div>
      <div class="grid__item__text">
        You can reach me via email at <code
          >melinda [at] u.northwestern.edu</code
        >. If you want to watch me shout into the void, I have also been told
        that I am "too" active on
        <a href="https://goodreads.com/hychang" target="_blank">Goodreads</a>
        and
        <a href="https://letterboxd.com/hychang" target="_blank">Letterboxd</a>.
      </div>
    </div>
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
    .grid__item
      display: flex
      flex-direction: column
      gap: 2.4rem
      .grid__item__header
        padding-bottom: .6rem
        font-size: 1.2rem
        font-family: variables.$font-monospace
        text-transform: uppercase
        border-bottom: .5px solid variables.$text-color
      .grid__item__text
        line-height: 1.5
        ul
          margin-top: 0
          list-style-type: square
          li:not(:last-child)
            margin-bottom: .6em
        a
          text-underline-offset: 2px
</style>
