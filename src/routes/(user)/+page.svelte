<script lang="ts">
  import { getContext } from "svelte";
  import { page } from "$app/stores";
  import type { Writable } from "svelte/store";
  import ImageCard from "$lib/components/ImageCard.svelte";

  export let data;

  const groupId: Writable<number> = getContext("groupId");
  $: groupId.set(Number.parseInt($page.params.groupId));
</script>

<!-- {#each mainContentItems as section} -->
{#if data.imageGroups}
  {#each data.imageGroups as group (group.name)}
    <div class="p-4 xl:p-10">
      <h2 class="text-xl font-bold mb-3">{group.name}</h2>
      <div class="flex flex-row flex-wrap gap-x-2 gap-y-4">
        {#if data}
          {#each group.images as post (post.id)}
            <a
              class="relative h-24 xl:h-56"
              href={`/groups/${$page.params.groupId}/details#image-${post.id}`}
            >
              <ImageCard src={post.url} />
            </a>
          {/each}
        {/if}
      </div>
    </div>
  {/each}
{/if}
