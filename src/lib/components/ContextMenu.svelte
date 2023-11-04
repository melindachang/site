<script>
  export let context;
</script>

<div class="context__menu">
  {#each context as item}
    <div class="context__menu-item">
      <a href={item.url}>{item.name}</a>
    </div>
  {/each}
</div>

<style lang="sass">
  @use '$lib/sass/variables'

  .context__menu
    z-index: 2
    position: absolute
    display: flex
    flex-direction: column
    border-radius: 1.6rem
    &-item
      margin: 0
      text-align: center
      padding: 2rem
      a
        color: variables.$font-color
        text-decoration: none
</style>
