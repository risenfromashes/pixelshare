<script lang="ts">
  import Comment from "./Comment.svelte";
  export let post: PostData;
</script>

<div
  class="bg-orange-100 shadow-md rounded-lg p-4 mb-8 border border-orange-200"
>
  <div class="flex items-center mb-4">
    <img
      class="h-10 w-10 rounded-full mr-3"
      src="sample/sample.jpg"
      alt="User Avatar"
    />
    <div>
      <h2 class="font-semibold text-lg">{post.title}</h2>
      <p class="text-gray-600">{post.content}</p>
    </div>
  </div>
  {#if post.imageUrl}
    <img class="h-72 rounded-lg mb-4" src={post.imageUrl} alt="cover" />
  {/if}
  <div class="flex justify-between items-center mb-4">
    <div class="flex items-center">
      <img
        class="icon-image h-6 w-6 mr-2"
        src="icons/love1.png"
        alt="Like Icon"
      />
      <span>{post.likeCount} Likes</span>
      <img
        class="icon-image h-6 w-6 ml-4 mr-2"
        src="icons/comment.png"
        alt="comment Icon"
      />
      <span>{post.commentCount} Comments</span>
    </div>
    <div class="flex">
      {#each post.tags as tag}
        <span
          class="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded"
          >#{tag}</span
        >
      {/each}
    </div>
  </div>
  <div class="border-t border-gray-200 pt-4">
    <ul>
      {#each post.comments as comment}
        <li class="mb-2">
          <Comment {comment} />
        </li>
      {/each}
    </ul>
  </div>
</div>
