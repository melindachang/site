<script>
  import gsap from "gsap";
  import MenuItem from "./MenuItem.svelte";
  let menu, handleClick;

  import yass from "$lib/assets/images/yass.jpg";
  import igem from "$lib/assets/images/wave-total.png";
  import million from "$lib/assets/images/million.png";
  import sungha from "$lib/assets/images/sunghajung.png";
  import rycelabs from "$lib/assets/images/shu.png";
  import michaela from "$lib/assets/images/michaela.png";
  import covidheroes from "$lib/assets/images/covid-heroes.png";
  import hackthewave from "$lib/assets/images/htw.png";

  import { onMount } from "svelte";
  import { activeContexts, eventFired } from "$lib/store.js";
  let items = [
    {
      title: "Million",
      pathName: million,
      types: ["Video", "Web"],
      context: [
        {
          name: "Trailer Video",
          url: "https://www.youtube.com/watch?v=KgnSM9NbV2s",
        },
        {
          name: "Website",
          url: "https://www.million.dev",
        },
      ],
    },
    {
      title: "COVID Heroes",
      pathName: covidheroes,
      types: ["Graphic", "Video"],
      context: [
        {
          name: "Trailer Video",
          url: "https://www.youtube.com/watch?v=jg8u7Eg5Wbc",
        },
      ],
    },
    {
      title: "RYCE Labs",
      pathName: rycelabs,
      types: ["Graphic", "Web"],
      context: [
        { name: "Shu Website", url: "https://shu-website.vercel.app" },
        { name: "GitHub", url: "https://github.com/rycelabs" },
      ],
    },
    {
      title: "iGEM",
      pathName: igem,
      types: ["Web", "Video"],
      context: [
        { name: "2023 Wiki", url: "https://2023.igem.wiki/cca-san-diego" },
        { name: "2022 Wiki", url: "https://2022.igem.wiki/cca-san-diego" },
        {
          name: "Promo Video",
          url: "https://video.igem.org/w/iENx4ZnHb9U6NZbVBt2MAD",
        },
      ],
    },
    {
      title: "Hack the Wave",
      pathName: hackthewave,
      types: ["Graphic"],
      url: "https://www.behance.net/gallery/183945265/Hack-the-Wave",
    },
    {
      title: "Sungha Jung",
      pathName: sungha,
      types: ["Web"],
      url: "https://www.behance.net/gallery/183949489/Sungha-Jung-landing-page-concept",
    },
    { title: "Steven Van", pathName: yass, types: ["Graphic"] },
    { title: "Clumsy", pathName: yass, types: ["Graphic"] },
    { title: "Andrew Foy", pathName: yass, types: ["Graphic"] },
    {
      title: "Michaela",
      pathName: michaela,
      types: ["Web"],
      url: "https://michaelachang-site.vercel.app",
    },
    { title: "MixoFX", pathName: "", types: ["Web"] },
  ];

  onMount(() => {
    gsap.timeline().set(menu, { autoAlpha: 1, pointerEvents: "all" });

    handleClick = (e) => {
      if (!e.target.className.includes("menu__item")) {
        activeContexts.update((currentData) => {
          return currentData.fill(true);
        });
      } else {
        let ind = e.target.closest(".menu__item").id.split("-")[1];
        activeContexts.update((currentData) => {
          currentData = currentData.fill(true);
          currentData[ind] = false;
          return currentData;
        });
        eventFired.update((currentData) => {
          currentData[ind] = { active: true, e };
          return currentData;
        });
      }
    };
  });
</script>

<svelte:window on:click|stopPropagation={handleClick} />

<div class="menu" bind:this={menu}>
  {#each items as { title, pathName, types, context, url }, i}
    <MenuItem {i} {title} {pathName} {types} {context} {url} />
  {/each}
</div>
