<script lang="ts">
  import { page } from "$app/state";

  let { children } = $props();
</script>

<div class="section__title">
  <h1>{page.data.title}</h1>
</div>
<div class="section__content">
  {@render children()}
</div>

<style lang="sass">
  @use '../../lib/sass/_variables'
  
  .section__title
    h1
      margin: 0
      font-weight: 400
      font-size: variables.$section-title-font-size
      letter-spacing: -.08em
</style>
