<script lang="ts">
  import GridItem from '$lib/components/GridItem.svelte'
  import Section from '$lib/components/Section.svelte'

  let { data } = $props()
</script>

<Section title={data.title}>
  <!-- <p>Test</p> -->
  <div class="grid">
    <GridItem heading="Publications">
      <div class="link-list">
        {#each data.publications as pub}
          <div class="link-list__item">
            <div class="link-list__item__info">
              <h2 class="link-list__item__title">{pub.title}</h2>
              <h3 class="link-list__item__subtitle">
                {@html pub.authors
                  .map(a => (a === 'Melinda Chang' ? `<em>${a}</em>` : a))
                  .join(', ')}
                &mdash;
                {pub.venue}
              </h3>
            </div>
            <div class="link-list__item__actions">
              {#each pub.links as link}
                <a
                  href={link.href}
                  target="_blank"
                  class="link-list__item__action"
                >
                  <div class="link-list__item__action__left">
                    <i class="link-list__item__action__icon--square"></i>View {link.type}
                  </div>
                  <svg
                    class="link-list__item__action__icon--arrow"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.5"
                      d="M17.25 15.25V6.75H8.75"
                    ></path>
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.5"
                      d="M17 7L6.75 17.25"
                    ></path>
                  </svg>
                </a>
              {/each}
            </div>
          </div>
        {/each}
      </div>
    </GridItem>
    <GridItem heading="Software">test</GridItem>
  </div>
</Section>

<style lang="sass">
  @use '../../lib/sass/_breakpoints'
  @use '../../lib/sass/_variables'

  .grid
    display: grid
    gap: 5.6rem
    .link-list
      display: flex
      flex-direction: column
      .link-list__item
        display: flex
        flex-direction: column
        gap: 2.4rem
        @include breakpoints.lg
          gap: 5.6rem
          flex-direction: row
        .link-list__item__info
          @include breakpoints.lg
            flex: 3
          .link-list__item__title
            margin: 0
            letter-spacing: -.04em
            font-weight: 400
            @include breakpoints.lg
              font-size: calc(14.5px + 0.78125vw)
            @include breakpoints.sm
              font-size: calc(3px + 2.5vw)
          .link-list__item__subtitle
            font-weight: 400
            margin: 0
            font-size: calc(14px + ((21 - 14) * (100vw - 390px) / (1728 - 390)))
        .link-list__item__actions
          display: flex
          flex-direction: column
          @include breakpoints.lg
            flex: 2
          .link-list__item__action
            text-decoration: none
            display: flex
            justify-content: space-between
            align-items: center
            padding: 1.6rem 0
            font-size: 1.6rem
            line-height: 100%
            text-transform: uppercase
            font-family: variables.$font-monospace
            &:not(:last-child)
              border-bottom: 0.5px dotted variables.$dotted-border-color
            &:hover
              cursor: pointer
              color: variables.$background-color
              background: variables.$text-color
              .link-list__item__action__icon--square
                background: variables.$background-color
              .link-list__item__action__icon--arrow
                color: variables.$background-color
            .link-list__item__action__icon--square
              display: inline-flex
              height: 1rem
              width: 1rem
              background: variables.$text-color
              margin-right: 1rem
            .link-list__item__action__icon--arrow
              display: inline-flex
              height: 1.4em
              width: 1.4em
              color: variables.$text-color
</style>
