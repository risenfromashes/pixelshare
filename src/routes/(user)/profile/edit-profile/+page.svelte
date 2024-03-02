<script lang="ts">
    import { writable } from 'svelte/store';
    import { onMount } from "svelte";
    import { goto, invalidateAll, onNavigate } from "$app/navigation";
    import { enhance } from "$app/forms";

    
  
    export let data;

    let success=false;
    // let imagesProfile: string[] = [];
    // let imageFilesProfile: File[] = [];

    let username=writable(data.user[0].username);
    // let email = writable(data.user[0].email);
    let location = writable(data.user[0].location);
    let bio = writable(data.user[0].bio);
    let phonenumber=writable(data.user[0].phonenumber);
    // async function updateProfile() {
    //   const updatedData = {
    //     username: $username,
    //     email: $email,
    //     location: $location,
    //     bio: $bio,
    //   };
    //   // Submit these details to your backend
    //   console.log('Updated Profile:', updatedData);
    //   // Add API call to update user data here

    function editAbout(event) 
    {
        //edit blabla
        // username=$username;
    }

    let imageProfile = data.user[0].profileimg; // Assuming this is a string URL
    let imageFileProfile; // This will be a File object

    const updateDomFileProfile = () => {
      const element = document.querySelector<HTMLInputElement>("#profile-file-input");
      if (element && imageFileProfile) {
        const list = new DataTransfer();
        list.items.add(imageFileProfile); // Add the File object
        element.files = list.files; // Set the FileList on the input element
      }
    };

    const handleFileChangeProfile = () => {
      const element = document.querySelector<HTMLInputElement>("#profile-file-input");
      if (element && element.files && element.files.length > 0) {
        const file = element.files[0]; // Get only the first file
        imageFileProfile = file; // Set the single File object
        imageProfile = URL.createObjectURL(file); // Create and set the single image URL
        updateDomFileProfile(); // Update the DOM/file input
      }
    };


    // }
  </script>
  
  
<div class="flex h-screen bg-gray-900">
    <!-- Sidebar -->
    <!-- ... Sidebar content using Tailwind CSS ... -->
  
    <!-- Main Content -->
    <div
      class="flex-1 xl:px-32 px-4 py-8 overflow-y-auto bg-orange-50 text-black"
    >
    <form
            class="request-item flex flex-col  bg-black-100 border-2 border-orange-200 p-4 rounded-lg shadow-lg hover:bg-orange-150 transition-colors duration-200 ease-in-out"
            method="POST"
            on:submit
            enctype="multipart/form-data"
            use:enhance={({ formElement, cancel }) => {
                   success = false;
            return async ({ result }) => {
              if (result.type === "success") {
                success = true;
                formElement.reset();
                imageProfile = data.user[0].profileimg;
                imageFileProfile = URL.createObjectURL(data.user[0].profileimg);
                // invalidateAll();
          }
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
  

    <div>
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