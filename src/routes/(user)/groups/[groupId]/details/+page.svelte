<script lang="ts">
  import { page } from "$app/stores";
  import { onMount, tick } from "svelte";
  import { writable } from "svelte/store";
  import { enhance } from "$app/forms";
  import { goto, invalidateAll, onNavigate } from "$app/navigation";
  import { formatDistanceToNow } from "date-fns";
  export let data;
  let isLiked: Boolean = false;
  let newComment = "";

  function timeAgo(dateString: string) {
    const date = new Date(dateString);
    return formatDistanceToNow(date, { addSuffix: true });
  }
</script>

<div class="flex-1 xl:px-12 p-4 overflow-y-auto">
  <div class="p-4 rounded-lg text-black flex justify-center">
    {#if data.posts.length <= 0}
      <div class="text-center">Nothing to show.</div>
    {:else}
      <div class="p-4 rounded-lg max-w-xl">
        {#each data.posts as post}
          {#if post.image_urls && post.image_urls.length > 0}
            <div
              class="flex flex-col bg-orange-100 mb-6 rounded-lg shadow-lg transition-colors duration-200 ease-in-out"
            >
              <div class="flex items-center p-4 border-b border-orange-200">
                <img
                  src={post.poster_profile_img}
                  alt="Profile"
                  class="w-10 h-10 rounded-full mr-4"
                />
                <div>
                  <p class="text-black font-bold">{post.createdby}</p>
                  <p class="text-sm text-gray-600">{timeAgo(post.createdat)}</p>
                </div>
              </div>
              <div class="p-4">
                <p class="mb-4 text-purple-800 font-bold">{post.caption}</p>
                <div class="flex justify-center items-center mb-4">
                  <div class="flex items-center">
                    {#if post.image_urls.length > 1}
                      <button
                        class="p-2 hover:bg-orange-300 rounded-lg shadow-md mr-2 text-xl"
                        on:click={() => {
                          post.currentImageIndex =
                            ((post.currentImageIndex ?? 0) -
                              1 +
                              post.image_urls.length) %
                            post.image_urls.length;
                        }}>&#10092;</button
                      >
                    {/if}
                    <a
                      href="/groups/{$page.params.groupId}/similar/{post
                        .image_ids[post.currentImageIndex ?? 0]}"
                    >
                      <img
                        id="image-{post.image_ids[post.currentImageIndex ?? 0]}"
                        src={post.image_urls[post.currentImageIndex ?? 0]}
                        alt="Post"
                        class="h-72 object-cover rounded-lg"
                      />
                    </a>
                    {#if post.image_urls.length > 1}
                      <button
                        class="p-2 hover:bg-orange-300 rounded-lg shadow-md ml-2 text-xl"
                        on:click={() => {
                          post.currentImageIndex =
                            ((post.currentImageIndex ?? 0) + 1) %
                            post.image_urls.length;
                        }}>&#10093;</button
                      >
                    {/if}
                  </div>
                </div>
                <div class="flex items-center gap-4">
                  <form
                    method="POST"
                    on:submit
                    enctype="multipart/form-data"
                    use:enhance
                  >
                    <input type="hidden" name="postId" bind:value={post.id} />
                    <input type="hidden" name="action" bind:value={isLiked} />
                    <button
                      type="submit"
                      on:click={(event) => {
                        event.stopPropagation();
                        isLiked = !post.is_liked;
                      }}
                      class="px-4 py-2 rounded-lg shadow hover:bg-gray-100 flex items-center"
                    >
                      <img
                        src={!post.is_liked
                          ? "../../icons/love1.png"
                          : "../../icons/love2.png"}
                        alt="Like"
                        class="w-6 h-6 mr-2"
                      />
                      <span class="text-sm">{post.num_reacts}</span>
                    </button>
                  </form>
                  <!-- Improved Comment Box Layout -->
                  <div class="flex items-center flex-grow">
                    <textarea
                      bind:value={newComment}
                      class="flex-grow p-2 text-gray-700 leading-tight focus:outline-none border rounded-l-md shadow"
                      placeholder="Write a comment..."
                      rows="1"
                    ></textarea>
                    <button
                      class="bg-orange-500 text-white rounded-r-md hover:bg-orange-700 focus:outline-none focus:shadow-outline px-4 py-2"
                      >Post</button
                    >
                  </div>
                </div>
              </div>
            </div>
          {/if}
        {/each}
      </div>
    {/if}
  </div>
</div>
