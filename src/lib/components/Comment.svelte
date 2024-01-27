<script lang="ts">
  export let comment: CommentData;
</script>

<div class="flex items-start">
  <img
    class="h-8 w-8 rounded-full mr-3"
    src="sample/comment-avatar.jpg"
    alt="Comment User Avatar"
  />
  <div class="bg-gray-100 rounded-lg p-3">
    <p class="font-semibold text-sm">{comment.username}</p>
    <p class="text-sm text-gray-600">{comment.content}</p>
  </div>
</div>
