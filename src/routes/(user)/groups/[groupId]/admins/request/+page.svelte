<script lang="ts">
  import { enhance } from "$app/forms";
  import { text } from "@sveltejs/kit";
  import { writable } from 'svelte/store';
  import Spinner from "$lib/components/Spinner.svelte";
  import ButtonComp from "$lib/components/Button.svelte";

export let data; // Assume this now contains member requests data including pictures, names, and request IDs
export let requests = writable([]); // Store for the list of moderators

let success = false;
let isRequestSent = false;
let isModalOpen = false;
let message="";
let isResigned = false;
let isCancel= false;

let loading=false;

// Example of setting the requestSent property for each moderator

// Function to close the modal
function closeModal() {
  // message = "";
  isModalOpen = false;
  // message.set("");
}

// Function to toggle modal state for a specific moderator
function openModal() {
  // message = "";
  isModalOpen = true;
}

// Function to handle sending requests for a specific moderator
function sendMessage(moderator, isSent, event) {
    event.preventDefault(); // Prevent default form submission behavior
    isRequestSent = isSent;
    console.log("from front end:");
    closeModal();
    // Add additional logic here if necessary
}


// Function to cancel request for a specific moderator
function cancelRequest(moderator,event) {
  // isRequestSent = false;
  isCancel = true;
}
  // Function to handle resigning from moderation
  function resignFromModeration() 
  {
    isResigned = true;
  }

  function invalidateAll() {
    requests.update(requests => requests);
  }

  async function handleClick() {
        console.log('Button clicked');
        // Add your click handling logic here

        loading.set(true);
        await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate an async operation
        loading.set(false);
        message.set("Operation completed."); // 
    }
</script>

<div class="flex relative h-screen bg-orange-50 text-black">
  <!-- Main Content -->
  <div class="flex-1 xl:px-12 p-4 overflow-y-auto">
    <div class="requests-panel p-4 rounded-lg text-black">
      <h1 class="text-3xl font-bold text-center mb-8">Add Moderator</h1>
      <div class="flex flex-col space-y-4">
        <h2 class="text-xl font-bold mb-2">Suggested Moderators</h2>

        {#if data.error}
          <div class="block w-full font-bold px-4 py-3 bg-red-100 rounded text-left text-xs text-red-500 mb-4">
            <p class="text-center">Error: {data.error}</p>
          </div>
        {:else if !data.requests || data.requests.length === 0}
          <p class="text-center">No member requests yet.</p>
        {:else}
          {#if isRequestSent}
            <div class="block w-full font-bold px-4 py-3 bg-green-100 rounded text-left text-xs text-green-500 mb-4">
              <p>Message has been sent successfully!</p>
            </div>
          {/if}

          {#if isCancel}
            <div class="block w-full font-bold px-4 py-3 bg-green-100 rounded text-left text-xs text-green-500 mb-4">
              <p>Request has been canceled successfully!</p>
            </div>
          {/if}

          {#if isResigned}
            <div class="block w-full font-bold px-4 py-3 bg-green-100 rounded text-left text-xs text-green-500 mb-4">
              <p>You have been resigned from moderation successfully!</p>
            </div>
          {/if}

          {#if loading}
          <div
            class="text-center text-lg flex flex-row justify-center items-center"
          >
            Loading... <Spinner size={4} className="ml-2" />
          </div>
        {/if}
          {#each data.requests as moderator}
          <form
          class="request-item flex items-center bg-black-100 border-2 border-orange-200 p-4 rounded-lg shadow-lg hover:bg-orange-200 transition-colors duration-200 ease-in-out"
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
                      formElement.reset();
                      invalidateAll();
                  }
                  loading=false;
              };
          }}
      >
          <!-- Member Picture -->
          <div class="w-24 h-24 mr-4">
              <img src={moderator.profileImg} alt={moderator.username} class="object-cover w-full h-full rounded-md"/>
          </div>
          <!-- Member Details and Actions -->
          <div class="flex-1 flex justify-between items-center">
              <div>
                  <h3 class="text-lg font-bold">
                      <input type="hidden" name="username" bind:value={moderator.username}/>
                      {moderator.username}
                  </h3>
                  <div class="flex justify-end">
                    <span class="text-sm font-semibold text-gray-500 mr-2">Joined at:{new Date(moderator.joinedAt).toISOString().split('T')[0]}</span>
                    </div>
                    <div>
                    <span class="text-sm font-semibold text-gray-500 mr-2">Total Post:{moderator.postCount}</span>
                    </div>
                  
              </div>
              <div>
               
                  <!-- <input type="hidden" name="isModalOpen" bind:value={isModalOpen}/> -->
                  <input type="hidden" name="isRequestSent" bind:value={isRequestSent}/>
                  {#if !moderator.isReq}
                      <button  type="submit" on:click={openModal} class="px-4 py-2 mr-2 bg-orange-300 text-white rounded-lg hover:bg-orange-500">
                          Send Request
                      </button>
                  {:else}
                  <input type="hidden" name="isCancel" bind:value={isCancel}/>
                      <button  type="submit" on:click={(event) => cancelRequest(moderator, event)} class="px-4 py-2 mr-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
                          Request Sent
                      </button>
                  {/if}
              </div>
          </div>
      
          {#if isModalOpen}
              <div class="fixed inset-0 flex items-center justify-center z-50">
                  <div class="modal bg-orange-200 rounded-lg p-6">
                      <h2 class="text-xl font-semibold mb-4">Send Moderation Request</h2>
                      <h3 class="text-lg mb-2">State the Reason why do you prefer him as a Moderator?</h3>
                      <hr class="h-px w-full my-2 bg-zinc-800 border-0 dark:bg-zinc-700"/>
                      <textarea class="w-full h-32 rounded border p-2 mb-4 bg-orange-100" placeholder="Type your message here" name="message" bind:value={message}></textarea>
      
                      <div class="flex justify-end">
                          <!-- <input type="hidden" name="isRequestSent" bind:value={isRequestSent}/> -->
                          <button type="submit" on:click={(event) => sendMessage(moderator, true, event)} class="px-4 py-2 mr-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
                              Send
                          </button>
                          <button type="submit" on:click={(event) => sendMessage(moderator, false, event)} class="px-4 py-2 mr-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
                              Cancel
                          </button>
                      </div>
                  </div>
              </div>
          {/if}
      </form>
      
          {/each}
        {/if}

        <h2 class="text-xl font-bold mb-2">Resign from Moderation</h2>
        <hr class="h-px w-full my-4 bg-zinc-800 border-0 dark:bg-zinc-700"/>
        <div class="text-right">
          {#if data.isAdmin}
          <form class="flex items-center justify-end"
          method="POST"
          enctype="multipart/form-data"
          on:submit
          use:enhance={({ formElement, cancel }) => {
            if (loading) {
                cancel();
              }
            loading = true;
              success = false;
              return async ({ result }) => {
                  if (result.type === "success") {
                      success = true;
                      formElement.reset();
                      invalidateAll();
                  }
                  loading=false;
              };
          }}>
            <input type="hidden" name="userId" value={data.userId}/>
            <input type="hidden" name="resign" bind:value={isResigned}/>
            <ButtonComp  classes="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600" text="Resign from Moderation" {loading} onClick={resignFromModeration}  />
            <!-- <button  type="submit" on:click={() => resignFromModeration()} class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
              Resign from Moderation
            </button> -->
          </form>
          {/if}
        </div>
      </div>
    </div>
  </div>
</div>
