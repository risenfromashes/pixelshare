<!-- Comment.svelte -->

<script>
    export let comment;
  </script>
  
  <span class="post-container">
    <img class="icon-image" src="icons/profile.png" alt="User Avatar" />
    {comment}
  </span>
  <style>

    .user-avatar {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        margin-right: 10px;
    }
    .post-container {
    display: flex;
    align-items: center;
  }

    .icon-image {
    width: 24px; /* Adjust the width as needed */
    height: 24px; /* Adjust the height as needed */
    margin-right: 8px; /* Adjust the margin between image and like count */
  }
</style>