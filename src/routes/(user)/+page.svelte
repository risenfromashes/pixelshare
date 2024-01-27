<script lang="ts">
  const mainContentItems = [
    {
      title: "Today's Highlights",
      images: [
        { link: "sample/sample.jpg", caption: "lalalalalaaaaa" },
        { link: "sample/sample2.jpg", caption: "lalalalalaaaaa" },
        { link: "sample/sample3.jpg", caption: "lalalalalaaaaa" },
        { link: "sample/sample2.jpg", caption: "lalalalalaaaaa" },
      ],
    },
    {
      title: "Yesterday",
      images: [
        { link: "sample/sample2.jpg", caption: "lalalalalaaaaa" },
        { link: "sample/sample.jpg", caption: "lalalalalaaaaa" },
        { link: "sample/sample3.jpg", caption: "lalalalalaaaaa" },
      ],
    },
    {
      title: "Last Week",
      images: [
        { link: "sample/sample2.jpg", caption: "lalalalalaaaaa" },
        { link: "sample/sample3.jpg", caption: "lalalalalaaaaa" },
        { link: "sample/sample.jpg", caption: "lalalalalaaaaa" },
        { link: "sample/sample2.jpg", caption: "lalalalalaaaaa" },
        { link: "sample/sample3.jpg", caption: "lalalalalaaaaa" },
        { link: "sample/sample.jpg", caption: "lalalalalaaaaa" },
        { link: "sample/sample2.jpg", caption: "lalalalalaaaaa" },
        { link: "sample/sample3.jpg", caption: "lalalalalaaaaa" },
      ],
    },
  ];
</script>

{#each mainContentItems as section}
  <div class="p-4 xl:p-10">
    <h2 class="text-xl font-bold mb-3">{section.title}</h2>
    <div class="flex flex-row flex-wrap gap-x-2 gap-y-4">
      {#each section.images as image}
        <div class="relative h-24 xl:h-56">
          <img
            src={image.link}
            alt="Random"
            class="object-contain w-full h-full rounded-lg border-2 border-orange-200 shadow-lg"
          />
        </div>
      {/each}
    </div>
  </div>
{/each}
