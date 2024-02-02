<script lang="ts">
  import { Icon } from "$lib";
  import FaIcon from "$lib/components/FaIcon.svelte";
  import Modal from "$lib/components/Modal.svelte";
  import { page } from "$app/stores";
  import { enhance } from "$app/forms";
  import { goto, invalidateAll, onNavigate } from "$app/navigation";
  import Button from "./Button.svelte";

  let imageFiles: File[] = [];
  let images: string[] = [];
  let tag: String;
  let tags: String[] = [];
  let joinedTags: String = "";
  let caption: String;
  let location: String;
  let loading = false;

  const recommendedTags = ["ECE Catto", "Central Catto"]; // Example recommended tags

  $: joinedTags = tags.join(",");

  const updateDomFileList = () => {
    const element = document.querySelector<HTMLInputElement>("#file-input");
    if (element) {
      const list = new DataTransfer();
      imageFiles.forEach((file) => list.items.add(file));
      element.files = list.files;
    }
  };

  const handleFileChange = () => {
    const element = document.querySelector<HTMLInputElement>("#file-input");
    if (element) {
      const files = Array.from(element.files ?? []);
      imageFiles = [...imageFiles, ...files];
      images = [...images, ...files.map((file) => URL.createObjectURL(file))];
      updateDomFileList();
    }
  };

  const removeSelectedImage = (imageId: string) => {
    images = images.filter((image) => image !== imageId);
    imageFiles = imageFiles.filter(
      (file) => URL.createObjectURL(file) !== imageId,
    );
    updateDomFileList();
    URL.revokeObjectURL(imageId); // Free up memory by revoking object URL
  };

  const addTag = (tag: String) => {
    console.log(tags);
    tag = tag.trim();
    if (tag) {
      if (!tags.includes(tag)) {
        tags = [...tags, tag];
      }
      tag = "";
    }
    console.log(tags);
  };

  onNavigate(() => {
    loading = false;
  });

  let showModal = false;
  $: {
    showModal =
      $page.params.groupId != null &&
      $page.url.searchParams.get("upload") != null;
  }
</script>

<Modal {showModal} className="rounded-md bg-orange-50 no-scrollbar">
  <div
    class="flex flex-col h-full justify-center items-center w-full my-10 xl:px-8 p-4 overflow-y-auto"
  >
    {#if $page.form?.success}
      <div
        class="block w-full font-bold px-4 py-3 bg-green-100 rounded text-left text-xs text-green-500 mb-4"
      >
        <p>Post uploaded successfully!</p>
      </div>
    {/if}
    {#if $page.form?.invalid || $page.form?.error}
      <div
        class="block w-full font-bold px-4 py-3 bg-red-100 rounded text-left text-xs text-red-500 mb-4"
      >
        {#if $page.form?.invalid}
          <p>Invalid input.</p>
        {:else if $page.form?.error}
          <p>{$page.form?.error}</p>
        {/if}
      </div>
    {/if}
    <form
      method="POST"
      on:submit|preventDefault
      action={`/groups/${$page.params.groupId}?/upload`}
      enctype="multipart/form-data"
      use:enhance={({ formElement, cancel }) => {
        if (imageFiles.length === 0) {
          cancel();
          return;
        }
        loading = true;
        return async ({ result }) => {
          if (result.type === "success") {
            loading = false;
            formElement.reset();
            images = [];
            imageFiles = [];
            tags = [];
            caption = "";
            location = "";
            invalidateAll();
          }
        };
      }}
    >
      <div class="p-6 rounded-lg w-full">
        <div class="space-y-4">
          <!-- Image selection -->
          <input
            type="file"
            id="file-input"
            name="files"
            accept="image/*"
            multiple
            on:change={handleFileChange}
            hidden
          />
          <label
            for="file-input"
            class="cursor-pointer flex-row justify-center w-full inline-flex items-center px-24 py-3 bg-orange-200 border-2 border-orange-300 hover:bg-orange-300 rounded-md"
          >
            <FaIcon
              icon={Icon.UPLOAD}
              className="object-cover w-6 h-6 mr-2"
              fill="#000000"
            />
            Select Photos
          </label>

          <!-- Image previews -->
          <div class="grid grid-cols-3 gap-4">
            {#each images as image}
              <div
                class="relative rounded-lg overflow-hidden border border-gray-300"
              >
                <img src={image} alt="cards" class="object-cover w-full h-32" />
                <button
                  class="absolute top-1 right-1 bg-gray-800 bg-opacity-75 hover:bg-opacity-50 text-white p-1 rounded-bl-lg"
                  on:click={() => removeSelectedImage(image)}>&times;</button
                >
              </div>
            {/each}
          </div>

          <!-- Caption input -->
          <input
            type="text"
            name="caption"
            bind:value={caption}
            placeholder="Write Something"
            class="w-full p-2 border bg-orange-100 border-gray-300 rounded my-2"
          />
          <input
            type="text"
            name="location"
            bind:value={location}
            placeholder="Add Location"
            class="w-full p-2 border bg-orange-100 border-gray-300 rounded my-2"
          />

          <!-- Tag selection, recommended tags and display -->
          <div>
            {#if images.length > 0}
              <p class="text-gray-500 font-bold">Recommended Tags</p>
              <div class="flex gap-2 mt-2">
                {#each recommendedTags as tag}
                  <button
                    on:click={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      addTag(tag);
                    }}
                    class="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
                    >{tag}</button
                  >
                {/each}
              </div>
            {/if}
            <input
              type="text"
              bind:value={tag}
              on:keydown={(event) => {
                if (event.key == "Enter") {
                  event.preventDefault();
                  event.stopPropagation();
                  addTag(tag);
                }
              }}
              placeholder="Add Tag"
              class="w-full p-2 border bg-orange-100 border-gray-300 rounded my-2"
            />
            <div class="flex flex-wrap gap-2 mt-2">
              {#each tags as tag}
                <span class="bg-gray-200 rounded px-2 py-1">
                  {tag}
                  <button
                    on:click={() => {
                      tags = tags.filter((t) => t !== tag);
                    }}
                    class="ml-1 text-gray-600 hover:text-black">&times;</button
                  >
                </span>
              {/each}
            </div>
            <input
              type="text"
              name="tags"
              value={joinedTags}
              placeholder="Add Tag"
              class="w-full p-2 border bg-orange-100 border-gray-300 rounded my-2"
              hidden
            />
          </div>

          <!-- Post button -->
          <div class="w-full flex flex-row justify-end">
            <Button
              colour="orange"
              text="Submit"
              disabled={imageFiles.length === 0}
              {loading}
            />
          </div>
        </div>
      </div>
    </form>
  </div>
</Modal>
