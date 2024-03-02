<script lang="ts">
  import { Icon } from "$lib";
  import FaIcon from "$lib/components/FaIcon.svelte";
  import Modal from "$lib/components/Modal.svelte";
  import { page } from "$app/stores";
  import { enhance } from "$app/forms";
  import { goto, invalidateAll, onNavigate } from "$app/navigation";

  let imageFiles: File[] = [];
  let images: string[] = [];
  let tag: String;
  let tags: String[] = [];
  let joinedTags: String = "";
  let caption: String;
  let location: String;
  let success = false;

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
    success = false;
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
    class="flex flex-col h-full justify-center items-center w-full my-10 xl:px-24 p-4 overflow-y-auto"
  >
    {#if success}
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
        success = false;
        return async ({ result }) => {
          if (result.type === "success") {
            success = true;
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

          <!-- Post button -->
          <div class="w-full flex flex-row justify-center">
            <button
              type="submit"
              class="px-24 py-3 bg-orange-200 border-2 border-orange-300 hover:bg-orange-300 disabled:border-orange-200 disabled:text-gray-500 disabled:bg-orange-100 rounded-md"
              disabled={images.length === 0}>Post</button
            >
          </div>
        </div>
      </div>
    </form>
  </div>
</Modal>
