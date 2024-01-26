<script>
    // Placeholder data for sidebar and main content items
    import Comment from "../../../lib/components/Comment.svelte";
    const sidebarItems = [
        { name: "DashBoard", icon: "icons/home.png" },
        { name: "Gallery", icon: "icons/search.png" },
        { name: "Search", icon: "icons/search.png" },
        { name: "Notifications", icon: "icons/notification.png" },
        { name: "Members", icon: "icons/settings.png" },
        // { name: "Profile", icon: "icons/profile.png" },
        { name: "Settings", icon: "icons/settings.png" },
    ];
    const groupPhoto = "sample/sample.jpg";
    const groupName = "BUET CSE-19";
    const groupCover = "sample/sample.jpg";
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
    ];
    import CoverPart from "../../../lib/components/CoverPhoto.svelte";
    import Post from "../../../lib/components/Post.svelte";
    // import Comment from "./Comment.svelte";
</script>

<div>
    <CoverPart></CoverPart>
    {#each posts as post}
        <Post {post}></Post>
    {/each}
</div>
<div class="flex-1 xl:px-65 p-4 overflow-y-auto"></div>
