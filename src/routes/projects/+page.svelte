<script lang="ts">
  import Section from "$lib/components/Section.svelte";

  let { data } = $props();
</script>

<Section title={data.title}>
  <p>Test</p>
</Section>

<style lang="sass"></style>
