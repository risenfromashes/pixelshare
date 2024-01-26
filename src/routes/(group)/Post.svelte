<!-- Post.svelte -->

<script>
    import Comment from "./Comment.svelte";
    export let post;
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
        <img class="post-image" src={post.imageUrl} alt="Post Image" />
    {/if}
    <div class="post-info">
        <div class="like-info">
            <span>like: {post.likeCount}</span>
            <span>comment: {post.commentCount}</span>
        </div>
        <div class="tags">
            {#each post.tags as tag (tag.id)}
                <span class="tag">#{tag}</span>
            {/each}
        </div>
    </div>
    <div class="comments">
        <ul>
            {#each post.comments as comment (comment.id)}
                <Comment {comment} />
            {/each}
        </ul>
    </div>
</div>

<style>
    .post {
        margin: 20px;
        padding: 20px;
        border: 1px solid #ccc;
        border-radius: 8px;
        background-color: #bbb;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        color: #000;
    }

    .header {
        display: flex;
        align-items: center;
        margin-bottom: 10px;
    }

    .user-avatar {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        margin-right: 10px;
    }

    .user-info {
        flex-grow: 1;
    }

    h2 {
        margin: 0;
        font-size: 1.2rem;
        text-color: #000;
    }

    p {
        margin: 0;
        color: #555;
    }

    .post-image {
        max-width: 100%;
        height: auto;
        border-radius: 8px;
        margin-top: 10px;
    }

    .post-info {
        margin-top: 10px;
        padding-top: 10px;
        border-top: 1px solid #eee;
        display: flex;
        justify-content: space-between;
    }

    .like-info {
        display: flex;
    }

    .tags {
        display: flex;
        flex-wrap: wrap;
    }

    .tag {
        margin-right: 5px;
        color: #3498db;
        cursor: pointer;
    }

    .comments {
        margin-top: 10px;
    }
</style>
