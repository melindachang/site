<script>
  import { goto } from "$app/navigation";
  import { onMount } from "svelte";

  const pages = [
    {
      name: "Writing",
      keypress: "W",
      href: "/",
      active: false,
    },
    {
      name: "Projects",
      keypress: "P",
      href: "/projects",
      active: false,
    },
  ];

  const external_links = [
    {
      keypress: "G",
      href: "https://www.github.com/melindachang",
    },
    {
      keypress: "L",
      href: "https://www.linkedin.com/in/melindahchang",
    },
    {
      keypress: "C",
      href: "mailto:melindachang.hy@gmail.com",
    },
  ];

  const toggleActive = (i) => {
    pages.forEach((el) => (el.active = false));

    pages[i].active = true;
  };

  const handleKeypress = (e) => {
    pages.forEach((el, i) => {
      if (el.keypress === e.key.toUpperCase()) {
        toggleActive(i);
        goto(el.href);
        return;
      }
    });

    external_links.forEach((el) => {
      if (el.keypress === e.key.toUpperCase()) {
        window.open(el.href, "_blank");
      }
    });
  };

  onMount(() => {
    const currentPath = window.location.pathname;
    console.log(currentPath);
    let i = pages.findIndex((el) => el.href === currentPath);
    toggleActive(i);
  });
</script>

<svelte:window on:keypress={(e) => handleKeypress(e)} />

<div class="nav__container">
  <div class="nav__left">
    {#each pages as page, i}
      <a
        href={page.href}
        class:active={page.active}
        on:click={() => toggleActive(i)}>[{page.keypress}] {page.name}</a
      >
    {/each}
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
    position: fixed
    z-index: 99
    top: 0
    left: 0
    width: 100%
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
