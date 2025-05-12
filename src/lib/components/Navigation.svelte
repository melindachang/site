<script lang="ts">
  import { afterNavigate, goto } from '$app/navigation'
  import { onMount } from 'svelte'

  let innerWidth = $state(0)

  const pages = $state([
    {
      name: 'About',
      keypress: 'A',
      local: true,
      href: '/',
      active: false,
    },
    {
      name: 'Writing',
      keypress: 'W',
      local: true,
      href: '/writing',
      active: false,
    },
    {
      name: 'CV',
      keypress: 'C',
      local: false,
      href: 'https://melindachang.github.io/cv-latex/output.pdf',
      active: false,
    },
  ])

  const toggleActive = (i: number) => {
    pages.forEach(el => (el.active = false))
    if (i < 0) return
    pages[i].active = true
  }

  const handleKeypress = (e: KeyboardEvent) => {
    pages.forEach((el, i) => {
      if (el.keypress === e.key.toUpperCase()) {
        if (el.local) {
          toggleActive(i)
          goto(el.href)
        } else {
          window.open(el.href, '_blank')
        }
        return
      }
    })
  }

  onMount(() => {
    const currentPath = window.location.pathname
    let i = pages.findIndex(el => el.href === currentPath)
    toggleActive(i)
  })

  afterNavigate(() => {
    const currentPath = window.location.pathname
    let i = pages.findIndex(el => el.href === currentPath)
    toggleActive(i)
  })
</script>

<svelte:window on:keypress={e => handleKeypress(e)} bind:innerWidth />

<div class="nav">
  <div class="nav__content">
    <!-- <div class="nav__title">
      Melinda Chang <span class="nav__title--darker">(she/her)</span>
    </div>
    <aside class="spacer"></aside> -->
    <div class="nav__links">
      {#each pages as page, i}
        <a
          class={['nav__link', page.active && 'active']}
          href={page.href}
          target={!page.local ? '_blank' : null}
          onclick={page.local ? () => toggleActive(i) : null}
          data-sveltekit-preload-data
        >
          {innerWidth >= 992 ? `[${page.keypress}] ${page.name}` : page.name}</a
        >
      {/each}
    </div>
  </div>
</div>

<style lang="sass">
  @use '../sass/_variables'
  @use '../sass/_breakpoints'
  @use 'sass:map'

  .nav
    position: fixed
    z-index: 99
    top: 0
    left: 0
    width: 100%
    padding: 1em
    justify-content: center
    background-image: linear-gradient(to bottom, variables.$background-color, rgba(0,0,0,0))
    pointer-events: none
    .nav__content
      width: 100%
      display: grid
      // grid-template-columns: 1fr 0fr 1fr
      // @include breakpoints.lg
      //   gap: 5.6rem
      //   grid-template-columns: 2fr 1fr 3fr
      // @include breakpoints.xl
      //   grid-template-columns: 1fr 1fr 3fr
      // .nav__title
      //   // &--darker
      //   //   color: variables.$dotted-border-color
      .nav__links
        display: flex
        justify-content: end
        @include breakpoints.lg
          justify-content: start
        .nav__link
          pointer-events: auto
          display: flex
          background: variables.$background-color-lighter
          font-size: 1.2rem
          line-height: 1.2
          text-decoration: none
          color: variables.$text-color
          padding: .5rem .8rem
          text-transform: uppercase
          font-family: variables.$font-monospace
          letter-spacing: -.3px
          border-radius: 2px
          &.active, &:hover
            background: variables.$text-color
            color: variables.$background-color
          &:not(:last-child)
            margin-right: .3rem
          // &:last-child
          //   margin-left: auto



</style>
