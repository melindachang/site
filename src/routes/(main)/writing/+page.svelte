<script lang="ts">
  import GridItem from '$lib/components/GridItem.svelte'
  import Entry from '$lib/components/Entry.svelte'
  let { data } = $props()
</script>

<div class="grid">
  <GridItem heading="Filters">Test</GridItem>
  <GridItem heading="Entries" noGap>
    {#each data.articles as article}
      <Entry data={article} />
    {/each}
  </GridItem>
</div>

<style lang="sass">
  @use '$lib/sass/_breakpoints'
  .grid
    display: grid
    gap: 5.6rem
    @include breakpoints.lg
      grid-template-columns: 1fr 3fr

</style>
