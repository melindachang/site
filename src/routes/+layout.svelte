<script lang="ts">
  import Navigation from "$lib/components/Navigation.svelte";
  import "$lib/sass/app.sass";

  let { children } = $props();
</script>

<main>
  <Navigation />
  {@render children()}
</main>

<style lang="sass">
  @use '../lib/sass/_variables'
  
  main
    width: variables.$content-width
</style>
