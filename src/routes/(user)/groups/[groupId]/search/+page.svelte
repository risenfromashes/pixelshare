<script lang="ts">
  import { Icon } from "$lib";
  import FaIcon from "$lib/components/FaIcon.svelte";
  import ImageCard from "$lib/components/ImageCard.svelte";
  import { page } from "$app/stores";
  import { enhance } from "$app/forms";
  import Spinner from "$lib/components/Spinner.svelte";

  export let data;
  export let form;

  let images = data.posts;
  let searchBox: HTMLInputElement;
  let searchTerm = "";
  let loading = false;
</script>

<div class="flex min-h-screen bg-orange-50">
  <!-- Main content area -->
  <div class="flex-1 overflow-y-auto">
    <div class="w-full p-8">
      <div class="flex justify-center mb-8">
        <div class="relative w-full max-w-xl">
          <form
            method="POST"
            use:enhance={({
              formElement,
              formData,
              action,
              cancel,
              submitter,
            }) => {
              if (loading) {
                cancel();
              }
              loading = true;
              return async ({ result, update }) => {
                if (result.type === "success") {
                  images = result.data?.similarImages ?? [];
                }
                loading = false;
              };
            }}
          >
            <input
              bind:this={searchBox}
              name="query"
              type="text"
              class="w-full pl-10 pr-4 py-2 rounded-full text-gray-700 placeholder-gray-500 border border-gray-200"
              placeholder="Search..."
              bind:value={searchTerm}
            />
          </form>

          <div class="absolute left-0 top-0 mt-3 ml-3">
            <FaIcon icon={Icon.MAGNIFYING_GLASS} className="w-full h-full" />
          </div>

          {#if searchTerm.length > 0}
            <button
              class="absolute right-0 top-0 px-3 border-0 h-full rounded-r-3xl cursor-pointer text-2xl hover:font-bold"
              on:click={(e) => {
                e.preventDefault();
                searchTerm = "";
                searchBox.focus();
              }}
            >
              &times;
            </button>
          {/if}
        </div>
      </div>
      {#if form?.error}
        <div class="p-4 bg-red-100 text-red-500">{form.error}</div>
      {/if}
      {#if loading}
        <div class="text-center">
          Loading... <Spinner size={4} className="ml-2" />
        </div>
      {/if}
      {#if images.length === 0 && !loading}
        <div class="text-center">No images found</div>
      {/if}
      <div class="flex flex-row flex-wrap gap-x-2 gap-y-4">
        {#if data}
          {#each images as image (image.url)}
            <a
              class="relative h-24 xl:h-56"
              href={`/groups/${$page.params.groupId}/details`}
            >
              <ImageCard src={image.url} />
            </a>
          {/each}
        {/if}
      </div>
    </div>
  </div>
</div>
