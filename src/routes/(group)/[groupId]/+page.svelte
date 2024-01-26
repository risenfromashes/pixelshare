<script>
    // Placeholder data for sidebar and main content items
    import Comment from "../../../lib/components/Comment.svelte";


    const sidebarItems = [
        { name: "DashBoard", icon: "icons/home.png" },
        { name: "Gallery", icon: "icons/search.png" },
        { name: "Search" , icon: "icons/search.png"},
        { name: "Notifications", icon: "icons/notification.png" },
        { name: "Members", icon: "icons/settings.png" },
        // { name: "Profile", icon: "icons/profile.png" },
        { name: "Settings", icon: "icons/settings.png" },
    ];
    const groupPhoto="sample/sample.jpg"
    const groupName="BUET CSE-19"
    const groupCover="sample/sample.jpg"
    const posts = [
    {
        title: 'Post 1',
        content: 'Lorem ipsum dolor sit amet.',
        imageUrl: 'sample/sample.jpg',
        likeCount: 2,
        commentCount: 3,
        comments: ['Comment A', 'Comment B'],
        tags: ['Tag 1', 'Tag 2']
    },
    {
        title: 'Post 2',
        content: 'Consectetur adipiscing elit.',
        imageUrl: 'sample/sample.jpg',
        likeCount: 3,
        commentCount: 2,
        comments: ['Comment X', 'Comment Y'],
        tags: ['Tag 3', 'Tag 4']
    },
    // Add more posts as needed
];
    import  CoverPart from "../../../lib/components/CoverPhoto.svelte";
    import Post from "../../../lib/components/Post.svelte";
    // import Comment from "./Comment.svelte";


    
    const rightSidebarItems = {
        groups: ["BUET", "CSE '19", "PixelShare Devs"],
        friends: ["Faria Binte Awal", "Some Random Guy", "Md. Riyasat Hossain"],
    };

</script>

<div class="flex relative h-screen bg-zinc-950 text-white">
    <!-- Left Sidebar -->
    <div
        class="absolute inset-y-0 left-0 hidden xl:flex flex-col justify-start items-start w-64 p-4 space-y-6 bg-zinc-900 pt-16"
    >
        <div class="flex flex-row justify-center items-center">
            <img src="demo-logo.png" alt="Pixel Share" class="h-16 w-16" />
            <p class="ml-4 font-semibold text-2xl text-sky-300">PixelShare</p>
        </div>
        <hr class="h-px w-full my-8 bg-zinc-800 border-0 dark:bg-zinc-700" />
        <nav class="grow flex flex-col justify-center">
            {#each sidebarItems as item}
                <button
                    class="flex items-center px-4 py-2 hover:bg-gray-700 rounded"
                >
                    <img
                        class="object-cover w-8 h-8"
                        alt="icon"
                        src={item.icon}
                    />
                    <span class="ml-3">{item.name}</span>
                </button>
            {/each}
        </nav>
        <div class="flex flex-col">
            <button
                class="flex items-center px-4 py-2 hover:bg-gray-700 rounded mb-2"
            >
                <img
                    class="object-cover w-8 h-8"
                    alt="icon"
                    src="icons/profile.png"
                />
                <span class="ml-3">Profile</span>
            </button>
            <button
                class="flex items-center px-4 py-2 hover:bg-gray-700 rounded mb-4"
            >
                <img
                    class="object-cover w-8 h-8"
                    alt="icon"
                    src="icons/logout.png"
                />
                <span class="ml-3 font-medium text-red-500">Log out</span>
            </button>
        </div>
    </div>

    <!-- Main Content -->
   <div class="flex-1 xl:px-64 p-4 overflow-y-auto">
    <div>
        <CoverPart></CoverPart>
    </div>
    <div class="flex-1 xl:px-65 p-4 overflow-y-auto">
        {#each posts as post (post.id)}
            <Post {post} />
            <!-- {#each {post.comments} as comment (comment.id)}
                <Comment {comment} />
            {/each} -->
        {/each}
    </div>
</div>

    <!-- Right Sidebar -->
    <div
        class="absolute inset-y-0 right-0 hidden xl:block h-full w-64 p-4 space-y-6 bg-zinc-900"
    >
        <div class="space-y-4">
            <div>
                <h3 class="text-lg font-bold">Your Groups</h3>
                <ul>
                    {#each rightSidebarItems.groups as group}
                        <li class="mt-2">{group}</li>
                    {/each}
                </ul>
            </div>
            <div>
                <h3 class="text-lg font-bold">Your Friends</h3>
                <ul>
                    {#each rightSidebarItems.friends as friend}
                        <li class="mt-2">{friend}</li>
                    {/each}
                </ul>
            </div>
        </div>
    </div>
</div>
<slot />
