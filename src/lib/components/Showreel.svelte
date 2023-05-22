<script>
  import { onMount } from "svelte";

  const lerp = (f0, f1, t) => (1 - t) * f0 + t * f1;
  const clamp = (val, min, max) => Math.max(min, Math.min(val, max));

  class DragScroll {
    el;
    wrap;
    bar;
    items = [
      { src: "", title: "" },
      { src: "", title: "" },
      { src: "", title: "" },
      { src: "", title: "" },
      { src: "", title: "" },
      { src: "", title: "" },
      { src: "", title: "" },
      { src: "", title: "" },
      { src: "", title: "" },
    ];
    itemRefs = [];

    init() {
      this.x = 0;
      this.progress = 0;
      this.speed = 0;
      this.oldX = 0;
      this.playrate = 0;

      this.bindings();
      this.calculate();
      this.raf();
    }

    bindings() {
      [
        "calculate",
        "raf",
        "handleWheel",
        "move",
        "handleTouchStart",
        "handleTouchMove",
        "handleTouchEnd",
      ].forEach((method) => {
        this[method] = this[method].bind(this);
      });
    }

    calculate() {
      this.progress = 0;
      this.wrapWidth = this.itemRefs[0].clientWidth * this.items.length;
      this.wrap.style.width = `${this.wrapWidth}px`;
      this.maxScroll = this.wrapWidth - this.el.clientWidth;
    }

    handleWheel(e) {
      this.progress += e.deltaY;
      this.move();
    }

    handleTouchStart(e) {
      e.preventDefault();
      this.dragging = true;
      this.startX = e.clientX || e.touches[0].clientX;
    }

    handleTouchMove(e) {
      if (!this.dragging) return false;
      const x = e.clientX || e.touches[0].clientX;
      this.progress += (this.startX - x) * 2.5;
      this.startX = x;
      this.move();
    }

    handleTouchEnd() {
      this.dragging = false;
    }

    move() {
      this.progress = clamp(this.progress, 0, this.maxScroll);
    }

    raf() {
      this.x = lerp(this.x, this.progress, 0.1);
      this.playrate = this.x / this.maxScroll;
      this.wrap.style.transform = `translateX(${-this.x}px)`;
      this.bar.style.transform = `scaleX(${0.18 + this.playrate * 0.82})`;
      this.speed = Math.min(100, this.oldX - this.x);
      this.oldX = this.x;
      this.scale = lerp(this.scale, this.speed, 0.1);
      this.itemRefs.forEach((item) => {
        item.style.transform = `scale(${1 - Math.abs(this.speed) * 0.005})`;
        item.querySelector("img").style.transform = `scaleX(${
          1 + Math.abs(this.speed) * 0.004
        })`;
      });
    }
  }

  let scroll = new DragScroll();
  onMount(() => {
    scroll.init();

    const animateScroll = () => {
      requestAnimationFrame(animateScroll);
      scroll.raf();
    };

    animateScroll();
  });
</script>

<svelte:window
  on:resize={scroll.calculate}
  on:wheel={scroll.handleWheel}
  on:touchmove={scroll.handleTouchMove}
  on:touchend={scroll.handleTouchEnd}
  on:mousedown={scroll.handleTouchStart}
  on:mousemove={scroll.handleTouchMove}
  on:mouseup={scroll.handleTouchEnd}
/>

<svelte:body on:mouseleave={scroll.handleMouseLeave} />

<a href="google.com" id="showreel">Showreel</a>
<div
  class="slider"
  bind:this={scroll.el}
  on:touchstart={scroll.handleTouchStart}
>
  <div class="slider-wrapper" bind:this={scroll.wrap}>
    {#each scroll.items as item, i}
      <div class="slider-item" bind:this={scroll.itemRefs[i]}>
        <figure>
          <img src={item.src} alt={item.title} />
        </figure>
      </div>
    {/each}
  </div>
  <div class="slider-progress">
    <div class="slider-progress-bar" bind:this={scroll.bar} />
  </div>
</div>

<style lang="sass">
  @use '../sass/variables'

  #showreel
    position: absolute
    text-decoration: none
    color: white
    bottom: 0
    right: 0
    padding: 2em 1em

  .slider
    width: 100%
    cursor: grab

    &-wrapper
      white-space: nowrap

    &-item
      display: inline-block
      width: 80vw
      padding: 3vw
      @media screen and ( min-width: variables.$grid-breakpoint-sm )
        width: 60vw
      @media screen and ( min-width: variables.$grid-breakpoint-lg )
        width: 40vw
      
      figure
        position: relative
        padding-bottom: 100%
        @media screen and ( min-width: variables.$grid-breakpoint-sm )
          padding-bottom: 70%
        @media screen and ( min-width: variables.$grid-breakpoint-lg )
          padding-bottom: 50%
        overflow: hidden
        background: blue
        
        img
          position: absolute
          width: 100%
          object-fit: cover

    &-progress
      position: fixed
      bottom: 0
      left: 0
      width: 20vw
      height: .2rem
      margin: 2em
      background: rgba(255,255,255,.1)

      &-bar
        position: absolute
        width: 100%
        height: 100%
        background: rgba(255,255,255,.8)
        transform: scaleX(0)
        transform-origin: 0 0

</style>
