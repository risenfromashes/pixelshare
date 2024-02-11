<script lang="ts">
  // @ts-nocheck

  import { onMount } from "svelte";
  import { writable } from "svelte/store";
  export let data;

  export let postRequests;
  // hihihuhu
  // Initialize a writable Svelte store for the map to make it reactive
  let currentImageIndex: BigInt = 0;
  let isApproved: Boolean = false;

  function handleAction(event, approvalStatus) {
    isApproved = approvalStatus;

    // Optionally, do something with isApproved here or submit form data using fetch API
    // If submitting via fetch API, you might preventDefault and manually handle the form submission
  }

  function removeTag(post, tag) {
    post.tags = post.tags.filter((t) => t !== tag);
    post.removedTags.push(tag);
    postRequests.update((posts) => [...posts]);
  }

  function revertTag(post, tag) {
    post.removedTags = post.removedTags.filter((t) => t !== tag);
    post.tags.push(tag);
    postRequests.update((posts) => [...posts]);
  }

  function nextImage(post) {
    console.log("in nextImage func");
    if (currentImageIndex < post.imagelen - 1) {
      post.currentImageIndex += 1;
      //postRequests.update((posts) => [...posts]);
    }
  }

  function previousImage(post) {
    if (currentImageIndex > 0) {
      currentImageIndex -= 1;
      //postRequests.update((posts) => [...posts]);
    }
  }
  // Function to update the current image index for a post
  // function updateCurrentImageIndex(postId, newIndex) {
  // 	currentImageIndices.update((indices) => {
  // 		indices.set(postId, newIndex);
  // 		return indices;
  // 	});
  // }

  // Function to move to the next image of a post
  // function nextImage(post) {
  // 	currentImageIndices.update((indices) => {
  // 		const currentIndex = indices.get(post.id) || 0;
  // 		const nextIndex = (currentIndex + 1) % post.images.length; // Loop back to the first image if at the end
  // 		indices.set(post.id, nextIndex);
  // 		return indices;
  // 	});
  // }

  // Function to move to the previous image of a post
  // function previousImage(post) {
  // 	currentImageIndices.update((indices) => {
  // 		const currentIndex = indices.get(post.id) || 0;
  // 		const prevIndex =
  // 			currentIndex - 1 < 0
  // 				? post.images.length - 1
  // 				: currentIndex - 1; // Loop to the last image if at the beginning
  // 		indices.set(post.id, prevIndex);
  // 		return indices;
  // 	});
  // }

  function approvePost(postId) {
    console.log("Approve", postId);
    // Here you would make an API call to approve the post
  }

  function rejectPost(postId) {
    console.log("Reject", postId);
    // Here you would make an API call to reject the post
  }
  //console.log("ekhane print kora jai jantam na");
  //console.log(data.postRequests);
</script>

<!-- Main Content -->
<div class="flex-1 xl:px-12 p-4 overflow-y-auto">
  <div class="p-4 rounded-lg text-black">
    {#if data.postRequests.length <= 0}
      <div class="text-center">Nothing to show.</div>
    {:else}
      <!--Posts -->
      <div class="bg-orange-300 p-4 rounded-lg shadow-lg">
        {#each data.postRequests as post}
          <div
            class="p-3 rounded-lg bg-orange-100 flex items-center justify-between mb-2"
          >
            <form
              class="request-item flex items-center bg-black-100 border-2 border-orange-200 p-4 rounded-lg shadow-lg hover:bg-orange-200 transition-colors duration-200 ease-in-out"
              method="POST"
              on:submit
              enctype="multipart/form-data"
            >
              <div class="mb-8">
                <p class="mb-4 text-black font-bold hover:text-gray-700">
                  <input
                    type="hidden"
                    name="postedBy"
                    bind:value={post.username}
                  />
                  User {post.username} has added a post with the following tags and
                  images on dated {post.createdat}.
                  <input type="hidden" name="postId" bind:value={post.id} />
                </p>

                <p class="mb-4 text-purple-800 font-bold hover:text-gray-700">
                  <input
                    type="hidden"
                    name="caption"
                    bind:value={post.caption}
                  />
                  {post.caption}
                </p>
                <div class="flex items-center mb-4">
                  <!-- Image navigation and tags here, apply text and hover classes as needed -->
                  <div class="flex mb-4 items-center">
                    {#if post.imagelen > 1}
                      <div class="flex mb-4 items-left">
                        <button class="btn" on:click={() => previousImage(post)}
                          >&lt;</button
                        >
                      </div>
                    {/if}
                    <img
                      src={post.imageurls[currentImageIndex]}
                      alt="no pics"
                      class="rounded-lg"
                    />
                    {#if post.imagelen > 1}
                      <button class="btn" on:click={() => nextImage(post)}
                        >&gt;</button
                      >
                    {/if}
                  </div>
                </div>
                <div class="tags flex flex-wrap gap-2 mb-4">
                  {#each post.tagnames as tag, index}
                    <span class="tag bg-orange-300 rounded px-2 py-1">
                      {tag}
                      <button
                        on:click={() => removeTag(post, tag)}
                        class="ml-1 text-black hover:text-white">&times;</button
                      >
                    </span>
                  {/each}
                </div>
                <div class="flex justify-center gap-4">
                  <input type="hidden" name="action" bind:value={isApproved} />
                  <button
                    type="submit"
                    on:click={(event) => handleAction(event, true)}
                    class="px-4 py-2 bg-orange-400 text-white font-bold rounded-lg hover:bg-green-600 hover:text-gray-700"
                    >Approve</button
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
