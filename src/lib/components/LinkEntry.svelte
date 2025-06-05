<script lang="ts">
  import type { Link } from '$lib/utils/interfaces'
  import type { Snippet } from 'svelte'

  let { links, children }: { links: Link[]; children: Snippet } = $props()
</script>

{#snippet arrowIcon()}
  <svg
    class="entry__actions-item-icon--arrow"
    width="24"
    height="19"
    viewBox="0 0 24 19"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    ><path
      class="brackets"
      d="M3.36682 3.63257H6.05571V4.55688H4.42317V13.5118H6.05571V14.4361H3.36682V3.63257ZM17.7753 3.63257H20.4642V14.4361H17.7753V13.5118H19.4079V4.55688H17.7753V3.63257Z"
      fill="currentColor"></path
    ><path
      class="arrow"
      d="M14.4732 6.8833V10.7027M14.4732 6.8833H10.6538M14.4732 6.8833L9.5625 11.794"
      stroke="currentColor"
      stroke-width="1.09127"></path
    ></svg>
{/snippet}

<div class="entry">
  <div class="entry__info">
    {@render children()}
  </div>
  <div class="entry__actions">
    {#each links as link}
      <a
        href={link.href}
        target={link.external ? '_blank' : undefined}
        class="entry__actions-item">
        <div class="entry__actions-item-text">
          <i class="entry__actions-item-icon--square"></i>{link.type}
        </div>
        {@render arrowIcon()}
      </a>
    {/each}
  </div>
</div>

<style lang="scss">
  @use '../scss/_variables';
  @use '../scss/_breakpoints';

  .entry {
    display: flex;
    flex-direction: column;
    row-gap: 2.4rem;
    border-bottom: 0.5px solid $body-text-color;
    padding-bottom: 2.4rem;
    @include breakpoint-lg {
      column-gap: 5.6rem;
      flex-direction: row;
    }
    &__info {
      display: flex;
      flex-direction: column;
      gap: 0.8em;
      @include breakpoint-lg {
        flex: 3;
      }
    }
    &__actions {
      display: flex;
      flex-direction: column;
      @include breakpoint-lg {
        flex: 2;
      }
      &-item {
        color: $minor-text-color;
        text-decoration: none;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1.6rem 0;
        font-size: 1.2rem;
        line-height: 100%;
        text-transform: uppercase;
        font-family: $font-monospace;

        &:not(:last-child) {
          border-bottom: 0.5px solid $body-text-color;
        }
        &:hover {
          cursor: pointer;
          color: $text-inverted-color;
          background: $highlight-color;
          .entry__actions-item-icon {
            &--square {
              background: $text-inverted-color;
            }
            &--arrow {
              color: $text-inverted-color;
            }
          }
        }
        &-icon {
          &--square {
            display: inline-flex;
            height: 0.8rem;
            width: 0.8rem;
            background: $minor-text-color;
            margin-right: 1rem;
          }
          &--arrow {
            display: inline-flex;
            height: 1.4em;
            color: $minor-text-color;
          }
        }
      }
    }
  }
</style>
