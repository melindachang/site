<script lang="ts">
  import { onMount } from 'svelte'

  let time = $state(new Date())
  let locale_str = $derived(
    time.toLocaleTimeString('en-US', { timeZone: 'America/Chicago' }),
  )

  onMount(() => {
    const interval = setInterval(() => {
      time = new Date()
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  })
</script>

<p>
  It is <span class="time">{locale_str}</span> in Evanston, IL
</p>

<style lang="sass">
  p
    line-height: 1.5
    margin: 0

</style>
