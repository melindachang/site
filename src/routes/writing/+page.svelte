<script lang="ts">
  import GridItem from '$lib/components/GridItem.svelte'
  import Section from '$lib/components/Section.svelte'

  let { data } = $props()
</script>

<Section title={data.title}>
  <div class="grid">
    <GridItem heading="Filters">Test</GridItem>
    <GridItem heading="Pieces">Test</GridItem>
  </div>
</Section>

<style lang="sass">
  @use '../../lib/sass/_breakpoints'
  .grid
    display: grid
    gap: 5.6rem
    @include breakpoints.lg
      grid-template-columns: 1fr 3fr


</style>
