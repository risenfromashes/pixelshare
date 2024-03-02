<script lang="ts">
  import { writable } from 'svelte/store';
  import { onMount } from "svelte";
  import { goto, invalidateAll, onNavigate } from "$app/navigation";
  import { enhance } from "$app/forms";
  import { Icon } from "$lib";
  import FaIcon from "$lib/components/FaIcon.svelte";
  import Spinner from "$lib/components/Spinner.svelte";

  export let data;

  let success = false;
  let loading=false;

  let username = writable(data.user[0].username);
  let location = writable(data.user[0].location);
  let bio = writable(data.user[0].bio);
  let phonenumber = writable(data.user[0].phonenumber);

  let imageProfile = data.user[0].profileimg; // Assuming this is a string URL
  let imageFileProfile; // This will be a File object

  let faceImg: string;
  let faceImgFile;

  function editAbout()
  {
    // console.log("editAbout");
  }

  const updateDomFileProfile = () => {
    const element = document.querySelector<HTMLInputElement>("#profile-file-input");
    if (element) {
      const list = new DataTransfer();
      imageFileProfile.forEach((file) => list.items.add(file));
      element.files = list.files;
    }
  };

  const handleFileChangeProfile = () => {
    const element = document.querySelector<HTMLInputElement>("#profile-file-input");
    if (element) {
      const files = Array.from(element.files ?? []);
      if (files.length > 0) {
        const lastFile = files[files.length - 1];
        imageFileProfile = [lastFile];
        imageProfile = [URL.createObjectURL(lastFile)];
      }
      updateDomFileProfile();
    }
  };


  const updateFace = () => {
      const element = document.querySelector<HTMLInputElement>("#face-file-input");
      if (element && faceImgFile) {
          const list = new DataTransfer();
          list.items.add(faceImgFile); // Add the File object
          element.files = list.files; // Set the FileList on the input element
      }
  };

  const handleFaceChange = () => {
      const element = document.querySelector<HTMLInputElement>("#face-file-input");
      if (element && element.files && element.files.length > 0) {
          const file = element.files[0]; // Get only the first file
          faceImgFile = file; // Set the single File object
          faceImg = URL.createObjectURL(file); // Create and set the single image URL
          updateFace(); // Update the DOM/file input
      }
  };
</script>

  
  
<div class="flex h-screen bg-gray-900">
    <!-- Sidebar -->
    <!-- ... Sidebar content using Tailwind CSS ... -->
  
    <!-- Main Content -->
    <div
      class="flex-1 xl:px-32 px-4 py-8 overflow-y-auto bg-orange-50 text-black"
    >
    {#if success}
    <div
      class="block w-full font-bold px-4 py-3 bg-green-100 rounded text-left text-xs text-green-500 mb-4"
    >
      <p>
        Congratulations. Your Profile is Edited successfully!
      </p>
    </div>
  {/if}

  {#if loading}
  <div
    class="text-center text-lg flex flex-row justify-center items-center"
  >
    Loading... <Spinner size={4} className="ml-2" />
  </div>
{/if}
   
  <form
  class="request-item flex flex-col bg-black-100 border-2 border-orange-200 p-4 rounded-lg shadow-lg hover:bg-orange-150 transition-colors duration-200 ease-in-out"
  method="POST"
  on:submit
  enctype="multipart/form-data"
  use:enhance={({ formElement, cancel }) => {

      if (loading) {
                cancel();
              }
        loading = true;
      success = false;
      return async ({ result }) => {
          if (result.type === "success") {
            
              success = true;
              // formElement.reset();
              imageProfile = data.user[0].profileimg;  // Assuming this is for resetting to default image
              // Define your logic here as per requirements
          }
          loading = false;
      };
  }}
>
      <!-- Profile Header and Badges -->
      <div class="flex justify-between items-start mb-5">
        <!-- Profile Picture and Details -->
        <div class="flex relative">
          <div class="relative w-24 h-24">
            <img
              src={imageProfile} 
              alt="Profile "
              class="rounded-full w-24 h-24 border-4 border-white"
            />
    
           <!-- <label for="profile-image-input"
            class="cursor-pointer absolute bottom-0 right-0"
          > -->
          <input
            type="file"
            id="profile-file-input"
            name="profileImg"
            accept="image/"
            on:change={handleFileChangeProfile}
            hidden
          />
          <label
          for="profile-file-input"
          class="cursor-pointer absolute bottom-0 right-0"
        >
            <!-- <FaIcon
              icon={Icon.UPLOAD}
              className="object-cover w-6 h-6 mr-2"
              fill="#000000"
            /> -->
            <img
              src="/icons/camera.png"
              alt="File Picker"
              class="w-10 h-10 p-2 bg-white-300 rounded-full"
            />
          </label>
          </div>

          
  
          <div>
            <h1 class="text-2xl font-semibold">{data.user[0].username}</h1>
          </div>
        </div>
  
      </div>
  
<!-- face add -->
          <input
          type="file"
          id="face-file-input"
          name="faceImg"
          accept="image/"
          on:change={handleFaceChange}
          hidden
        />
        <label
          for="face-file-input"
          class="cursor-pointer flex-row justify-center w-full inline-flex items-center px-24 py-3 bg-orange-200 border-2 border-orange-300 hover:bg-orange-300 rounded-md"
        >
          <FaIcon
            icon={Icon.UPLOAD}
            className="object-cover w-6 h-6 mr-2"
            fill="#000000"
          />
          Select Face Pic
        </label>

        <!-- Image previews for CoverPic -->
        <div class="grid grid-cols-3 gap-4">
          {#if faceImg}
            <div
              class="relative rounded-lg overflow-hidden border border-gray-300"
            >
              <img src={faceImg} alt="cards" class="object-cover w-full h-32" />
            </div>
          {/if}
        </div>

    <div class="m-4">
        <input type="hidden" name="userId" bind:value={data.user_id}/>
      <h3 class="font-bold mb-2.5">User Name</h3>
      <textarea class="w-full h-20 rounded border p-2 mb-4 bg-orange-100 hover:bg-orange-200 " placeholder="Type your username here" name="username" bind:value={$username}></textarea>
  
      <h3 class="font-bold mb-2.5">BIO</h3>
      <textarea class="w-full h-20 rounded border p-2 mb-4 bg-orange-100 hover:bg-orange-200" placeholder="Type your Bio here" name="bio" bind:value={$bio}></textarea>
  
      <h3 class="font-bold mb-2.5">Location</h3>
      <textarea class="w-full h-16 rounded border p-2 mb-4 bg-orange-100 hover:bg-orange-200" placeholder="Type your Location here" name="location" bind:value={$location}></textarea>
  
      <h3 class="font-bold mb-2.5">Phone Number</h3>
      <textarea class="w-full h-16 rounded border p-2 mb-4 bg-orange-100 hover:bg-orange-200" placeholder="Type your Phone number here" name="phonenumber" bind:value={$phonenumber}></textarea>
    </div>
  
    <button class="w-20 h-10 px-4 py-2 m-4 bg-green-500 text-white rounded hover:bg-green-600" on:click={(event) => editAbout( event)}>Save</button>
    <!-- </form>     -->
    </form>
   </div>
  </div>