<script lang="ts">
  import GridItem from '$lib/components/GridItem.svelte'
  import ListItem from '$lib/components/ListItem.svelte'
  import Section from '$lib/components/Section.svelte'

  let { data } = $props()
</script>

<Section title={data.title} numItems={data.numItems}>
  <div class="grid">
    <GridItem heading="Publications">
      <div class="link-list">
        {#each data.publications as { title, authors, venue, tags, links }}
          <ListItem
            {title}
            subtitle={`${authors
              .map(a => (a === 'Melinda Chang' ? `<em>${a}</em>` : a))
              .join(', ')} &mdash; ${venue}`}
            {tags}
            {links}
          />
        {/each}
      </div>
    </GridItem>
    <GridItem heading="Software"><div class="link-list"></div></GridItem>
  </div>
</Section>

<style lang="sass">
  @use '../../lib/sass/_breakpoints'
  @use '../../lib/sass/_variables'

  .grid
    display: grid
    gap: 5.6rem
    .link-list
      display: flex
      flex-direction: column
      gap: 2.4rem
</style>
