<!-- Post.svelte -->

<script lang="ts">
    import Comment from "./Comment.svelte";
    export let post: Post;
</script>

<div class="post">
    <div class="header">
        <img class="user-avatar" src="sample/sample.jpg" alt="User Avatar" />
        <div class="user-info">
            <h2>{post.title}</h2>
            <p>{post.content}</p>
        </div>
    </div>
    {#if post.imageUrl}
        <img class="post-image" src={post.imageUrl} alt="something" />
    {/if}
    <div class="post-info">
        <div class="like-info">
            <span>like: {post.likeCount}</span>
            <span>comment: {post.commentCount}</span>
        </div>
        <div class="tags">
            {#each post.tags as tag}
                <span class="tag">#{tag}</span>
            {/each}
        </div>
    </div>
    <div class="comments">
        <ul>
            {#each post.comments as comment}
                <Comment {comment} />
            {/each}
        </ul>
    </div>
</div>
