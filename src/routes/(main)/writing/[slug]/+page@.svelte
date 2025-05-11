<script lang="ts">
  import GridItem from '$lib/components/GridItem.svelte'
  import Metadata from '$lib/components/Metadata.svelte'

  let { data } = $props()
</script>

<svelte:head>
  <title>{data.meta.title} &mdash; Melinda Chang</title>
</svelte:head>

<header>
  <h1>{data.meta.title}</h1>
</header>
<article>
  <div class="metadata">
    <GridItem heading="Metadata" noGap>
      <Metadata data={data.meta} />
    </GridItem>
  </div>
  <GridItem heading="Article">
    <div class="prose">
      <div class="prose__wrapper">
        <data.content />
      </div>
    </div>
  </GridItem>
</article>

<style lang="sass">
  @use '$lib/sass/_breakpoints'
  @use '$lib/sass/_variables'

  header
    margin: 4em 0
    h1
      font-size: variables.$section-title-font-size

  article
    display: grid
    gap: 3em
    @include breakpoints.lg
      grid-template-columns: 7fr 17fr



</style>
