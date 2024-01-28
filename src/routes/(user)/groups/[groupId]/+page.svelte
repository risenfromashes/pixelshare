<script lang="ts">
  import { getContext } from "svelte";
  import { page } from "$app/stores";
  import type { Writable } from "svelte/store";

  export let data;

  const groupId: Writable<number> = getContext("groupId");
  $: groupId.set(Number.parseInt($page.params.groupId));

  const items = [
    {
      postId: 1,
      imageId: 101,
      caption: "Beautiful Beach",
      createdAt: "2024-01-28",
      createdBy: "user123",
      url: "/sample/sample.jpg",
    },
    {
      postId: 1,
      imageId: 102,
      caption: "Beautiful Beach",
      createdAt: "2024-01-28",
      createdBy: "user123",
      url: "/sample/sample.jpg",
    },
    {
      postId: 2,
      imageId: 103,
      caption: "Mountain Hike",
      createdAt: "2024-01-29",
      createdBy: "user456",
      url: "/sample/sample.jpg",
    },
  ];
</script>

<!-- {#each mainContentItems as section} -->
<div class="p-4 xl:p-10">
  <h2 class="text-xl font-bold mb-3">Today's Highlights</h2>
  <div class="flex flex-row flex-wrap gap-x-2 gap-y-4">
    {#each data.images as image}
      <div class="relative h-24 xl:h-56">
        <img
          src={image.url}
          alt="Random"
          class="object-contain w-full h-full rounded-lg border-2 border-orange-200 shadow-lg"
        />
      </div>
    {/each}
  </div>
</div>
<!-- {/each} -->
