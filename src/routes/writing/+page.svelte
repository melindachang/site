<script lang="ts">
  import GridItem from '$lib/components/GridItem.svelte'
  import Entry from '$lib/components/Entry.svelte'
  import Filters from '$lib/components/Filters.svelte'
  import { map_to_entry } from '$lib/utils/utils.js'
  let { data } = $props()

  let { tags } = $state(data)
  let activeFilters = $derived(tags.filter(t => t.checked).map(t => t.name))
</script>

<div class="grid">
  <div class="filters">
    <GridItem heading="Filters">
      <Filters bind:tags />
    </GridItem>
  </div>
  <GridItem heading="Entries" noGap>
    {#each data.articles as article}
      {#if !activeFilters.length || activeFilters.some(f => article.categories.includes(f))}
        <Entry data={map_to_entry(article)} isFailure={false} />
      {/if}
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
    .filters
      display: none
      @include breakpoints.lg
        display: block

</style>
