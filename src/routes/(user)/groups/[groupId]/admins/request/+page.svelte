<script lang="ts">
  import { goto, invalidateAll, onNavigate } from "$app/navigation";
  import { enhance } from "$app/forms";
  export let data; // Assume this now contains member requests data including pictures, names, and request IDs
  let isApproved: Boolean = false;
  let isModalOpen = false;
  let success = false;
  let isRequestSent = false;
  let message = "";
  // Function to toggle isApproved and submit the form
  function openModal(event: Event) {
    isModalOpen = true;
  }

  // Function to close the modal
  function closeModal() {
    isModalOpen = false;
  }

  // Function to send the message and close the modal
  function sendMessage(event: Event, isSent: boolean) {
    isRequestSent = isSent;
    // You can implement the logic to send the message here.
    // For now, let's assume the message is sent successfully.
    closeModal();
  }
  onNavigate(() => {
    success = false;
  });
</script>

<div class="flex relative h-screen bg-orange-50 text-black">
  <!-- Main Content -->
  <div class="flex-1 xl:px-12 p-4 overflow-y-auto">
    <div class="requests-panel p-4 rounded-lg text-black">
      <!-- <div class="text-center py-4">
				<h1 class="text-2xl font-bold mb-2">{groupInfo.name}</h1>
			</div>
			<img
				src={groupInfo.coverImage}
				alt="Group Cover"
				class="mb-2 rounded-lg w-full h-60 object-cover"
			/>
			<div class="text-center py-4">
				<p class="mb-4">{groupInfo.bio}</p>
			</div> -->

      <h1 class="text-3xl font-bold text-center mb-8">Add Moderator</h1>
      <div class="flex flex-col space-y-4">
        <h2 class="text-xl font-bold mb-2">Suggested Moderators</h2>

        {#if data.error}
          <div
            class="block w-full font-bold px-4 py-3 bg-red-100 rounded text-left text-xs text-red-500 mb-4"
          >
            <p class="text-center">Error: {data.error}</p>
          </div>
        {:else if !data.requests || data.requests.length === 0}
          <p class="text-center">No member requests yet.</p>
        {:else}
          {#if success}
            <div
              class="block w-full font-bold px-4 py-3 bg-green-100 rounded text-left text-xs text-green-500 mb-4"
            >
              <p>Message has been sent successfully!</p>
            </div>
          {/if}
          {#each data.requests as moderator}
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
              <!-- Member Picture -->
              <div class="w-24 h-24 mr-4">
                <img
                  src={moderator.profileImg}
                  alt={moderator.username}
                  class="object-cover w-full h-full rounded-md"
                />
              </div>
              <!-- Member Details and Actions -->
              <div class="flex-1 flex justify-between items-center">
                <div>
                  <h3 class="text-lg font-bold">
                    <input
                      type="hidden"
                      name="username"
                      bind:value={moderator.username}
                    />
                    {moderator.username}
                  </h3>
                </div>
                <div>
                  <!-- <input
                            type="hidden"
                            name="action"
                            bind:value={isModalOpen}
                        /> -->
                  <button
                    type="submit"
                    on:click={(event) => openModal(event)}
                    class="px-4 py-2 mr-2 bg-orange-300 text-white rounded-lg hover:bg-orange-500"
                  >
                    sendRequest</button
                  >
                </div>
              </div>

              {#if isModalOpen}
                <div
                  class="fixed inset-0 flex items-center justify-center z-50"
                >
                  <div class="modal bg-orange-200 rounded-lg p-6">
                    <h2 class="text-xl font-semibold mb-4">
                      Send Moderation Request
                    </h2>
                    <h3 class="text-lg mb-2">
                      State the Reason why do you prefer him as a Moderator?
                    </h3>
                    <hr
                      class="h-px w-full my-2 bg-zinc-800 border-0 dark:bg-zinc-700"
                    />
                    <textarea
                      class="w-full h-32 rounded border p-2 mb-4 bg-orange-100"
                      placeholder="Type your message here"
                      name="message"
                      bind:value={message}
                    ></textarea>
                    <div class="flex justify-end">
                      <input
                        type="hidden"
                        name="action"
                        bind:value={isRequestSent}
                      />
                      <button
                        type="submit"
                        on:click={(event) => sendMessage(event, true)}
                        class="px-4 py-2 mr-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                      >
                        Send</button
                      >
                      <button
                        type="submit"
                        on:click={(event) => sendMessage(event, false)}
                        class="px-4 py-2 mr-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                      >
                        Cancel</button
                      >
                    </div>
                  </div>
                </div>
              {/if}
            </form>
          {/each}
        {/if}

        <h2 class="text-xl font-bold mb-2">Resign from Moderation</h2>
        <hr class="h-px w-full my-4 bg-zinc-800 border-0 dark:bg-zinc-700" />
        <div class="text-right">
          <button
            class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Resign from Moderation
          </button>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- <slot /> -->
