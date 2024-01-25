<script>
    import { Icon } from "$lib";
    import FaIcon from "$lib/components/FaIcon.svelte";

    // Placeholder data for sidebar and main content items
    const sidebarItems = [
        { name: "Home", icon: Icon.HOUSE },
        { name: "Search", icon: Icon.MAGNIFYING_GLASS },
        { name: "Notifications", icon: Icon.BELL },
        { name: "Settings", icon: Icon.GEAR },
    ];

    const userDetails = {
        name: "Ashrafur Rahman Khan",
        username: "risenfromashes",
        avatarUrl: "/risenfromashes.png",
    };

    const mainContentItems = [
        {
            title: "Today's Highlights",
            images: [
                { link: "sample/sample.jpg", caption: "lalalalalaaaaa" },
                { link: "sample/sample2.jpg", caption: "lalalalalaaaaa" },
                { link: "sample/sample3.jpg", caption: "lalalalalaaaaa" },
                { link: "sample/sample2.jpg", caption: "lalalalalaaaaa" },
            ],
        },
        {
            title: "Yesterday",
            images: [
                { link: "sample/sample2.jpg", caption: "lalalalalaaaaa" },
                { link: "sample/sample.jpg", caption: "lalalalalaaaaa" },
                { link: "sample/sample3.jpg", caption: "lalalalalaaaaa" },
            ],
        },
        {
            title: "Last Week",
            images: [
                { link: "sample/sample2.jpg", caption: "lalalalalaaaaa" },
                { link: "sample/sample3.jpg", caption: "lalalalalaaaaa" },
                { link: "sample/sample.jpg", caption: "lalalalalaaaaa" },
                { link: "sample/sample2.jpg", caption: "lalalalalaaaaa" },
                { link: "sample/sample3.jpg", caption: "lalalalalaaaaa" },
                { link: "sample/sample.jpg", caption: "lalalalalaaaaa" },
                { link: "sample/sample2.jpg", caption: "lalalalalaaaaa" },
                { link: "sample/sample3.jpg", caption: "lalalalalaaaaa" },
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
        class="absolute inset-y-0 left-0 hidden xl:flex flex-col justify-start items-start w-fit p-6 space-y-6 bg-neutral-900"
    >
        <div class="flex flex-row justify-center items-center mt-8 xl:mt-6">
            <img src="demo-logo.png" alt="Pixel Share" class="h-12 w-12" />
            <p class="ml-4 font-semibold text-2xl text-sky-300">PixelShare</p>
        </div>
        <hr class="h-px w-full my-8 bg-zinc-800 border-0 dark:bg-neutral-700" />
        <nav class="w-full grow flex flex-col justify-center">
            {#each sidebarItems as item}
                <button
                    class="w-full flex items-center p-4 hover:bg-neutral-800 rounded"
                >
                    <!-- <img
                        class="object-cover w-8 h-8"
                        alt="icon"
                        src={item.icon}
                    /> -->
                    <FaIcon icon={item.icon} className="object-cover w-6 h-6" />

                    <span class="ml-3">{item.name}</span>
                </button>
            {/each}
        </nav>
        <div class="w-full flex flex-col">
            <button
                class="w-full flex items-center p-4 hover:bg-neutral-800 rounded"
            >
                <!-- <img
                    class="object-cover w-8 h-8 rounded-full border border-teal-500"
                    alt="icon"
                    src="icons/profile.png"
                /> -->
                <FaIcon
                    icon={Icon.CIRCLE_USER}
                    className="object-cover w-6 h-6 rounded-full border border-teal-500"
                />
                <span class="ml-3">Profile</span>
            </button>
            <button class="flex items-center p-4 hover:bg-neutral-800 rounded">
                <!-- <img
                    class="object-cover w-8 h-8"
                    alt="icon"
                    src="icons/logout.png"
                /> -->
                <FaIcon
                    icon={Icon.ARROW_RIGHT_FROM_BRACKET}
                    className="object-cover w-6 h-6"
                    fill="#ef4444"
                />
                <span class="ml-3 font-medium text-red-500">Log out</span>
            </button>
        </div>
    </div>

    <!-- Main Content -->
    <div class="flex-1 xl:px-64 px-4 py-8 overflow-y-auto">
        {#each mainContentItems as section}
            <div class="p-4 xl:p-10">
                <h2 class="text-xl font-bold mb-3">{section.title}</h2>
                <div class="flex flex-row flex-wrap gap-x-2 gap-y-4">
                    {#each section.images as image}
                        <div class="relative h-24 xl:h-48">
                            <img
                                src={image.link}
                                alt="Random"
                                class="object-contain w-full h-full rounded-lg border border-zinc-500"
                            />
                        </div>
                    {/each}
                </div>
            </div>
        {/each}
    </div>

    <!-- Right Sidebar -->
    <div
        class="absolute inset-y-0 right-0 hidden xl:block h-full w-64 p-4 space-y-6 bg-neutral-900"
    >
        <div class="">
            <img src={userDetails.avatarUrl} alt="risenfromashes" />
        </div>

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
