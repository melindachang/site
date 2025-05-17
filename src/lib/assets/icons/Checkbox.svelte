<script lang="ts">
  let { checked = $bindable(), width, height } = $props()
</script>

<div class="checkbox" style:width={`${width}px`} style:height={`${height}px`}>
  {#if checked}
    <svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"
      ><path
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="32"
        d="M352 176L217.6 336 160 272"
      /><rect
        x="64"
        y="64"
        width="384"
        height="384"
        rx="48"
        ry="48"
        fill="none"
        stroke="currentColor"
        stroke-linejoin="round"
        stroke-width="32"
      /></svg
    >
  {:else}
    <svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"
      ><path
        d="M416 448H96a32.09 32.09 0 01-32-32V96a32.09 32.09 0 0132-32h320a32.09 32.09 0 0132 32v320a32.09 32.09 0 01-32 32z"
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="32"
      /></svg
    >
  {/if}
</div>

<style lang="sass">
  @use '$lib/sass/_variables'
  .checkbox
    svg
      color: variables.$text-color
</style>
