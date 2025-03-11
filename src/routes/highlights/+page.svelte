<script lang="ts">
  import GridItem from '$lib/components/GridItem.svelte'

  let { data } = $props()
</script>

<div class="grid">
  <GridItem heading="Filters">Test</GridItem>
  <GridItem heading="Highlights" noGap>Test</GridItem>
</div>

<style lang="sass">
  @use '../../lib/sass/_breakpoints'
  .grid
    display: grid
    gap: 5.6rem
    @include breakpoints.lg
      grid-template-columns: 1fr 3fr


</style>
