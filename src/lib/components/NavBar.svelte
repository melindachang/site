<div class="nav__container">
  <div class="nav__left">
    <a href="/blog" class="active">[W] WRITING</a>
    <a href="/projects">[P] PROJECTS</a>
    <a href="https://www.github.com/melindachang" target="_blank">[G] GITHUB</a>
    <a href="https://www.linkedin.com/in/melindahchang" target="_blank"
      >[L] LINKEDIN</a
    >
  </div>
  <div class="nav__right">
    <a href="mailto:melindachang.hy@gmail.com">[C] CONTACT</a>
  </div>
</div>

<style lang="sass">
  @use '$lib/sass/variables'

  .nav__container
    padding: 1.2rem
    display: flex
    justify-content: space-between
    a
      background: variables.$nav-btn-bg
      font-size: 1.2rem
      line-height: 1
      text-decoration: none
      color: variables.$font-color
      padding: .5rem .8rem
      text-transform: uppercase
      font-family: variables.$font-monospace
      border-radius: 2px
      &.active
        background: variables.$nav-btn-bg-active
        color: variables.$nav-btn-color-active
      &:hover
        background: variables.$nav-btn-bg-hover
      &:not(:last-child)
        margin-right: .2rem



</style>
