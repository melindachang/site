<script>
  import GridItemCollapsible from '$lib/components/GridItemCollapsible.svelte'
  import Section from '$lib/components/Section.svelte'

  // let { data } = $props();
</script>

<Section title="About" numItems="4">
  <div class="grid">
    <div class="grid__row">
      <div class="grid__item">
        <div class="grid__item__header">/ Bio</div>
        <div class="grid__item__text">
          Hello! I'm a first-year student at Northwestern University
          double-majoring in <b>Computer Science</b>
          and <b>English Literature</b> with a (prospective) minor in
          <b>Philosophy</b>.
          <br />
          In my free time, I take pictures of Chicago,
          <a href="/writing">write about whatever I want</a>, and commit human
          rights violations on
          <em>The Sims 4</em>.
          <GridItemCollapsible title="See what I'm reading">
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
        <div class="grid__item__header">/ (Research) interests</div>
        <div class="grid__item__text">
          <ul>
            <li>
              The intersection between <b>programming languages</b>,
              <b>systems</b>, and
              <b>human-computer interaction</b>: Democratizing software
              engineering for people with domain-specific requirements such that
              everyone can leverage programming tools to their maximum effect
            </li>
            <li>
              <b>Digital humanities</b>: Creating diverse computational
              solutions to facilitate humanities research
            </li>
            <li>
              <b>AI ethics</b>: Exploring how creatives can live and work
              effectively within a generative information economy, building AI
              literacy, developing technologies to combat malicious AI usage
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="grid__row">
      <div class="grid__item">
        <div class="grid__item__header">/ What I'm doing</div>
        <div class="grid__item__text"></div>
      </div>
      <div class="grid__item">
        <div class="grid__item__header">/ Find me everywhere</div>
      </div>
    </div>
  </div>
</Section>

<style lang="sass">
  @use '../lib/sass/_variables'

  .grid
    display: flex
    flex-direction: column
    row-gap: 5.6rem
    .grid__row
      display: flex
      column-gap: 5.6rem
      .grid__item
        display: flex
        flex: 1
        flex-direction: column
        gap: 2.4rem
        .grid__item__header
          padding-bottom: .6rem
          font-size: 1.2rem
          font-family: variables.$font-monospace
          text-transform: uppercase
          border-bottom: .5px solid variables.$text-color
        .grid__item__text
          ul
            margin-top: 0
            list-style-type: square
            li:not(:last-child)
              margin-bottom: .8rem
          // .grid__item__collapsible
          //   border-top: .5px dotted variables.$dotted-border-color
          //   border-bottom: .5px dotted variables.$dotted-border-color
          //   margin-top: 1.2rem
          //   .grid__item__collapsible__title
          //     padding: 1.2rem
          //     cursor: pointer
          //     font-family: variables.$font-monospace
          //     font-size: 1.2rem
          //     text-transform: uppercase
          //     display: flex
          //     align-items: center
          //     &:hover
          //       background: variables.$text-color
          //       color: variables.$background-color
          //     svg
          //       margin-right: .8rem
          //   .grid__item__collapsible__body
          //     padding: 1.2rem
          //     font-size: 1.2rem
          //     font-family: variables.$font-monospace
          //     text-transform: uppercase
            


</style>
