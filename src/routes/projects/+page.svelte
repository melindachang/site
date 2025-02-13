<script lang="ts">
  import GridItem from '$lib/components/GridItem.svelte'
  import Section from '$lib/components/Section.svelte'

  let { data } = $props()
</script>

<Section title={data.title}>
  <!-- <p>Test</p> -->
  <div class="grid">
    <GridItem heading="Publications">
      test
    </GridItem>
    <GridItem heading="Software">
      test
    </GridItem>
  </div>
</Section>

<style lang="sass">
  .grid
    display: grid
    gap: 5.6rem
</style>
