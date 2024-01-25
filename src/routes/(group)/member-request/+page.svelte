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

	let memberRequests = [
		{
			id: 1,
			name: "Faria Moushee",
			commonGroups: 3,
			profilePicture: "./icons/profile.png",
			approved: false,
		},
		{
			id: 2,
			name: "Ashrafur Rahman",
			commonGroups: 0,
			profilePicture: "/icons/profile.png",
			approved: false,
		},
		// Add more member request objects here
	];

	function approveRequest(requestId) {
		// Here you would typically make an API call to update the approval status
		memberRequests = memberRequests.map((request) => {
			if (request.id === requestId) {
				return { ...request, approved: true };
			}
			return request;
		});
	}

	function rejectRequest(requestId) {
		// Here you would typically make an API call to update the approval status
		memberRequests = memberRequests.filter(
			(request) => request.id !== requestId,
		);
	}

	function approveAll() {
		// Approve all member requests
		// Replace with an API call if necessary
		memberRequests = memberRequests.map((request) => ({
			...request,
			approved: true,
		}));
	}

	function rejectAll() {
		// Reject all member requests
		// Replace with an API call if necessary
		memberRequests = [];
	}
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
		<div
			class="group-info-panel bg-zinc-800 p-4 rounded-lg shadow-lg text-white overflow-hidden"
		>
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

			<h2 class="text-xl font-bold mb-2">Member Requests</h2>
			<div class="flex justify-end space-x-2 mb-4">
				<button class="btn" on:click={approveAll}>Approve All</button>
				<button class="btn" on:click={rejectAll}>Reject All</button>
			</div>
			{#each memberRequests as request (request.id)}
				<div
					class="member-request-item p-3 rounded-lg bg-zinc-700 flex items-center justify-between mb-2"
				>
					<div class="flex items-center">
						<!-- svelte-ignore a11y-img-redundant-alt -->
						<img
							src={request.profilePicture}
							alt="Profile Picture"
							class="rounded-full w-10 h-10 mr-3"
						/>
						<div>
							<div class="font-semibold">{request.name}</div>
							<div class="text-sm text-gray-400">
								{request.commonGroups} common groups
							</div>
						</div>
					</div>
					<div>
						<button
							class="btn mr-2"
							on:click={() => approveRequest(request.id)}
							>Approve</button
						>
						<button
							class="btn"
							on:click={() => rejectRequest(request.id)}
							>Reject</button
						>
					</div>
				</div>
			{/each}
		</div>
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
<slot />

<style>
	.btn {
		padding: 0.5rem 1rem;
		background-color: #374151;
		color: white;
		border-radius: 0.25rem;
		border: none;
		cursor: pointer;
		transition: background-color 0.2s;
	}

	.btn:hover {
		background-color: #4b5563;
	}

	.member-request-item {
		transition: background-color 0.2s;
	}

	.member-request-item:hover {
		background-color: #4b5563;
	}
</style>
