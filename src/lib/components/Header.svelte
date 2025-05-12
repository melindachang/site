<script lang="ts">
  let { title, amount = 0 } = $props()
</script>

<header>
  <h1>{title}</h1>
  {#if amount > 0}
    <small>({amount})</small>
  {/if}
</header>

<style lang="sass">
  @use '$lib/sass/_variables'
  header
    margin: 4em 0 5.6rem 0
    display: flex
    align-items: start
    h1
      font-size: variables.$section-title-font-size
    small
      font-size: 2.2rem

</style>
