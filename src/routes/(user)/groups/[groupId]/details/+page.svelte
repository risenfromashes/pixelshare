<script lang="ts">
  // Placeholder data for sidebar and main content items

  const posts: PostData[] = [
    {
      id: "1",
      title: "Post 1",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      imageUrl: "/sample/sample.jpg",
      likeCount: 2,
      commentCount: 3,
      comments: [
        { id: "c1", username: "User A", content: "Comment A" },
        { id: "c2", username: "User B", content: "Comment B" },
      ],
      tags: ["Tag 1", "Tag 2"],
    },
    {
      id: "2",
      title: "Post 2",
      content:
        "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      imageUrl: "/sample/sample2.jpg",
      likeCount: 3,
      commentCount: 2,
      comments: [
        { id: "c3", username: "User X", content: "Comment X" },
        { id: "c4", username: "User Y", content: "Comment Y" },
      ],
      tags: ["Tag 3", "Tag 4"],
    },
    // Add more posts as needed
  ];

  import CoverPhoto from "$lib/components/CoverPhoto.svelte";
  import Post from "$lib/components/Post.svelte";
</script>

<div class="w-full">
  <CoverPhoto></CoverPhoto>
</div>
<div class="flex-1 xl:px-20 p-6 overflow-y-auto">
  {#each posts as post}
    <Post {post}></Post>
    <!-- {#each {post.comments} as comment (comment.id)}
                  <Comment {comment} />
              {/each} -->
  {/each}
</div>
