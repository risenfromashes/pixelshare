<script lang="ts">
	export let data; // Assume this now contains tags data including images, titles, descriptions, creation dates, and admin names
	console.log(data);
</script>

<!-- Group Name -->
<!-- {#each mainContentItems as section} -->
<div class="p-4 xl:p-10">
	<div class="flex justify-between items-center">
		<!-- Left side content -->
		<h2 class="text-xl font-bold mb-3">Detailed View of Group Tags</h2>
		<!-- Right side content -->
	</div>
	<div class="flex flex-row flex-wrap gap-x-2 gap-y-4">
		{#if data.error}
			<div
				class="block w-full font-bold px-4 py-3 bg-red-100 rounded text-left text-xs text-red-500 mb-4"
			>
				<p class="text-center">Error: {data.error}</p>
			</div>
		{:else if !data.tags || data.tags.length === 0}
			<p class="text-center">No tags yet.</p>
		{:else}
			{#each data.tags as tag (tag.id)}
				<div
					class="tag-item flex items-center bg-orange-100 border-2 border-orange-200 p-4 rounded-lg shadow-lg hover:bg-gray-50 transition-colors duration-200 ease-in-out"
				>
					<!-- Tag Image -->
					<div class="w-24 h-24 mr-4">
						<img
							src={tag.tagImage}
							alt={tag.tagName}
							class="object-cover w-full h-full rounded-md"
						/>
					</div>
					<!-- Tag Details -->
					<div class="flex-1">
						<h3 class="text-lg font-bold">{tag.tagName}</h3>
						<p>{tag.description}</p>
						<div
							class="flex justify-between items-center text-sm mt-2"
						>
							<time
								>{new Date(
									tag.createdAt,
								).toLocaleDateString()}</time
							>
							<span
								>Created by: <div class="font-bold">
									{tag.createdBy}
								</div></span
							>
						</div>
					</div>
				</div>
			{/each}
		{/if}
	</div>
</div>
