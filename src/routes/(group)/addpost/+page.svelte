<script>
	// @ts-nocheck

	// Placeholder data for sidebar and main content items
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

	import { createEventDispatcher } from "svelte";
	import { writable } from "svelte/store";

	const dispatch = createEventDispatcher();
	const selectedImages = writable([]);
	const tags = writable([]);
	const caption = writable("");
	const location = writable("");
	const recommendedTags = ["ECE Catto", "Central Catto"]; // Example recommended tags

	function triggerFileSelect() {
		const fileInput = document.getElementById("file-input");
		fileInput.click();
	}

	function handleFileChange(event) {
		const files = Array.from(event.target.files);
		if (files.length) {
			const newImageUrls = files.map((file) => ({
				id: URL.createObjectURL(file),
				file,
			}));
			selectedImages.update((currentImages) => [
				...currentImages,
				...newImageUrls,
			]);
		}
	}

	function removeSelectedImage(imageId) {
		selectedImages.update((currentImages) =>
			currentImages.filter((image) => image.id !== imageId),
		);
		URL.revokeObjectURL(imageId); // Free up memory by revoking object URL
	}

	function addTag(event) {
		const tag = event.target.value;
		if (tag) {
			tags.update((currentTags) => {
				if (currentTags.includes(tag)) {
					return currentTags;
				}
				return [...currentTags, tag];
			});
			event.target.value = ""; // Clear input after adding a tag
		}
	}

	function addRecommendedTag(tag) {
		tags.update((currentTags) => {
			if (!currentTags.includes(tag)) {
				return [...currentTags, tag];
			}
			return currentTags;
		});
	}

	function removeTag(removedTag) {
		tags.update((currentTags) =>
			currentTags.filter((tag) => tag !== removedTag),
		);
	}

	function reviewPost() {
		// Placeholder for review functionality
		alert("Review your post!"); // This would trigger a review modal or similar feature
	}

	function post() {
		// Post the images, tags, and caption to the server
		// This is where you would integrate your API call
		alert("Post submitted!"); // Placeholder for actual post submission
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
			class="upload-section bg-zinc-800 p-4 rounded-lg shadow-lg text-white"
		>
			<div class="flex flex-col space-y-4">
				<!-- Image selection -->
				<input
					type="file"
					id="file-input"
					accept="image/*"
					multiple
					on:change={handleFileChange}
					hidden
				/>
				<label for="file-input" class="btn cursor-pointer">
					<!-- svelte-ignore a11y-missing-attribute -->
					<img src="icons/add-image.png" class="inline-block mr-2" /> Select
					Photos
				</label>

				<!-- Image previews -->
				<div class="image-previews grid grid-cols-3 gap-4">
					{#each $selectedImages as image (image.id)}
						<div
							class="relative image-preview rounded-lg overflow-hidden"
						>
							<!-- svelte-ignore a11y-img-redundant-alt -->
							<img
								src={image.id}
								alt="Selected Image"
								class="object-cover w-full h-32"
							/>
							<button
								class="absolute top-0 right-0 bg-gray-800 bg-opacity-75 hover:bg-opacity-50 text-white p-1 rounded-bl-lg"
								on:click={() => removeSelectedImage(image.id)}
							>
								&times;
							</button>
						</div>
					{/each}
				</div>

				<!-- Caption input -->
				<input
					type="text"
					bind:value={$caption}
					placeholder="Write Something"
					class="input"
				/>
				<input
					type="text"
					bind:value={$location}
					placeholder="Add Location"
					class="input"
				/>

				<!-- Tag selection, recommended tags and display -->
				<div class="tag-input">
					<input
						type="text"
						placeholder="Recommended Tags"
						class="input"
					/>

					{#if $selectedImages.length > 0}
						<div class="recommended-tags flex gap-2 mt-2">
							{#each recommendedTags as tag}
								<button
									on:click={() => addRecommendedTag(tag)}
									class="btn">{tag}</button
								>
							{/each}
						</div>
					{/if}
					<input
						type="text"
						on:keydown={(event) =>
							event.key === "Enter" && addTag(event)}
						placeholder="Add Tag"
						class="input"
					/>
					<div class="tags flex flex-wrap gap-2 mt-2">
						{#each $tags as tag}
							<span class="tag bg-gray-700 rounded px-2 py-1">
								{tag}
								<button
									on:click={() => removeTag(tag)}
									class="ml-1 text-gray-300 hover:text-white"
									>&times;</button
								>
							</span>
						{/each}
					</div>
				</div>

				<!-- Post button -->
				<button
					on:click={post}
					class="btn bg-blue-500 hover:bg-blue-600">Post</button
				>
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
	.image-preview:hover {
		opacity: 0.8; /* Make image slightly translucent on hover */
		cursor: pointer; /* Change cursor to indicate the image can be interacted with */
	}

	.image-preview:hover button {
		display: block; /* Show the remove button on hover */
	}
	.btn {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		padding: 0.5rem 1rem;
		border: none;
		background-color: #374151;
		color: white;
		border-radius: 0.25rem;
		cursor: pointer;
		transition: background-color 0.2s;
	}

	.btn:hover {
		background-color: #4b5563;
	}

	.input {
		width: 100%;
		padding: 0.5rem;
		background-color: #1f2937;
		border: 1px solid #374151;
		border-radius: 0.25rem;
		color: white;
	}

	.input:focus {
		outline: 2px solid #2563eb;
		outline-offset: 2px;
	}

	.image-preview {
		border: 1px dashed #374151;
		border-radius: 0.25rem;
		padding: 0.5rem;
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
