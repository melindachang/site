<script>
  export let title, pathName, types;
  let innertext, imageWrapper, item, itemLeft, itemTop, imageWidth, imageHeight;
  import gsap from "gsap";
  import { onMount } from "svelte";

  $: itemLeft = item && item.offsetLeft;
  $: itemTop = item && item.offsetTop;

  onMount(() => {
    gsap.timeline().from(innertext, {
      delay: 1,
      duration: 0.85,
      xPercent: 25,
      yPercent: 125,
      stagger: 0.095,
      skewY: gsap.utils.wrap([-8, 8]),
      ease: "expo.out",
    });

    gsap.defaults({
      duration: 0.55,
      ease: "expo.out",
    });
  });

  const onMouseEnter = () => {
    gsap.set(imageWrapper, {
      scale: 0.8,
      xPercent: 25,
      yPercent: 50,
      rotation: -15,
    });
    gsap.to(imageWrapper, {
      opacity: 1,
      scale: 1,
      yPercent: 0,
      rotation: 0,
    });
  };
  const onMouseLeave = () => {
    gsap.to(imageWrapper, {
      opacity: 0,
      xPercent: 25,
      yPercent: -50,
      scale: 0.8,
      rotation: -15,
    });
  };

  const onMouseMove = ({ x, y }) => {
    let yOffset = itemTop / imageHeight;
    yOffset = gsap.utils.mapRange(0, 1.5, -150, 150, yOffset);
    gsap.to(imageWrapper, {
      duration: 1.25,
      x: Math.abs(x - itemLeft) - imageWidth / 1.55,
      y: Math.abs(y - itemTop) - imageHeight / 2 - yOffset,
    });
  };
</script>

<div
  class="menu__item"
  bind:this={item}
  on:mousemove={onMouseMove}
  on:mouseenter={onMouseEnter}
  on:mouseleave={onMouseLeave}
>
  <div
    class="menu__item-image_wrapper"
    bind:this={imageWrapper}
    bind:clientHeight={imageHeight}
    bind:clientWidth={imageWidth}
  >
    <div class="menu__item-image_inner">
      <img src={pathName} class="menu__item-image" alt="" />
    </div>
  </div>
  <span class="menu__item-text">
    <span class="menu__item-innertext" bind:this={innertext}>{title}</span>
    <span class="menu__item-innertext-subtitle">[{types.join(" / ")}]</span>
  </span>
</div>

<style lang="sass">
  
  @use '$lib/sass/fonts'
  @use '$lib/sass/variables'

  .menu__item
    width: max-content
    &-image
      &_wrapper
        position: fixed
        top: 50%
        left: 50%
        transform: translate(-50%, -50%)
        width: 60rem
        height: 40rem
        pointer-events: none
        opacity: 0
        -webkit-box-shadow:0px 0px 105px 36px rgba(255,255,255,0.05)
        -moz-box-shadow: 0px 0px 105px 36px rgba(255,255,255,0.05)
        box-shadow: 0px 0px 105px 36px rgba(255,255,255,0.05)
      &, &_inner
        position: absolute
        left: 0
        top: 0
        height: 100%
        width: 100%
        object-fit: cover
    &-text
      position: relative
      font-family: variables.$font-huge
      font-weight: 700
      text-transform: uppercase
      font-size: 5vw
      line-height: 1em
      color: variables.$font-color
      opacity: 1
      transition: opacity .35s ease
      white-space: nowrap
      overflow: hidden
      cursor: pointer
    &-innertext-subtitle
      font-family: variables.$font-default
      font-size: 2.8rem
      font-weight: 400
    &:hover &-text
      color: variables.$font-accent
    &:hover &-image_wrapper
      z-index: -2
</style>
