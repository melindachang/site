<script>
  import gsap from "gsap";
  import MenuItem from "./MenuItem.svelte";
  import ContextMenu from "./ContextMenu.svelte";
  let menu;

  import yass from "$lib/assets/images/yass.jpg";
  import igem from "$lib/assets/images/wave-total.png";
  import million from "$lib/assets/images/million.png";
  import sungha from "$lib/assets/images/sunghajung.png";
  import rycelabs from "$lib/assets/images/shu.png";
  import michaela from "$lib/assets/images/michaela.png";
  import covidheroes from "$lib/assets/images/covidheroes.png";
  import hackthewave from "$lib/assets/images/htw.png";
  import { onMount } from "svelte";
  let items = [
    {
      title: "Million",
      pathName: million,
      types: ["Video", "Web"],
      context: [
        {
          name: "Trailer Video",
          url: "https://www.youtube.com/watch?v=Y2Yi_molJO4",
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
    },
    { title: "RYCE Labs", pathName: rycelabs, types: ["Graphic", "Web"] },
    { title: "iGEM", pathName: igem, types: ["Web", "Video"] },
    { title: "Hack the Wave", pathName: hackthewave, types: ["Graphic"] },
    { title: "Sungha Jung", pathName: sungha, types: ["Web"] },
    { title: "Steven Van", pathName: yass, types: ["Graphic"] },
    { title: "Clumsy", pathName: yass, types: ["Graphic"] },
    { title: "Andrew Foy", pathName: yass, types: ["Graphic"] },
    { title: "Michaela", pathName: michaela, types: ["web"] },
  ];

  onMount(() => {
    gsap.timeline().set(menu, { autoAlpha: 1, pointerEvents: "all" });
  });
</script>

<div class="menu" bind:this={menu}>
  {#each items as { title, pathName, types, context }}
    <MenuItem {title} {pathName} {types} />
    {#if context}
      <!-- <ContextMenu {context} /> -->
    {/if}
  {/each}
</div>
