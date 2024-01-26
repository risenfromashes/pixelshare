<script>
	// @ts-nocheck

	import { onMount } from "svelte";
	import { writable } from "svelte/store";
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

	let currentImageIndex = writable(0);

	let postRequests = writable([
		{
			id: 1,
			created_by: "johora_ava",
			title: "Divine Exploration",
			caption:
				"In the embrace of the velvety night, our feline friend becomes a celestial guardian, adorned with the mystery of moonlit plants.",
			images: [
				"/icons/bird-post-sample.jpg",
				"/icons/kashmir.jpg",
				"/icons/kashmir3.jpg",
			],
			tags: ["Kashmir", "Bangladesh", "Sanfish_bird"],
			location: "Dhaka, Bangladesh",
			date: "2024-01-25",
			removedTags: [],
			currentImageIndex: 0,
		},
		// Add more post request objects here
	]);

	function removeTag(post, tag) {
		post.tags = post.tags.filter((t) => t !== tag);
		post.removedTags.push(tag);
		postRequests.update((posts) => [...posts]);
	}

	function revertTag(post, tag) {
		post.removedTags = post.removedTags.filter((t) => t !== tag);
		post.tags.push(tag);
		postRequests.update((posts) => [...posts]);
	}

	function nextImage(post) {
		if (post.currentImageIndex < post.images.length - 1) {
			post.currentImageIndex += 1;
			postRequests.update((posts) => [...posts]);
		}
	}

	function previousImage(post) {
		if (post.currentImageIndex > 0) {
			post.currentImageIndex -= 1;
			postRequests.update((posts) => [...posts]);
		}
	}

	function approvePost(postId) {
		console.log("Approve", postId);
		// Here you would make an API call to approve the post
	}

	function rejectPost(postId) {
		console.log("Reject", postId);
		// Here you would make an API call to reject the post
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

			<!-- Post Requests -->
			<div
				class="request-management-panel bg-zinc-800 p-4 rounded-lg shadow-lg text-white"
			>
				{#each $postRequests as post (post.id)}
					<div
						class="member-request-item p-3 rounded-lg bg-zinc-900 pt-16 flex items-center justify-between mb-2"
					>
						<div class="flex items-center">
							<div class="mb-8">
								<p class="mb-4">
									User '{post.created_by}' has added a post
									with the following tags and images on dated {post.date}.
								</p>
								<h1 class="text-xl font-bold mb-2">
									{post.title}
								</h1>
								<p class="mb-4">{post.caption}</p>
								<div class="flex mb-4 items-center">
									{#if post.images.length > 1}
										<button
											class="btn"
											on:click={() => previousImage(post)}
											>&lt;</button
										>
									{/if}
									<img
										src={post.images[
											post.currentImageIndex
										]}
										alt={`Image ${
											post.currentImageIndex + 1
										} from ${post.created_by}`}
										class="rounded-lg"
									/>
									{#if post.images.length > 1}
										<button
											class="btn"
											on:click={() => nextImage(post)}
											>&gt;</button
										>
									{/if}
								</div>
								<div class="tags flex flex-wrap gap-2 mb-4">
									{#each post.tags as tag, index}
										<span
											class="tag bg-gray-700 rounded px-2 py-1"
										>
											{tag}
											<button
												on:click={() =>
													removeTag(post, tag)}
												class="ml-1 text-gray-300 hover:text-white"
												>&times;</button
											>
										</span>
									{/each}
									{#each post.removedTags as tag, index}
										<span
											class="tag bg-gray-500 rounded px-2 py-1"
										>
											{tag}
											<button
												on:click={() =>
													revertTag(post, tag)}
												class="ml-1 text-gray-300 hover:text-white"
												>&#8634;</button
											>
										</span>
									{/each}
								</div>
								<div class="flex justify-center gap-4">
									<button
										on:click={() => approvePost(post.id)}
										class="btn bg-green-500 hover:bg-green-600"
										>Approve</button
									>
									<button
										on:click={() => rejectPost(post.id)}
										class="btn bg-red-500 hover:bg-red-600"
										>Reject</button
									>
								</div>
							</div>
						</div>
					</div>
				{/each}
			</div>
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
		opacity: 0.9;
	}
</style>
