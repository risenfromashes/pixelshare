<script lang="ts">
  import { Icon } from "$lib";
  import FaIcon from "$lib/components/FaIcon.svelte";
  import ImageCard from "$lib/components/ImageCard.svelte";
  import { page } from "$app/stores";
  import { enhance } from "$app/forms";
  import Spinner from "$lib/components/Spinner.svelte";

  export let data;
  export let form;
  let tags: any[] = [];
  $: tags = data.tags;
  let images = data.posts;
  let searchBox: HTMLInputElement;
  let initialSearchTerm = "";
  let searchTerm = initialSearchTerm;
  let loading = false;

  let suggestedTags: string[] = []; // To store suggestions

  // Helper function to insert text at the current cursor position
  function insertTextAtCursor(el: HTMLInputElement, text: string) {
    const { selectionStart, selectionEnd, value } = el;
    if (selectionStart === null || selectionEnd === null) return;
    el.value =
      value.substring(0, selectionStart) + text + value.substring(selectionEnd);
    el.selectionStart = el.selectionEnd = selectionStart + text.length;
    el.focus();
  }

  // Function to filter tags when the user types '#'
  const filterTags = (searchTerm: string) => {
    const inputValue = searchTerm;
    let off = inputValue.lastIndexOf("#");
    if (off >= 0) {
      const searchQuery = inputValue.substring(off + 1);
      off = searchQuery.indexOf(" ");
      if (off >= 0) {
        suggestedTags = [];
        return;
      }
      suggestedTags = tags
        .filter((tag) =>
          tag.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .map((tag) => `#${tag.name}`);
    } else {
      suggestedTags = [];
    }
  };

  let tagIds = "[]";

  const updateTagIds = () => {
    let arr: number[] = [];
    for (let i = 0; i < tags.length; i++) {
      if (searchTerm.indexOf("#" + tags[i].name) >= 0) {
        arr.push(tags[i].id);
      }
    }
    tagIds = JSON.stringify(arr);
  };

  const handleInput = () => {
    clicked = false;
    updateTagIds();
  };

  let clicked = true;

  // Update the searchTerm and filter tags whenever it changes
  $: {
    filterTags(searchTerm);
  }
</script>

<div class="flex min-h-screen bg-orange-50">
  <!-- Main content area -->
  <div class="flex-1 overflow-y-auto">
    <div class="w-full p-8">
      <div class="flex justify-center mb-6 w-full">
        <div class="relative w-full max-w-xl">
          <form
            method="POST"
            class="w-full"
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
              class="search-box w-full pl-10 pr-4 py-2 rounded-full text-gray-700 placeholder-gray-500 border border-gray-200"
              bind:value={searchTerm}
              name="query"
              on:input={handleInput}
            />
            <input name="tagIds" type="hidden" value={tagIds} />
          </form>
          <div class="absolute left-0 top-0 mt-3 ml-3">
            <FaIcon icon={Icon.MAGNIFYING_GLASS} className="w-full h-full" />
          </div>

          {#if !clicked && suggestedTags.length > 0}
            <div
              class="absolute top-12 left-0 z-40 bg-white w-full rounded-md shadow-md p-2"
            >
              {#each suggestedTags as tag}
                <button
                  class="block w-full px-3 py-2 hover:bg-gray-100"
                  on:click|preventDefault|stopPropagation={() => {
                    searchTerm = searchTerm.replace(/#[a-zA-Z0-9_]*$/, tag);
                    suggestedTags = [];
                    searchBox.focus();
                    clicked = true;
                    updateTagIds();
                  }}
                >
                  {tag}
                </button>
              {/each}
            </div>
          {/if}

          {#if searchTerm.length > 0}
            <button
              class="absolute right-0 top-0 px-3 border-0 h-full rounded-r-3xl cursor-pointer text-2xl hover:font-bold"
              on:click={(e) => {
                e.preventDefault();
                searchTerm = initialSearchTerm;
                searchBox.focus();
                images = data.posts;
              }}
            >
              &times;
            </button>
          {/if}
        </div>
      </div>
      {#if form?.error}
        <div class="text-center p-4 bg-red-100 text-red-500">{form?.error}</div>
      {/if}
      {#if loading}
        <div
          class="text-center text-lg flex flex-row justify-center items-center"
        >
          Loading... <Spinner size={4} className="ml-2" />
        </div>
      {/if}
      {#if images.length === 0 && !loading}
        <div class="text-center">No images found</div>
      {/if}
      <div class="flex flex-row flex-wrap gap-x-2 gap-y-4 mt-4">
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
