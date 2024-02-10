<script lang="ts">
  import { Icon } from "$lib";
  import FaIcon from "$lib/components/FaIcon.svelte";
  import ImageCard from "$lib/components/ImageCard.svelte";
  import { page } from "$app/stores";

  export let data;

  let searchTerm = "";
</script>

<div class="flex min-h-screen bg-orange-50">
  <!-- Main content area -->
  <div class="flex-1 overflow-y-auto">
    <div class="w-full p-8">
      <div class="flex justify-center mb-8">
        <div class="relative w-full max-w-xl">
          <input
            type="text"
            class="w-full pl-10 pr-4 py-2 rounded-full text-gray-700 placeholder-gray-500 border border-gray-200"
            placeholder="Search..."
            bind:value={searchTerm}
          />
          <div class="absolute left-0 top-0 mt-3 ml-3">
            <FaIcon icon={Icon.MAGNIFYING_GLASS} className="w-full h-full" />
          </div>
        </div>
      </div>
      <div class="flex flex-row flex-wrap gap-x-2 gap-y-4">
        {#if data}
          {#each data.posts as post (post.imageId)}
            <a
              class="relative h-24 xl:h-56"
              href={`/groups/${$page.params.groupId}/details`}
            >
              <ImageCard src={post.url} />
            </a>
          {/each}
        {/if}
      </div>
    </div>
  </div>
</div>
