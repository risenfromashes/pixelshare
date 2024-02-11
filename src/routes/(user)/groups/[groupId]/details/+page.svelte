<script>
  // @ts-nocheck

  import { onMount } from "svelte";
  import { writable } from "svelte/store";
  import { page } from "$app/stores";

  // Sample user profile data
  export let data;

  let isLike = false;
  let showComment = false;
  let userProfile = {
    username: "johora_ava",
    bio: "Nature lover and photographer",
    profileImage: "../../icons/profile.png",
  };

  let groupInfo = {
    name: "Central BUET",
    coverImage: "../../icons/group-image.jpg", // Replace with the actual path to your cover image
    bio: "Welcome to Central_BUET, the heart where echoes of laughter, shared dreams, and the spirit of camaraderie reverberate through the corridors of time. This is not just a group; it is a sanctuary of memories, a sacred space where we gather to relive the golden hours we once shared.", // Replace with the actual bio of the group
  };

  // Sample post data
  let posts = writable([
    {
      id: 1,
      username: "johora_ava",
      image: "../../icons/bird-post-sample.jpg",
      caption:
        "In the embrace of the velvety night, our feline friend becomes a celestial guardian, adorned with the mystery of moonlit plants.",
      tags: ["Kashmir", "Bangladesh", "Sanfish_bird"],
      location: "Dhaka, Bangladesh",
      date: "2024-01-25",
      likeCount: 15,
      commentCount: 2,
      comments: [
        { username: "user1", text: "Beautiful shot!" },
        { username: "user2", text: "Love it!" },
      ],
    },
    // Add more post objects here
  ]);

  // Function to add a new comment to a post
  function addComment(post, newComment) {
    post.comments.push(newComment);
    posts.update((allPosts) => [...allPosts]);
    newComment = "";
  }

  // Function to like a post
  function likePost(post) {
    post.likeCount += 1;
    isLike = true;
    posts.update((allPosts) => [...allPosts]);
  }
  function dislikePost(post) {
    post.likeCount -= 1;
    isLike = false;
    posts.update((allPosts) => [...allPosts]);
  }

  function commentPost(post) {
    if (!showComment) showComment = true;
    else showComment = false;
  }
</script>

<!-- Main Content -->
<!-- <div class="flex-1 xl:px-64 p-4 overflow-y-auto"> -->
<div
  class="group-info-panel bg-orange-50 p-4 rounded-lg shadow-lg text-black overflow-hidden"
>
  <!-- Posts -->

  <div class="posts-panel mt-4">
    {#if data.posts}
      {#each data.posts as post (post.url)}
        <div class="post-item bg-orange-100 p-4 rounded-lg shadow-lg mb-4">
          <div class="post-header flex items-center">
            <img
              src={post.profileImg}
              alt="User"
              class="w-8 h-8 rounded-full mr-2"
            />
            <span class="font-semibold">{post.username}</span>
          </div>
          <img src={post.url} alt="Post" class="w-1/3 h-1/3 rounded-lg mt-2" />
          <div class="post-actions mt-2">
            <div class="flex items-center">
              <!-- Replace the SVG button with an image -->
              {#if !isLike}
                <button class="btn-icon mr-2" on:click={() => likePost(post)}>
                  <img src="../../icons/love1.png" alt="Like" class="w-6 h-6" />
                </button>
              {:else}
                <button
                  class="btn-icon mr-2"
                  on:click={() => dislikePost(post)}
                >
                  <img src="../../icons/love2.png" alt="Like" class="w-6 h-6" />
                </button>
              {/if}

              <span class="font-semibold">{post.likeCount}</span>
              <span>
                <button
                  class="btn-icon mr-1 ml-4"
                  on:click={() => commentPost(post)}
                >
                  <img
                    src="../../icons/comment.png"
                    alt="comment"
                    class="w-6 h-6"
                  />
                </button>
              </span>

              <span class="font-semibold">{post.commentCount}</span>
            </div>
          </div>
          <div class="post-caption mt-2">
            <span class="font-semibold">{post.username}</span>
            <span>{post.caption}</span>
          </div>
          <div class="post-tags mt-2 flex justify-end">
            <!-- {#each post.tags as tag (tag)}
              <span
                class="tag bg-orange-300 rounded-full px-2 py-1 text-sm mr-2"
                >{tag}</span
              >
            {/each} -->
          </div>

          <div class="bg-orange-200 w-full h-px mx-3 mt-4"></div>
          <div class="post-comments mt-2">
            {#if showComment}
              {#each post.comments as comment}
                <div class="flex items-center mt-1">
                  <span class="font-semibold mr-2">{comment.username}</span>
                  <span>{comment.text}</span>
                </div>
              {/each}
              <!-- Add comment form -->
              <form
                class="mt-2"
                on:submit={(e) =>
                  addComment(post, {
                    username: userProfile.username,
                    text: e.target.comment.value,
                  })}
              >
                <input
                  type="text"
                  name="comment"
                  placeholder="Add a comment..."
                  class="w-full rounded-lg border border-gray-300 p-2 focus:outline-none"
                />
              </form>
            {/if}
          </div>
        </div>
      {/each}
    {/if}
  </div>
</div>

<!-- Right Sidebar -->
<slot />
