<script lang="ts">
  // @ts-nocheck

  import { onMount } from "svelte";
  import { writable } from "svelte/store";
  export let data;

  export let postRequests;
  // hihihuhu
  // Initialize a writable Svelte store for the map to make it reactive
  let currentImageIndex: BigInt = 0;
  let isLiked: Boolean = false;

  function handleAction(event, likeStatus) {
    //event.preventDefault(); // Prevent form submission

    event.stopPropagation(); // Stop event from propagating further
    isLiked = likeStatus;
    // Optionally, do something with isLiked here or submit form data using fetch API
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

  function approvePost(postId) {
    console.log("Approve", postId);
  }

  function rejectPost(postId) {
    console.log("Reject", postId);
  }
</script>

<!-- Main Content -->
<div class="flex-1 xl:px-12 p-4 overflow-y-auto">
  <div class="p-4 rounded-lg text-black flex justify-center">
    {#if data.posts.length <= 0}
      <div class="text-center">Nothing to show.</div>
    {:else}
      <!--Posts -->
      <div class="p-4 rounded-lg max-w-xl">
        {#each data.posts as post}
          <div
            class=" bg-orange-100 justify-between mb-6 request-item flex items-center bg-black-100 border-2 border-orange-200 p-4 rounded-lg shadow-lg hover:bg-orange-200 transition-colors duration-200 ease-in-out"
          >
            <div class="mb-8">
              <p class="mb-4 text-black font-bold hover:text-gray-700">
                {post.createdby} has added a post with the following tags and images
                on dated {post.createdat}.
              </p>

              <p class="mb-4 text-purple-800 font-bold hover:text-gray-700">
                {post.caption}
              </p>
              <div class="flex justify-center items-center mb-4">
                <!-- Image navigation and tags here, apply text and hover classes as needed -->
                <div class="flex mb-4 items-center px-8">
                  {#if post.image_urls.length > 1}
                    <div class="flex mb-4 items-left">
                      <button class="btn" on:click={() => previousImage(post)}
                        >&lt;</button
                      >
                    </div>
                  {/if}
                  <img
                    src={post.image_urls[currentImageIndex]}
                    alt="no pics"
                    class="w-100 object-cover rounded-lg"
                  />
                  {#if post.imagelen > 1}
                    <button class="btn" on:click={() => nextImage(post)}
                      >&gt;</button
                    >
                  {/if}
                </div>
              </div>

              <div class="flex justify-center gap-4">
                <form method="POST" on:submit enctype="multipart/form-data">
                  <input type="hidden" name="postId" bind:value={post.id} />
                  <input type="hidden" name="action" bind:value={isLiked} />
                  {#if !post.is_liked}
                    <button
                      type="submit"
                      on:click={(event) => {
                        event.stopPropagation();
                        handleAction(event, true);
                      }}
                      class="px-4 py-2"
                    >
                      <img
                        src="../../icons/love1.png"
                        alt="Like"
                        class="w-6 h-6"
                      /></button
                    >
                  {:else}
                    <button
                      type="submit"
                      on:click={(event) => {
                        event.stopPropagation();
                        handleAction(event, false);
                      }}
                      class="px-4 py-2"
                    >
                      <img
                        src="../../icons/love2.png"
                        alt="Like"
                        class="w-6 h-6"
                      />
                    </button>
                  {/if}
                </form>
              </div>
            </div>
          </div>
        {/each}
      </div>
    {/if}
  </div>
</div>
