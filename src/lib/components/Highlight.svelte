<script lang="ts">
  let { data } = $props()
</script>

<div class="highlight">
  <div class="highlight__quote">
    <div class="highlight__caption highlight__date">
      <div class="highlight__date__text">
        <i class="highlight__date__icon"></i>
        <span>{data.date}</span>
      </div>
    </div>
    <span class="highlight__header__text">{data.quote}</span>
  </div>
  <div class="highlight__metadata">
    <div class="highlight__author">
      <span class="highlight__caption">Author:</span>
      <div class="highlight__author__text">
        <span>{data.author}</span>
      </div>
    </div>
    <div class="highlight__text">
      <span class="highlight__caption">Text:</span>
      <div class="highlight__text__text">
        <span
          >{@html data.title + (data.page ? ` (page ${data.page})` : '')}</span
        >
      </div>
    </div>
  </div>
</div>

<style lang="sass">
  @use '../sass/_variables'

  .highlight
    padding: 2.4rem 0
    border-bottom: 0.5px dotted variables.$dotted-border-color
    display: grid
    grid-template-columns: 6fr 1fr 3fr
    // .highlight__title 
    //   cursor: pointer
    //   padding: 1.2rem 0
    //   &:hover
    //     background: variables.$text-color
    //     color: variables.$background-color
    //     .highlight__date
    //       .highlight__date__icon
    //         background: variables.$background-color
    .highlight__caption
      text-transform: uppercase
      font-family: variables.$font-monospace
      font-size: 1.2rem
      &.highlight__date
        display: flex
        align-items: flex-start
        .highlight__date__text
          display: inline-flex
          gap: 1rem
          align-items: center
          .highlight__date__icon
            background: variables.$text-color
            height: 0.6rem
            width: 0.6rem
    .highlight__quote
      display: flex
      gap: 5.6rem
      font-family: variables.$font-serif
      font-size: 1.7rem
      line-height: 1.6
      grid-column: 1
    .highlight__metadata
      grid-column: 3
      & > div
        &:not(:last-child)
          margin-bottom: 1em
        display: grid
        grid-template-columns: 1fr 3fr
        align-items: center
        font-family: variables.$font-monospace
        font-size: 1.2rem
        text-transform: uppercase
        

</style>
