<script>
    // Placeholder data for sidebar and main content items

    const posts = [
        {
            id: "1",
            title: "Post 1",
            content: "Lorem ipsum dolor sit amet.",
            imageUrl: "sample/sample.jpg",
            likeCount: 2,
            commentCount: 3,
            comments: ["Comment A", "Comment B"],
            tags: ["Tag 1", "Tag 2"],
        },
        {
            id: "2",
            title: "Post 2",
            content: "Consectetur adipiscing elit.",
            imageUrl: "sample/sample.jpg",
            likeCount: 3,
            commentCount: 2,
            comments: ["Comment X", "Comment Y"],
            tags: ["Tag 3", "Tag 4"],
        },
        // Add more posts as needed
    ];
    import CoverPart from "../../../lib/components/CoverPhoto.svelte";
    import Post from "../../../lib/components/Post.svelte";
    // import Comment from "./Comment.svelte";
</script>

<div>
    <CoverPart></CoverPart>
</div>
<div class="flex-1 xl:px-65 p-4 overflow-y-auto">
    {#each posts as post}
        <Post {post} />
        <!-- {#each {post.comments} as comment (comment.id)}
                <Comment {comment} />
            {/each} -->
    {/each}
</div>
