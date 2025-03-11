<script lang="ts">
  import MinusIcon from '$lib/assets/icons/MinusIcon.svelte'
  import PlusIcon from '$lib/assets/icons/PlusIcon.svelte'

  let { data, alert = false } = $props()
  let expanded = $state(false)
</script>

<div class="timeline-item">
  <div class="timeline-item__title">
    <div class="timeline-item__date">
      <i class={`timeline-item__date__icon timeline-item__date__icon${alert ? '--red' : ''}`}></i>
      <span class="timeline-item__date__text">{data.date}</span>
    </div>
    <div class="timeline-item__header">
      <span class="timeline-item__header__text">{data.title}</span>
      {#if data.summary}
        <div class="timeline-item__icon">
          {#if expanded}
            <MinusIcon />
          {:else}
            <PlusIcon />
          {/if}
        </div>
      {/if}
    </div>
  </div>
  {#if data.summary}
    <div class="timeline-item__body">
      <span class="timeline-item__body__label">Summary:</span>
      <p class="timeline-item__body__summary">{data.summary}</p>
    </div>
  {/if}
</div>

<style lang="sass">
  @use '../sass/_variables'

  .timeline-item
    overflow-y: hidden
    // height: calc(1em + 2*1.2rem)
    border-bottom: 0.5px dotted variables.$dotted-border-color
    .timeline-item__title 
      cursor: pointer
      padding: 1.2rem 0
      &:hover
        background: variables.$text-color
        color: variables.$background-color
        .timeline-item__date
          .timeline-item__date__icon
            background: variables.$background-color
      .timeline-item__date
        margin-bottom: 1rem
        gap: 1rem
        display: flex
        align-items: center
        .timeline-item__date__icon
          background: variables.$text-color
          height: 0.6rem
          width: 0.6rem
          &--red
            background: variables.$accent-red
        .timeline-item__date__text
          line-height: 1
          font-family: variables.$font-monospace
          font-size: 1.2rem
          text-transform: uppercase
      .timeline-item__header
        display: flex
        gap: 2.4rem
        align-items: center
        line-height: 1
        .timeline-item__header__text
          flex: 1
          line-height: 1em
    .timeline-item__body
      display: none
      opacity: 0
        

</style>
