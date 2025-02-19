<script lang="ts">
  import { goto, onNavigate } from '$app/navigation'
  import { onMount } from 'svelte'

  let innerWidth: number

  const pages = [
    {
      name: 'About',
      keypress: 'A',
      local: true,
      href: '/',
      active: false,
    },
    {
      name: 'Projects',
      keypress: 'P',
      local: true,
      href: '/projects',
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
      name: 'Dashboard',
      keypress: 'D',
      local: true,
      href: '/dashboard',
      active: false,
    },
    {
      name: 'Contact',
      keypress: 'C',
      local: false,
      href: 'mailto:melinda@u.northwestern.edu',
      active: false,
    },
  ]

  const toggleActive = (i: number) => {
    pages.forEach(el => (el.active = false))
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

  onNavigate(() => {
    const currentPath = window.location.pathname
    let i = pages.findIndex(el => el.href === currentPath)
    toggleActive(i)
  })
</script>

<svelte:window on:keypress={e => handleKeypress(e)} bind:innerWidth />

<div class="nav">
  <div class="nav__content">
    {#each pages as page, i}
      <a
        class="nav__link"
        href={page.href}
        target={!page.local ? '_blank' : null}
        class:active={page.local ? page.active : null}
        on:click={page.local ? () => toggleActive(i) : null}
        data-sveltekit-preload-data
      >
        {innerWidth >= 992 ? `[${page.keypress}] ${page.name}` : page.name}</a
      >
    {/each}
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
    padding: 1.2rem
    display: flex
    justify-content: center
    .nav__content
      display: flex
      width: 100%
      max-width: map.get(breakpoints.$breakpoints, xxl)
      .nav__link
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
        &:last-child
          margin-left: auto



</style>
