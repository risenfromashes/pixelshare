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

	let adminMembers = [
		{
			id: 1,
			name: "Admin 1",
			commonGroups: 5,
			profilePicture: "./icons/profile.png",
		},
		{
			id: 2,
			name: "Admin 2",
			commonGroups: 3,
			profilePicture: "./icons/profile.png",
		},
		// Add more admin members here
	];

	let currentMembers = [
		{
			id: 3,
			name: "Faria Moushee",
			commonGroups: 3,
			profilePicture: "./icons/profile.png",
		},
		{
			id: 4,
			name: "Ashrafur Rahman",
			commonGroups: 0,
			profilePicture: "/icons/profile.png",
		},
		// Add more current members here
	];

	let myProfile = {
		id: 0, // You can set your own unique ID
		name: "Your Name",
		commonGroups: 0, // You can set the number of common groups accordingly
		profilePicture: "./icons/profile.png", // Replace with the actual path to your profile picture
	};
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

			<h2 class="text-xl font-bold mb-2">My Profile</h2>
			<div
				class="member-request-item p-3 rounded-lg bg-orange-200 flex items-center justify-between mb-2"
			>
				<div class="flex items-center">
					<img
						src={myProfile.profilePicture}
						alt="Profile Picture"
						class="rounded-full w-10 h-10 mr-3"
					/>
					<div>
						<div class="font-semibold">{myProfile.name}</div>
						<div class="text-sm text-gray-400">
							{myProfile.commonGroups} common groups
						</div>
					</div>
				</div>
				<div>
					<!-- You can add any actions or options related to your profile here -->
				</div>
			</div>

			<h2 class="text-xl font-bold mb-2">Admin Members</h2>
			{#each adminMembers as admin (admin.id)}
				<div
					class="member-request-item p-3 rounded-lg bg-orange-200 flex items-center justify-between mb-2"
				>
					<div class="flex items-center">
						<img
							src={admin.profilePicture}
							alt="Profile Picture"
							class="rounded-full w-10 h-10 mr-3"
						/>
						<div>
							<div class="font-semibold">{admin.name}</div>
							<div class="text-sm text-gray-400">
								{admin.commonGroups} common groups
							</div>
						</div>
					</div>
					<div>
						<!-- You can add any actions or options related to admin members here -->
					</div>
				</div>
			{/each}

			<h2 class="text-xl font-bold mb-2">Current Members</h2>
			{#each currentMembers as member (member.id)}
				<div
					class="member-request-item p-3 rounded-lg bg-orange-200 flex items-center justify-between mb-2"
				>
					<div class="flex items-center">
						<img
							src={member.profilePicture}
							alt="Profile Picture"
							class="rounded-full w-10 h-10 mr-3"
						/>
						<div>
							<div class="font-semibold">{member.name}</div>
							<div class="text-sm text-gray-400">
								{member.commonGroups} common groups
							</div>
						</div>
					</div>
					<div>
						<!-- You can add any actions or options related to current members here -->
					</div>
				</div>
			{/each}
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
