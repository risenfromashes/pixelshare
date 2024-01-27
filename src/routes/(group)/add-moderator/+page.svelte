<script>
	import { onMount } from "svelte";
	const sidebarItems = [
		{ name: "Home", icon: "icons/home.png" },
		{ name: "Search", icon: "icons/search.png" },
		{ name: "Notifications", icon: "icons/notification.png" },
		{ name: "Settings", icon: "icons/settings.png" },
	];
	const rightSidebarItems = {
		groups: ["BUET", "CSE '19", "PixelShare Devs"],
		friends: ["Faria Binte Awal", "Some Random Guy", "Md. Riyasat Hossain"],
	};
	let groupInfo = {
		name: "Central BUET",
		coverImage: "./icons/group-image.jpg", // Replace with the actual path to your cover image
		bio: "Welcome to Central_BUET, the heart where echoes of laughter, shared dreams, and the spirit of camaraderie reverberate through the corridors of time. This is not just a group; it is a sanctuary of memories, a sacred space where we gather to relive the golden hours we once shared.", // Replace with the actual bio of the group
	};

	let suggestedModerators = [
		{
			id: 5,
			name: "Suggested Moderator 1",
			commonGroups: 2,
			profilePicture: "./icons/profile.png",
		},
		{
			id: 6,
			name: "Suggested Moderator 2",
			commonGroups: 4,
			profilePicture: "./icons/profile.png",
		},
		// Add more suggested moderators here
	];
</script>

<style>
	/* Add this CSS to hide the scrollbar */
	.scroll-hidden::-webkit-scrollbar {
		width: 0;
		background: transparent;
	}

	.scroll-hidden {
		-ms-overflow-style: none; /* IE and Edge */
		scrollbar-width: none; /* Firefox */
	}
</style>

<div class="flex relative h-screen bg-zinc-950 text-black">
	<!-- Left Sidebar -->
	<div
        class="absolute inset-y-0 left-0 hidden xl:flex flex-col justify-start items-start w-fit p-6 space-y-6 bg-orange-100 border border-orange-200 shadow-lg scroll-hidden"
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
	<div class="flex-1 xl:px-64 px-4 py-8 overflow-y-auto bg-orange-50 scroll-hidden">
		<div class="overflow-y-auto">
			<div class="text-center py-4">
				<h1 class="text-2xl font-bold mb-2">{groupInfo.name}</h1>
			</div>
			<img
				src={groupInfo.coverImage}
				alt="Group Cover"
				class="mb-2 rounded-lg w-full h-60 object-cover"
			/>
			<div class="text-center py-4">
				<p class="mb-4">{groupInfo.bio}</p>
			</div>

			<h2 class="text-xl font-bold mb-2">Add Moderator</h2>
			<hr class="h-px w-full my-4 bg-zinc-800 border-0 dark:bg-zinc-700" />

			<h2 class="text-xl font-bold mb-2">Suggested Moderators</h2>
{#each suggestedModerators as moderator (moderator.id)}
    <div class="member-request-item p-3 rounded-lg bg-orange-200 flex items-center justify-between mb-2">
        <div class="flex items-center">
            <img
                src={moderator.profilePicture}
                alt="Profile Picture"
                class="rounded-full w-10 h-10 mr-3"
            />
            <div>
                <div class="font-semibold">{moderator.name}</div>
                <div class="text-sm text-gray-400">
                    {moderator.commonGroups} common groups
                </div>
            </div>
        </div>
        <div>
            <button class="px-4 py-2 bg-orange-400 text-white rounded hover:bg-orange-500">
                Send Request
            </button>
        </div>
    </div>
{/each}


			<!-- <h2 class="text-xl font-bold mb-2">Resign from Moderation</h2> -->
            <hr class="h-px w-full my-4 bg-zinc-800 border-0 dark:bg-zinc-700" />
        <div class="text-right">
            <button class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
                Resign from Moderation
    </button>
</div>

		</div>
	</div>
</div>

<!-- Right Sidebar -->
<div
class="absolute inset-y-0 right-0 hidden xl:block h-screen w-64 p-4 space-y-6 bg-orange-100 border border-orange-200 shadow-lg scroll-hidden"
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
<slot />
