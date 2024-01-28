<script lang="ts">
  import { getContext } from "svelte";
  import { page } from "$app/stores";
  import type { Writable } from "svelte/store";

  export let data;

  const groupId: Writable<number> = getContext("groupId");
  $: groupId.set(Number.parseInt($page.params.groupId));
</script>

<!-- {#each mainContentItems as section} -->
<div class="p-4 xl:p-10">
  <h2 class="text-xl font-bold mb-3">Today's Highlights</h2>
  <div class="flex flex-row flex-wrap gap-x-2 gap-y-4">
    {#each data.posts as post}
      <a
        class="relative h-24 xl:h-56"
        href={`/groups/${$page.params.groupId}/details`}
      >
        <img
          src={post.url}
          alt="Random"
          class="object-contain w-full h-full rounded-lg border-2 border-orange-200 shadow-lg"
        />
      </a>
    {/each}
  </div>
</div>
<!-- {/each} -->
