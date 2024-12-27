<script>
  export let title;
</script>

<section class="section__container">
  <div class="section__title">
    <h1>{title}</h1>
  </div>
  <div class="section__content">
    <slot />
  </div>
</section>

<style lang="sass">
  @use '$lib/sass/variables'
  
  .section__container
    padding-top: 9.3rem
    display: flex
    flex-direction: column
    .section__title
      h1
        margin: 0
        font-weight: 400
        font-size: variables.$section-title-font-size
        letter-spacing: -.08em
  
</style>