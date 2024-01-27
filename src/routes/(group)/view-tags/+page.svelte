<script>
	import { goto } from "$app/navigation";

	// Mock data for tags, replace with your actual data
	const tagSections = [
		{
			category: "Location",
			tags: [
				{
					name: "Cafeteria",
					imageUrl: "../../../../../icons/bird-post-sample.jpg",
				},
				{
					name: "Civil Stairs",
					imageUrl: "../../../../../icons/bird-post-sample.jpg",
				},
				{
					name: "Walking Area",
					imageUrl: "../../../../../icons/bird-post-sample.jpg",
				},
				{
					name: "Rag Wall",
					imageUrl: "../../../../../icons/bird-post-sample.jpg",
				},
				{
					name: "Central Catto",
					imageUrl: "../../../../../icons/bird-post-sample.jpg",
				},
				{
					name: "Registrar Building",
					imageUrl: "../../../../../icons/bird-post-sample.jpg",
				},
			],
		},
		{
			category: "Event",
			tags: [
				{
					name: "Cultural Night",
					imageUrl: "../../../../../icons/bird-post-sample.jpg",
				},
				{
					name: "Flash Mob",
					imageUrl: "../../../../../icons/bird-post-sample.jpg",
				},
				{
					name: "Treasure Hunt",
					imageUrl: "../../../../../icons/bird-post-sample.jpg",
				},
			],
		},
		// Add more categories and tags as needed
	];

	function navigateToAddTag() {
		// Replace '/add-tag' with the actual route you have for adding tags
		//goto("/add-tag");
	}
</script>

<div class="flex relative h-screen bg-orange-50 text-black">
	<!-- Main Content -->
	<div class="flex-1 xl:px-64 p-4 overflow-y-auto">
		<div class="flex flex-col p-4 space-y-4">
			<h1 class="text-2xl font-bold text-black-800 text-center">
				Central_BUET Tags
			</h1>
			{#each tagSections as section}
				<div>
					<div class="flex items-center justify-between">
						<h2 class="text-xl font-bold text-black">
							{section.category}
						</h2>
						<button
							class="p-1.5 rounded-full bg-gray-200 text-black hover:bg-gray-300"
							aria-label="Add new tag"
							on:click={navigateToAddTag}
						>
							<span class="text-2xl">+</span>
						</button>
					</div>
					<div
						class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mt-2"
					>
						{#each section.tags as tag}
							<div
								class="bg-orange-50 rounded-lg overflow-hidden shadow-md"
							>
								<img
									src={tag.imageUrl}
									alt={tag.name}
									class="w-full h-32 object-cover border-spacing-4"
								/>
								<div class="p-2 font-bold text-center text-sm">
									{tag.name}
								</div>
							</div>
						{/each}
					</div>
				</div>
			{/each}
		</div>
	</div>
</div>
