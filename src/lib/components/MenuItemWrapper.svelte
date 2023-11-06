<script>
  export let url;
</script>

{#if url}
  <a class="menu__item-text-wrapper" href={url} target="_blank">
    <slot />
  </a>
{:else}
  <slot />
{/if}

<style lang="sass">
  a
    text-decoration: none
</style>
