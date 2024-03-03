<script lang="ts">
  import { Icon } from "$lib";
  import FaIcon from "$lib/components/FaIcon.svelte";
  import { enhance } from "$app/forms";
  import { goto, invalidateAll, onNavigate } from "$app/navigation";

  let showModal = false;
  export let data;
  let searchQuery = "";
  // Use a more complex structure for filteredGroups to handle objects
  let filteredGroups: string | any[] = [];
  let requestedGroups = new Set(); // Tracks group names for which a join request has been made

  function handleJoinRequest(groupName: string) {
    requestedGroups.add(groupName);
    // Trigger Svelte reactivity by reassigning requestedGroups
    requestedGroups = new Set(requestedGroups);
    // Log for debugging
    console.log(`Join request for ${groupName}`);
  }

  // Update to filter based on the name property of groups
  $: filteredGroups =
    searchQuery.trim().length > 0
      ? data.groups.filter((group) =>
          group.name.toLowerCase().includes(searchQuery.toLowerCase()),
        )
      : [];

  function onClose() {
    showModal = false;
  }
</script>

<div
  class="flex flex-col items-center justify-center min-h-screen bg-orange-50 text-gray-900 px-36"
>
  <div class="space-y-4 w-full">
    <!-- Card-like structure for PixelShare Group with a background image -->
    <div
      class="w-full bg-cover bg-center rounded-lg shadow-md"
      style="background-image: url('/join_group.jpg'); height: 300px;"
    >
      <div
        class="flex items-center justify-center h-full w-full bg-opacity-50 bg-black rounded-lg"
      >
        <div class="text-center">
          <h2 class="text-white text-3xl font-bold">PixelShare Groups</h2>
          <p class="mt-2 text-white text-lg">
            Join groups to share and explore pixels together!
          </p>
        </div>
      </div>
    </div>
    <!-- Introductory Summary -->
    <div class="mt-8 text-center">
      <h3 class="text-2xl font-semibold">Why Join a Group?</h3>
      <p class="mt-4 bg-orange-50">
        Being in groups allows you to connect with others who share your passion
        for photography and pixel art. It's a space to collaborate, share
        insights, and grow together. Join a PixelShare group today and start
        sharing!
      </p>
    </div>
    <div class="mt-8 text-center">
      <h3 class="text-2xl font-bold">Recommended groups</h3>
      {#each data.groups as group}
        <div class="relative rounded-lg overflow-hidden border border-gray-300">
          <p class="mt-4">
            {group.name}
          </p>
        </div>
      {/each}
    </div>

    <button
      class="px-4 py-2 bg-orange-300 text-white fond-bold rounded-md"
      on:click={() => (showModal = true)}
      >Search Group to Join............</button
    >

    {#if showModal}
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <!-- svelte-ignore a11y-no-static-element-interactions -->
      <div
        class="fixed inset-0 bg-orange-200 bg-opacity-50 overflow-y-auto h-full w-full"
        on:click={onClose}
      >
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <div
          class="relative top-10 mx-auto p-5 border shadow-lg rounded-md bg-white"
          style="width: 80%; max-width: 640px; min-height: 300px;"
          on:click|stopPropagation
        >
          <div class="flex justify-between items-center">
            <h2 class="text-xl font-semibold">Search Groups</h2>
            <button
              class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
              on:click={onClose}
              aria-label="Close"
            >
              <!-- Close icon SVG here -->
            </button>
          </div>
          <input
            type="text"
            placeholder="Search groups..."
            class="mt-4 mb-2 px-4 py-2 w-full border rounded-md focus:ring-blue-500 focus:border-blue-500"
            bind:value={searchQuery}
          />
          {#if filteredGroups.length > 0 && searchQuery.trim().length > 0}
            <ul class="max-h-60 overflow-auto">
              {#each filteredGroups as group}
                <li
                  class="py-2 px-4 hover:bg-orange-100 bg-gray-100 cursor-pointer font-bold flex justify-between items-center"
                >
                  {group.name}
                  <form
                    class="request-item flex items-center bg-black-100 border-2 border-orange-200 p-4 rounded-lg shadow-lg hover:bg-orange-200 transition-colors duration-200 ease-in-out"
                    method="POST"
                    on:submit|preventDefault
                    enctype="multipart/form-data"
                    use:enhance={({ formElement, cancel }) => {
                      //success = false;
                      return async ({ result }) => {
                        if (result.type === "success") {
                          //success = true;
                          formElement.reset();
                          invalidateAll();
                        }
                      };
                    }}
                  >
                    <input
                      type="hidden"
                      name="groupname"
                      bind:value={group.name}
                    />

                    {#if requestedGroups.has(group.name)}
                      <button
                        class="ml-2 px-4 py-1 bg-gray-500 text-white rounded-md"
                        disabled>Requested</button
                      >
                    {:else}
                      <button
                        class="ml-2 px-4 py-1 bg-green-500 text-white rounded-md"
                        type="submit">Join</button
                      >
                    {/if}
                  </form>
                </li>
              {/each}
            </ul>
          {/if}
        </div>
      </div>
    {/if}
  </div>
</div>
