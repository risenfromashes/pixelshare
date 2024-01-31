<script lang="ts">
  // @ts-nocheck
  import { Icon } from "$lib";
  import FaIcon from "$lib/components/FaIcon.svelte";
  import Modal from "$lib/components/Modal.svelte";
  import { page } from "$app/stores";
  import { enhance } from "$app/forms";
  import { goto, invalidateAll, onNavigate } from "$app/navigation";

  let profileImg: File;
  let coverImg: File;
  let description: String = "";
  let name: String = "";
  let success = false;
  let imagesCover: string[] = [];
  let imageFilesCover: File[] = [];
  let imagesProfile: string[] = [];
  let imageFilesProfile: File[] = [];

  const updateDomFileListCover = () => {
    const element =
      document.querySelector<HTMLInputElement>("#cover-file-input");
    if (element) {
      const list = new DataTransfer();
      imageFilesCover.forEach((file) => list.items.add(file));
      element.files = list.files;
    }
  };

  const updateDomFileListProfile = () => {
    const element = document.querySelector<HTMLInputElement>(
      "#profile-file-input",
    );
    if (element) {
      const list = new DataTransfer();
      imageFilesProfile.forEach((file) => list.items.add(file));
      element.files = list.files;
    }
  };

  // const handleFileChange = () => {
  //   const element = document.querySelector<HTMLInputElement>("#file-input");
  //   if (element) {
  //     const files = Array.from(element.files ?? []);
  //     imageFiles = [...imageFiles, ...files];
  //     images = [...images, ...files.map((file) => URL.createObjectURL(file))];
  //     updateDomFileList();
  //   }
  // };
  const handleFileChangeCover = () => {
    const element =
      document.querySelector<HTMLInputElement>("#cover-file-input");
    if (element) {
      const files = Array.from(element.files ?? []);
      if (files.length > 0) {
        const lastFile = files[files.length - 1];
        imageFilesCover = [lastFile];
        imagesCover = [URL.createObjectURL(lastFile)];
      }
      updateDomFileListCover();
    }
  };
  const handleFileChangeProfile = () => {
    const element = document.querySelector<HTMLInputElement>(
      "#profile-file-input",
    );
    if (element) {
      const files = Array.from(element.files ?? []);
      if (files.length > 0) {
        const lastFile = files[files.length - 1];
        imageFilesProfile = [lastFile];
        imagesProfile = [URL.createObjectURL(lastFile)];
      }
      updateDomFileListProfile();
    }
  };

  onNavigate(() => {
    success = false;
  });

  async function post() {
    alert("Group information submitted!"); // Placeholder for actual post submission
  }
</script>

<div
  class="flex flex-col items-center justify-center min-h-screen bg-orange-50 text-gray-900 px-36"
>
  <div class="space-y-4 w-full">
    {#if success}
      <div
        class="block w-full font-bold px-4 py-3 bg-green-100 rounded text-left text-xs text-green-500 mb-4"
      >
        <p>Congratulations. Your new group {name} added successfully!</p>
      </div>
    {/if}
    <form
      method="POST"
      on:submit|preventDefault
      action={`/groups/${$page.params.groupId}?/addgroup`}
      enctype="multipart/form-data"
      use:enhance={({ formElement, cancel }) => {
        if (imageFilesCover.length === 0 || imageFilesProfile.length === 0) {
          cancel();
          return;
        }
        success = false;
        return async ({ result }) => {
          if (result.type === "success") {
            success = true;
            formElement.reset();
            imagesCover = [];
            imageFilesCover = [];
            imagesProfile = [];
            imageFilesProfile = [];
            name = "";
            description = "";
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
            id="cover-file-input"
            name="files"
            accept="image/"
            on:change={handleFileChangeCover}
            hidden
          />
          <label
            for="cover-file-input"
            class="cursor-pointer flex-row justify-center w-full inline-flex items-center px-24 py-3 bg-orange-200 border-2 border-orange-300 hover:bg-orange-300 rounded-md"
          >
            <FaIcon
              icon={Icon.UPLOAD}
              className="object-cover w-6 h-6 mr-2"
              fill="#000000"
            />
            Select Cover Pic
          </label>

          <!-- Image selection -->
          <input
            type="file"
            id="profile-file-input"
            name="files"
            accept="image/"
            on:change={handleFileChangeProfile}
            hidden
          />
          <label
            for="profile-file-input"
            class="cursor-pointer flex-row justify-center w-full inline-flex items-center px-24 py-3 bg-orange-200 border-2 border-orange-300 hover:bg-orange-300 rounded-md"
          >
            <FaIcon
              icon={Icon.UPLOAD}
              className="object-cover w-6 h-6 mr-2"
              fill="#000000"
            />
            Select Profile Pic
          </label>

          <!-- Image previews for CoverPic -->
          <div class="grid grid-cols-3 gap-4">
            {#each imagesCover as image}
              <div
                class="relative rounded-lg overflow-hidden border border-gray-300"
              >
                <img src={image} alt="cards" class="object-cover w-full h-32" />
              </div>
            {/each}
          </div>

          <!-- Image previews for Profile Pic-->
          <div class="grid grid-cols-3 gap-4">
            {#each imagesProfile as image}
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
            bind:value={name}
            placeholder="Enter Group Name"
            class="w-full p-2 bg-orange-100 border border-white-300 rounded-md text-black"
          />

          <!-- Group Bio input -->
          <textarea
            name="description"
            bind:value={description}
            placeholder="Write a short bio for the group"
            class="w-full p-2 bg-orange-100 border border-white-300 rounded-md text-black"
          ></textarea>

          <!-- Create Group button -->
          <div class="w-full flex flex-row justify-center">
            <button
              type="submit"
              class="px-24 py-3 bg-orange-200 border-2 border-orange-300 hover:bg-orange-300 disabled:border-orange-200 disabled:text-gray-500 disabled:bg-orange-100 rounded-md"
              disabled={imagesCover.length === 0 || imagesProfile.length === 0}
              >Create Group</button
            >
          </div>
        </div>
      </div>
    </form>
  </div>
</div>
