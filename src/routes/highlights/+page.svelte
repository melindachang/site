<script lang="ts">
  import GridItem from '$lib/components/GridItem.svelte'
  import Highlight from '$lib/components/Highlight.svelte'

  let { data } = $props()
</script>

<div class="grid">
  <GridItem heading="Filters">Test</GridItem>
  <GridItem heading="Highlights" noGap>
    {#each data.highlights as h}
      <Highlight data={h} />
    {/each}
  </GridItem>
</div>

<style lang="sass">
  @use '../../lib/sass/_breakpoints'
  .grid
    display: grid
    gap: 5.6rem
    @include breakpoints.lg
      grid-template-columns: 1fr 3fr


</style>
