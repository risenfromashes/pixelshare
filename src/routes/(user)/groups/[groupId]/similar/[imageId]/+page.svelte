<script lang="ts">
  import ImageCard from "$lib/components/ImageCard.svelte";
  import { page } from "$app/stores";

  /**
   * {
   *    refUrl: string, // contains the reference image URL
   *    images: {id: int, url: text, similarity: number}[] // contains list of images
   * }
   */
  export let data;
</script>

<div class="flex min-h-screen bg-orange-50">
  <div class="flex-none w-1/3 p-8">
    <div class="bg-orange-100 rounded-md p-4 shadow-md">
      {#if data && data.refUrl}
        <img
          src={data.refUrl}
          alt="Reference"
          class="w-full h-auto rounded-md"
        />
      {:else}
        <p>Reference Image Not Available</p>
      {/if}
    </div>
  </div>

  <div class="flex-1 overflow-y-auto p-8">
    <div class="flex flex-wrap gap-x-2 gap-y-4 mt-4">
      {#if data && data.images}
        {#each data.images as image (image.url)}
          <a
            class="relative h-24 xl:h-56"
            href="/groups/{$page.params.groupId}/similar/{image.id}"
          >
            <ImageCard src={image.url} />
          </a>
        {/each}
      {:else}
        <p>No Similar Images Found</p>
      {/if}
    </div>
  </div>
</div>
