<script lang="ts">
	import { enhance } from "$app/forms";
	import { writable } from "svelte/store";
	export let data;

	let work_1: string = "add";
	let work_2: string = "remove";
	let searchQuery = "";
	let filteredTags: any[] = [];
	let filteredTagsNotIn: any[] = []; // Array for tags not in the image
	let imageTags = new Set(); // Assuming you have a way to load initial tags for the image

	// Add a tag to the image
	function addTag(tagName: string) {
		imageTags.add(tagName);
		// Update the reactive variable to trigger UI changes
		imageTags = new Set(imageTags);
	}

	// Remove a tag from the image
	function removeTag(tagName: string) {
		imageTags.delete(tagName);
		// Update the reactive variable to trigger UI changes
		imageTags = new Set(imageTags);
	}

	// Update filteredTags based on the searchQuery, for tags currently in the image
	$: filteredTags =
		searchQuery.trim().length > 0
			? data.tags.filter((tag: { tagName: string; [key: string]: any }) =>
					tag.tagName
						.toLowerCase()
						.includes(searchQuery.toLowerCase()),
				)
			: [];

	// Similarly, filter tags not in the image
	$: filteredTagsNotIn =
		searchQuery.trim().length > 0
			? data.tags_not_in.filter(
					(tag: { tagName: string; [key: string]: any }) =>
						tag.tagName
							.toLowerCase()
							.includes(searchQuery.toLowerCase()),
				)
			: [];
</script>

<div class="flex">
	<!-- Image display section -->
	<div class="flex-1 xl:px-12 p-4 overflow-y-auto">
		<div class="p-4 rounded-lg text-black">
			<div class="bg-orange-200 p-4 rounded-lg shadow-lg">
				<p>Edit tags for the following picture!</p>
				<div class="mb-8">
					<div class="flex items-center mb-4">
						<div class="flex mb-4 items-center">
							<img
								src={data.image_url}
								alt="no pics"
								class="rounded-lg"
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>

	<!-- Tag search and management section -->
	<div class="flex-1">
		<input
			type="text"
			placeholder="Search tags..."
			class="mt-4 mb-2 px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
			bind:value={searchQuery}
		/>
		<!-- Display tags currently associated with the image -->
		{#if filteredTags.length > 0 && searchQuery.trim().length > 0}
			<ul class="max-h-60 overflow-auto">
				{#each filteredTags as { tagName, tagId }}
					<li
						class="py-2 px-4 hover:bg-orange-100 bg-gray-100 cursor-pointer font-bold flex justify-between items-center"
					>
						<form
							class="request-item flex items-center bg-black-100 border-2 border-orange-200 p-4 rounded-lg shadow-lg hover:bg-orange-200 transition-colors duration-200 ease-in-out"
							method="POST"
							use:enhance
						>
							<input
								type="hidden"
								name="tagId"
								bind:value={tagId}
							/>
							<input
								type="hidden"
								name="what"
								bind:value={work_2}
							/>
							{tagName}
							<button
								type="submit"
								class="ml-2 px-4 py-1 bg-red-500 text-white font-bold rounded-md"
							>
								Remove
							</button>
						</form>
					</li>
				{/each}
			</ul>
		{/if}
		<!-- Display tags not currently associated with the image -->
		{#if filteredTagsNotIn.length > 0 && searchQuery.trim().length > 0}
			<ul class="max-h-60 overflow-auto">
				{#each filteredTagsNotIn as { tagName, tagId }}
					<li
						class="py-2 px-4 hover:bg-orange-100 bg-gray-100 cursor-pointer font-bold flex justify-between items-center"
					>
						<form
							class="request-item flex items-center bg-black-100 border-2 border-orange-200 p-4 rounded-lg shadow-lg hover:bg-orange-200 transition-colors duration-200 ease-in-out"
							method="POST"
							use:enhance
						>
							<input
								type="hidden"
								name="tagId"
								bind:value={tagId}
							/>
							<input
								type="hidden"
								name="what"
								bind:value={work_1}
							/>
							{tagName}
							<button
								type="submit"
								class="ml-2 px-4 py-1 bg-green-500 text-white font-bold rounded-md"
							>
								Add
							</button>
						</form>
					</li>
				{/each}
			</ul>
		{/if}
	</div>
</div>
