<script lang="ts">
    // @ts-nocheck
  
    import { onMount } from "svelte";
    import { writable } from "svelte/store";
    export let data;
  
    // export let moderationRequests;
    // Initialize a writable Svelte store for the map to make it reactive
    let isApproved: Boolean = false;
  
    function handleAction(event, approvalStatus) {
      isApproved = approvalStatus;
  
      // Optionally, do something with isApproved here or submit form data using fetch API
      // If submitting via fetch API, you might preventDefault and manually handle the form submission
    }
 
  
    //console.log("ekhane print kora jai jantam na");
    //console.log(data.postRequests);
  </script>
  










<div class="flex-1 xl:px-12 p-4 overflow-y-auto">
    <div class="p-4 rounded-lg text-black">
      {#if data.moderationRequests.length <= 0}
        <div class="text-center">No moderation requests to show.</div>
      {:else}
        <!-- Moderation Requests -->
        <div class="bg-orange-50 p-4  rounded-lg shadow-lg">
          {#each data.moderationRequests as request}
            <div
             
            >
              <form
                class="moderation-item flex items-center bg-black-100 border-2 border-orange-200 p-4 mt-6 mb-8 rounded-lg shadow-lg hover:bg-orange-200 transition-colors duration-200 ease-in-out"
                method="POST"
                on:submit
                enctype="multipart/form-data"
              >
                <div class="mb-8">
                  <p class="mb-4 text-black font-bold hover:text-gray-700">
                    <input
                      type="hidden"
                      name="moderatedBy"
                      bind:value={request.username}
                    />
                    Admin {request.username} has sent a moderation request 
                    <input type="hidden" name="requestId" bind:value={request.id} />
                  </p>
  
                  <p class="mb-4 text-blue-800 font-bold hover:text-gray-700">
                    <input
                      type="hidden"
                      name="message"
                      bind:value={request.message}
                    />
                    {request.message}
                  </p>
                  <div class="flex items-center mb-4">
                    <!-- Display request details here, apply text and hover classes as needed -->
                  </div>
               
                  <div class="flex justify-center gap-4">
                    <input type="hidden" name="action" bind:value={isApproved} />
                    <button
                      type="submit"
                      on:click={(event) => handleAction(event, true)}
                      class="px-4 py-2 bg-green-400 text-white font-bold rounded-lg hover:bg-green-600 hover:text-gray-700"
                      >Accept</button
                    >
                    <button
                      type="submit"
                      on:click={(event) => handleAction(event, false)}
                      class="px-4 py-2 bg-red-500 text-white font-bold rounded-lg hover:bg-red-600 hover:text-gray-700"
                      >Reject</button
                    >
                  </div>
                </div>
              </form>
            </div>
          {/each}
        </div>
      {/if}
    </div>
  </div>
  