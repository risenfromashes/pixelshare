<script lang="ts">
   import { writable } from 'svelte/store';

  import { goto, invalidateAll, onNavigate } from "$app/navigation";
  import { enhance } from "$app/forms";
  

    let success=false;

export let data; // Assuming 'data' is passed as a prop.
const profileImage = writable(data.user[0].profileimg); // Use user's current image as default.
let tempFile = data.user[0].profileimg; // Temporary storage for profile image.
let tempBio = data.user[0].bio; // Temporary storage for biography.
let isModalOpen = false;
let isEdited=false;
let editedBio = ''; // To be used in the modal for editing bio.

// Function to handle profile picture change.
function changeProfilePicture(event) {
  const file = event.target.files[0];
  if (file) {
    const imageUrl = URL.createObjectURL(file);
    profileImage.set(imageUrl); // Update the profile image preview.
    tempFile = imageUrl; // Update temporary file storage.
  }
}

// Function to handle opening the bio edit modal.
function openModal() {
  isModalOpen = true;
  // editedBio = tempBio; // Pre-fill the textarea with the current bio.
}

// Function to handle closing the bio edit modal.
function closeModal() {
  isModalOpen = false;
}

// Function to handle bio changes.
function editAbout(isEdited,event) 
{
  tempBio = editedBio; // Update the temporary bio storage with the new bio.
  isModalOpen = false; // Close the modal.
  isEdited=true;
  data.user[0].bio = editedBio; // Update the actual bio with the new content.
}
</script>

<div class="flex h-screen bg-gray-900">
  <!-- Sidebar -->
  <!-- ... Sidebar content using Tailwind CSS ... -->

  <!-- Main Content -->
  <div
    class="flex-1 xl:px-32 px-4 py-8 overflow-y-auto bg-orange-50 text-black"
  >
    <!-- Profile Header and Badges -->
    <div class="flex justify-between items-start mb-5">
      <!-- Profile Picture and Details -->
      <div class="flex relative">
        <div class="relative w-24 h-24">
          <img
            src={data.user[0].profileimg}
            alt="Profile "
            class="rounded-full w-24 h-24 border-4 border-white"
          />
          <label
            for="profile-image-input"
            class="cursor-pointer absolute bottom-0 right-0"
          >
            <img
              src="./icons/camera.png"
              alt="File Picker"
              class="w-10 h-10 p-2 bg-white-300 rounded-full"
            />
          </label>
          <input
            type="file"
            id="profile-image-input"
            accept="image/*"
            on:change={() => changeProfilePicture(event)}
            hidden
          />
        </div>

        <div>
          <h1 class="text-2xl font-semibold">{data.user[0].username}</h1>
        </div>
      </div>

      <!-- Vertical Line -->
      <div class="bg-orange-200 w-px h-40 mx-3"></div>

      <!-- User Info -->
      <div class="flex-1">
        <p class="text-sm mb-2">From - {data.user[0].location}</p>
        <p class="text-sm mb-2">Email - {data.user[0].email}</p>
        <p class="text-sm mb-2">Joined on - {data.user[0].joiningdate}</p>
        <p class="text-sm mb-2">Contact No - {data.user[0].phonenumber}</p>
      </div>

      <!-- Vertical Line -->
      <div class="bg-orange-200 w-px h-40 mx-3"></div>
    </div>

   
  <!-- About Section -->
  <div class="mb-12 mt-16 relative">
    <h3 class="font-bold mb-2.5">About me</h3>
    <div class="relative">
      <p id="aboutText" class="bg-orange-100 p-2.5 rounded-md w-full relative">
        {data.user[0].bio}
      </p>
      <!-- <a href="#" id="editButton" class="absolute bottom-6 right-0 mr-1 mt-2 cursor-pointer" on:click={openModal}>
        <img src="./icons/edit.png" alt="Edit bio" class="w-5 h-5 border-1 border-white"/>
      </a> -->
    </div>
  </div>

  <!-- Modal for editing bio -->
  {#if isModalOpen}
      <form
      class="request-item flex items-center bg-black-100 border-2 border-orange-200 p-4 rounded-lg shadow-lg hover:bg-orange-200 transition-colors duration-200 ease-in-out"
      method="POST"
      on:submit
      enctype="multipart/form-data"
      use:enhance={({ formElement, cancel }) => {
          success = false;
          return async ({ result }) => {
              if (result.type === "success") {
                  success = true;
                  formElement.reset();
                  invalidateAll();
              }
          };
      }}
    > 
    <div class="fixed inset-0 flex items-center justify-center z-50">
      <div class="modal bg-orange-200 rounded-lg p-6">
        <h2 class="text-xl font-semibold mb-4">Edit Your Bio</h2>
        <textarea class="w-full h-32 rounded border p-2 mb-4 bg-orange-100" placeholder="Type your Bio here" bind:value={editedBio}></textarea>
        <div class="flex justify-end">
          <input type="hidden" name="userId" bind:value={data.user_id}/>
          <input type="hidden" name="isEdited" bind:value={isEdited}/>
          <button class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600" on:click={(event) => editAbout(true, event)}>Change</button>
          <button class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 ml-2" on:click={closeModal}>Cancel</button>
        </div>
      </div>
    </div>
    </form>
  {/if}

    <!-- Mutual Groups -->
    <div class="mb-5">
      <h2 class="text-lg mb-2.5 font-bold">My Groups</h2>
      <div class="bg-orange-300 gap-4 mb-2 w-full h-px mx-3"></div>
      {#if data.admin_groups}
        <div class="space-y-">
          {#each data.admin_groups as group}
            <a
              class="w-full flex items-center py-4 px-4 hover:bg-gray-300 rounded"
              href={`/groups/${group.group_id}`}
            >
              <img
                src={group.profile_image_url}
                alt={group.group_name}
                class="h-8 w-8 rounded-full object-cover mr-2"
              />
              <span class="text-sm font-medium text-gray-800"
                >{group.group_name}</span
              >
            </a>
          {/each}
        </div>
      {/if}
    </div>

    <!-- Mutual Groups -->
    <div class="mb-5">
      <h2 class="text-lg mb-2.5 font-bold">My Other Groups</h2>
      <div class="bg-orange-300 gap-4 mb-2 w-full h-px mx-3"></div>
      {#if data.non_admin_groups}
        <div class="space-y-">
          {#each data.non_admin_groups as group}
            <a
              class="w-full flex items-center py-4 px-4 hover:bg-gray-300 rounded"
              href={`/groups/${group.group_id}`}
            >
              <img
                src={group.profile_image_url}
                alt={group.group_name}
                class="h-8 w-8 rounded-full object-cover mr-2"
              />
              <span class="text-sm font-medium text-gray-800"
                >{group.group_name}</span
              >
            </a>
          {/each}
        </div>
      {/if}

      <div class="relative w-full h-full"> <!-- Ensure the parent is positioned relatively -->
        <a href={`/profile/edit-profile`} class="absolute bottom-0 right-0"> <!-- Position the link at the bottom right -->
            <button class="px-4 py-2 bg-red-400 text-white rounded hover:bg-red-500" >
                Edit Profile
            </button>
        </a>
    </div>
    </div>

  
  </div>
</div>
