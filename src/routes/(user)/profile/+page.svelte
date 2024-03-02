<script lang="ts">
   import { writable } from 'svelte/store';
   import { onMount } from "svelte";
   import { Icon } from "$lib";
   import FaIcon from "$lib/components/FaIcon.svelte";

  import { goto, invalidateAll, onNavigate } from "$app/navigation";
  import { enhance } from "$app/forms";
  // import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
  

    let success=false;

    export let data; // Assuming 'data' is passed as a prop.


    let startIndex = 0;
    let startIndex0 = 0;

// Function to show next four groups

    function showNextAdminGroups() {
        if (startIndex0 + 3< data.admin_groups.length) {
            startIndex0 += 3;
        }
    }

    // Function to show previous four groups
    function showPreviousAdminGroups() {
        if (startIndex0 - 3>= 0) {
            startIndex0 -= 3;
        }
    }
    function showNext() {
        if (startIndex + 3< data.non_admin_groups.length) {
            startIndex += 3;
        }
    }

    // Function to show previous four groups
    function showPrevious() {
        if (startIndex - 3>= 0) {
            startIndex -= 3;
        }
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
        </div>

        <div>
          <h1 class="text-2xl font-semibold">{data.user[0].username}</h1>
        </div>
      </div>

      <!-- Vertical Line -->
      <div class="bg-orange-200 w-px h-40 mx-3"></div>

      <!-- User Info -->
      <div class="flex-1">
        <h2 class="text-sm mb-2 font-semibold text-orange-700">From - {data.user[0].location}</h2>
        <h3 class="text-sm mb-2 font-semibold text-orange-700">Email - {data.user[0].email}</h3>
        <h3 class="text-sm mb-2 font-semibold text-orange-700">Joined on - {data.user[0].joiningdate}</h3>
        <h3 class="text-sm mb-2 font-semibold text-orange-700">Contact No - {data.user[0].phonenumber}</h3>

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
    </div>
  </div>


    <!-- Mutual Groups -->
    <div class="mb-5">
      <h2 class="text-lg mb-2.5 font-bold">My Groups</h2>
      <div class="bg-orange-300 gap-4 mb-2 w-full h-px mx-3"></div>
      {#if data.admin_groups && data.admin_groups.length > 0}
      <div class="flex justify-between items-center">

        <button on:click={showPreviousAdminGroups} class="bg-transparent border-0 p-0 flex items-center justify-center">
          <img src="/icons/leftArrow.png" alt="Previous" class="w-4 h-4"> <!-- Keep only the icon visible -->
          <span class="hidden">Previous</span> <!-- Hide the text -->
      </button>
      
      
      
          
          <div class="flex space-x-4">
              {#each data.admin_groups.slice(startIndex0, startIndex0 + 3) as group}
                  <a class="flex items-center py-4 px-4 hover:bg-gray-300 rounded" href={`/groups/${group.group_id}`}>
                      <img src={group.profile_image_url} alt={group.group_name} class="h-8 w-8 rounded-full object-cover mr-2" />
                      <span class="text-sm font-medium text-gray-800">{group.group_name}</span>
                  </a>
              {/each}
          </div>

          <button on:click={showNextAdminGroups} class="bg-transparent border-0 p-0 flex items-center justify-center">
            <img src="/icons/rightArrow.png" alt="Previous" class="w-4 h-4"> <!-- Keep only the icon visible -->
            <span class="hidden">Next</span> <!-- Hide the text -->
        </button>
      </div>
  {/if}
     
    </div>

    <!-- Mutual Groups -->
    <div class="mb-5">
      <h2 class="text-lg mb-2.5 font-bold">My Other Groups</h2>
      <div class="bg-orange-300 gap-4 mb-2 w-full h-px mx-3"></div>
      {#if data.non_admin_groups && data.non_admin_groups.length > 0}
        <div class="flex justify-between items-center">

          <button on:click={showPrevious} class="bg-transparent border-0 p-0 flex items-center justify-center">
            <img src="/icons/leftArrow.png" alt="Previous" class="w-4 h-4"> <!-- Keep only the icon visible -->
            <span class="hidden">Previous</span> <!-- Hide the text -->
        </button>
        
        
        
            
            <div class="flex space-x-4">
                {#each data.non_admin_groups.slice(startIndex, startIndex + 3) as group}
                    <a class="flex items-center py-4 px-4 hover:bg-gray-300 rounded" href={`/groups/${group.group_id}`}>
                        <img src={group.profile_image_url} alt={group.group_name} class="h-8 w-8 rounded-full object-cover mr-2" />
                        <span class="text-sm font-medium text-gray-800">{group.group_name}</span>
                    </a>
                {/each}
            </div>

            <button on:click={showNext} class="bg-transparent border-0 p-0 flex items-center justify-center">
              <img src="/icons/rightArrow.png" alt="Previous" class="w-4 h-4"> <!-- Keep only the icon visible -->
              <span class="hidden">Next</span> <!-- Hide the text -->
          </button>
        </div>
    {/if}
      
    <div class="bg-orange-300 gap-4 mb-2 w-full h-px mx-3 mt-4 mb-4"></div>
      <div class="relative w-full h-full mt-20"> <!-- Ensure the parent is positioned relatively -->
        <a href={`/profile/edit-profile`} class="absolute bottom-0 right-0"> <!-- Position the link at the bottom right -->
            <button class="px-4 py-3 mt-8 bg-red-400 text-white rounded hover:bg-red-500" >
                Edit Profile
            </button>
        </a>
    </div>
    </div>

  
  </div>
</div>
