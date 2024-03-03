<script lang="ts">
  import { Icon } from "$lib";
  import FaIcon from "$lib/components/FaIcon.svelte";
  import { enhance } from "$app/forms";
  import { goto, invalidateAll, onNavigate } from "$app/navigation";
  import Button from "$lib/components/Button.svelte";


  let description: String = "";
  let generalName: String = "";
  let tagName: String = "";
  let success = false;
  let imagesTag: string[] = [];
  let imageFilesTag: File[] = [];

  let loading=false;

  const updateDomFileListTag = () => {
    const element = document.querySelector<HTMLInputElement>("#tag-file-input");
    if (element) {
      const list = new DataTransfer();
      imageFilesTag.forEach((file) => list.items.add(file));
      element.files = list.files;
    }
  };

  const handleFileChangeTag = () => {
    const element = document.querySelector<HTMLInputElement>("#tag-file-input");
    if (element) {
      const files = Array.from(element.files ?? []);
      if (files.length > 0) {
        const lastFile = files[files.length - 1];
        imageFilesTag = [lastFile];
        imagesTag = [URL.createObjectURL(lastFile)];
      }
      updateDomFileListTag();
    }
  };

  onNavigate(() => {
    success = false;
  });

  async function handleClick() {
        console.log('Button clicked');
        // Add your click handling logic here

        loading.set(true);
        await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate an async operation
        loading.set(false);
        message.set("Operation completed."); // 
    }
</script>

<div class="space-y-4 w-full max-w-xl mx-auto">
  {#if success}
    <div
      class="block w-full font-bold px-4 py-3 bg-green-100 rounded text-left text-xs text-green-500 mb-4"
    >
      <p>
        Congratulations. Your new tag ${tagName} added successfully!
      </p>
    </div>
  {/if}
  <form
    method="POST"
    on:submit|preventDefault
    enctype="multipart/form-data"
    use:enhance={({ formElement, cancel }) => {
      if (imageFilesTag.length === 0) {
        cancel();
        return;
      }
      success = false;
      return async ({ result }) => {
        if (result.type === "success") {
          success = true;
          formElement.reset();
          imagesTag = [];
          imageFilesTag = [];
          tagName = "";
          description = "";
          generalName="";
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
          id="tag-file-input"
          name="files"
          accept="image/"
          on:change={handleFileChangeTag}
          hidden
        />
        <label
          for="tag-file-input"
          class="cursor-pointer flex-row justify-center w-full inline-flex items-center px-24 py-3 bg-orange-200 border-2 border-orange-300 hover:bg-orange-300 rounded-md"
        >
          <FaIcon
            icon={Icon.UPLOAD}
            className="object-cover w-6 h-6 mr-2"
            fill="#000000"
          />
          Select a Picture for the tag
        </label>

        <!-- Image previews for CoverPic -->
        <div class="grid grid-cols-3 gap-4">
          {#each imagesTag as image}
            <div
              class="relative rounded-lg overflow-hidden border border-gray-300"
            >
              <img src={image} alt="cards" class="object-cover w-full h-32" />
            </div>
          {/each}
        </div>

        <!-- Group Name input -->
        <input
          type="text"
          name="name"
          bind:value={tagName}
          placeholder="Enter Tag Name"
          class="w-full p-2 bg-orange-100 border border-white-300 rounded-md text-black"
        />

        <!-- Group description for the tag input -->

        <textarea
        name="generalName"
        bind:value={generalName}
        placeholder="Write a general Name for the tag"
        class="w-full p-2 bg-orange-100 border border-white-300 rounded-md text-black"
      ></textarea>


        <textarea
          name="description"
          bind:value={description}
          placeholder="Write a short description for the tag"
          class="w-full p-2 bg-orange-100 border border-white-300 rounded-md text-black"
        ></textarea>

        <!-- Create Group button -->
        <div class="w-full flex flex-row justify-center">
          <Button classes="px-24 py-3 bg-orange-200 border-2 border-orange-300 hover:bg-orange-300 disabled:border-orange-200 disabled:text-gray-500 disabled:bg-orange-100 rounded-md"
          text="Create Tag" {loading} onClick={handleClick}  />
          <!-- <button
            type="submit"
            class="px-24 py-3 bg-orange-200 border-2 border-orange-300 hover:bg-orange-300 disabled:border-orange-200 disabled:text-gray-500 disabled:bg-orange-100 rounded-md"
            disabled={imagesTag.length === 0}>Create Tag</button
          > -->
        </div>
      </div>
    </div>
  </form>
</div>
