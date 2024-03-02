<script lang="ts">
   import { writable } from 'svelte/store';
   import { onMount } from "svelte";

  import { goto, invalidateAll, onNavigate } from "$app/navigation";
  import { enhance } from "$app/forms";
  

    let success=false;

    export let data; // Assuming 'data' is passed as a prop.

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
