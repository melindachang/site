<script lang="ts">
  let { title, subtitle, links } = $props()
</script>

<div class="link-list__item">
  <div class="link-list__item__info">
    <h2 class="link-list__item__title">{title}</h2>
    <span class="link-list__item__subtitle">{@html subtitle}</span>
    <!-- <div class="link-list__item__tags">
      {#each tags as tag}
        <span class="link-list__item__tag"># {tag}</span>
      {/each}
    </div> -->
  </div>
  <div class="link-list__item__actions">
    {#each links as link}
      <a href={link.href} target="_blank" class="link-list__item__action">
        <div class="link-list__item__action__left">
          <i class="link-list__item__action__icon--square"></i>{link.type}
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

<style lang="sass">
  @use '../sass/_variables'
  @use '../sass/_breakpoints'

  .link-list__item
    display: flex
    flex-direction: column
    gap: 2.4rem
    border-bottom: 0.5px dotted variables.$dotted-border-color
    padding-bottom: 2.4rem
    @include breakpoints.lg
      gap: 5.6rem
      flex-direction: row
    .link-list__item__info
      display: flex
      gap: 1.6rem
      flex-direction: column
      @include breakpoints.lg
        flex: 3
      .link-list__item__title
        margin: 0
        line-height: 100%
        // font-size: calc(3px + 2.5vw)
        letter-spacing: -.04em
        font-weight: 400
        // font-size: 2.2rem
        // @include breakpoints.lg
        //   font-size: calc(14.5px + 0.78125vw)
      .link-list__item__subtitle
        font-weight: 400
        margin: 0
        letter-spacing: -.03em
        // font-size: calc(14px + (3 * (100vw - 390px) / (1728 - 390)))
        font-size: 1.6rem
      // .link-list__item__tags
      //   display: flex
      //   flex-wrap: wrap
      //   gap: 8px
      //   .link-list__item__tag
      //     text-decoration: none
      //     font-size: 1.2rem
      //     text-transform: uppercase
      //     font-family: variables.$font-monospace
      //     color: variables.$text-color
      //     border: 0.5px dotted variables.$dotted-border-color
      //     padding: 1px 4px 3px 4px
      //     border-radius: 4px

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
        font-size: 1.2rem
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
