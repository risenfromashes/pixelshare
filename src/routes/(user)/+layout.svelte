<script>
    // Placeholder data for sidebar and main content items
    const sidebarItems = [
        { name: "Home", icon: "icons/home.png" },
        { name: "Search", icon: "icons/search.png" },
        { name: "Notifications", icon: "icons/notification.png" },
        { name: "Settings", icon: "icons/settings.png" },
    ];

    const mainContentItems = [
        {
            title: "Today's Highlights",
            images: [
                "spotlight-1.jpg",
                "spotlight-2.jpg",
                "spotlight-3.jpg",
                "spotlight-3.jpg",
            ],
        },
        {
            title: "Yesterday",
            images: ["top-likes-1.jpg", "top-likes-2.jpg", "top-likes-3.jpg"],
        },
        {
            title: "Last Week",
            images: [
                "top-likes-1.jpg",
                "top-likes-2.jpg",
                "top-likes-3.jpg",
                "top-likes-1.jpg",
                "top-likes-2.jpg",
                "top-likes-3.jpg",
            ],
        },
    ];

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
        {#each mainContentItems as section}
            <div class="p-4 xl:p-10">
                <h2 class="text-xl font-bold mb-3">{section.title}</h2>
                <div
                    class="grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-x-2 gap-y-4"
                >
                    {#each section.images as image}
                        <div class="">
                            <img
                                src="sample/sample.jpg"
                                alt="Random"
                                class="object-cover w-fit rounded rounded-lg border border-2 border-zinc-500"
                            />
                        </div>
                    {/each}
                </div>
            </div>
        {/each}
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
