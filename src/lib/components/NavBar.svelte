<script lang="ts">
  import { goto } from '$app/navigation'
  import { onMount } from "svelte";

  let innerWidth: number;

  const pages = [
    {
      name: "Writing",
      keypress: "W",
      local: true,
      href: "/",
      active: false,
    },
    {
      name: "Projects",
      keypress: "P",
      local: true,
      href: "/projects",
      active: false,
    },
    {
      name: "GitHub",
      keypress: "G",
      local: false,
      href: "https://www.github.com/melindachang",
      active: false,
    },
    {
      name: "Linkedin",
      keypress: "L",
      local: false,
      href: "https://linkedin.com/in/melindahchang",
      active: false,
    },
    {
      name: "Contact",
      keypress: "C",
      local: false,
      href: "mailto:melinda@u.northwestern.edu",
      active: false,
    },
  ];

  const toggleActive = (i: number) => {
    pages.forEach((el) => (el.active = false));
    pages[i].active = true;
  };

  const handleKeypress = (e: KeyboardEvent) => {
    pages.forEach((el, i) => {
      if (el.keypress === e.key.toUpperCase()) {
        if (el.local) {
          toggleActive(i);
          goto(el.href);
        } else {
          window.open(el.href, "_blank");
        }
        return;
      }
    });
  };

  onMount(() => {
    const currentPath = window.location.pathname;
    let i = pages.findIndex((el) => el.href === currentPath);
    toggleActive(i);
  });
</script>

<svelte:window on:keypress={(e) => handleKeypress(e)} bind:innerWidth />

<div class="nav__container">
  {#each pages as page, i}
    <a
      href={page.href}
      target={!page.local ? "_blank" : null}
      class:active={page.local ? page.active : null}
      on:click={page.local ? () => toggleActive(i) : null}
    >
      {innerWidth >= 992 ? `[${page.keypress}] ${page.name}` : page.name}</a
    >
  {/each}
</div>

<style lang="sass">
  @use '$lib/sass/_variables'

  .nav__container
    position: fixed
    z-index: 99
    top: 0
    left: 0
    width: 100%
    padding: 1.2rem
    display: flex
    // justify-content: space-between
    a
      display: flex
      background: variables.$off-black-transparent
      font-size: 1.2rem
      line-height: 1.2
      text-decoration: none
      color: variables.$off-black
      padding: .5rem .8rem
      text-transform: uppercase
      font-family: variables.$font-monospace
      letter-spacing: -.3px
      border-radius: 2px
      &.active
        background: variables.$off-black
        color: variables.$off-white
      &:hover
        background: variables.$accent-bright
      &:not(:last-child)
        margin-right: .3rem
      &:last-child
        margin-left: auto



</style>
