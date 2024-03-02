<script lang="ts">
	// @ts-nocheck

	import { onMount } from "svelte";
	import { writable } from "svelte/store";
	export let data;
	console.log(data);
</script>

<!-- Main Content -->
<div class="flex-1 xl:px-12 p-4 overflow-y-auto">
	<div class="p-4 rounded-lg text-black">
		{#if data.images.length <= 0}
			<div class="text-center">Nothing to show.</div>
		{:else}
			<!--Posts -->
			<div class="bg-orange-300 p-4 rounded-lg shadow-lg">
				{#each data.images as image}
					<div
						class="p-3 rounded-lg bg-orange-100 flex items-center justify-between mb-2"
					>
						<form
							class="request-item flex items-center bg-black-100 border-2 border-orange-200 p-4 rounded-lg shadow-lg hover:bg-orange-200 transition-colors duration-200 ease-in-out"
							method="POST"
							on:submit
							enctype="multipart/form-data"
						>
							<div class="mb-8">
								<div class="flex items-center mb-4">
									<!-- Image navigation and tags here, apply text and hover classes as needed -->
									<div class="flex mb-4 items-center">
										<img
											src={image.url}
											name="url"
											alt="no pics"
											class="rounded-lg"
										/>
									</div>
								</div>
								<input
									type="hidden"
									name="post_id"
									bind:value={image.post_id}
								/>
								<input
									type="hidden"
									name="url"
									bind:value={image.url}
								/>

								<div class="flex justify-center gap-4">
									<!-- svelte-ignore missing-declaration -->
									<button
										type="submit"
										on:click={(event) =>
											handleAction(event, true)}
										class="px-4 py-2 bg-orange-400 text-white font-bold rounded-lg hover:bg-green-600 hover:text-gray-700"
										>Delete</button
									>
								</div>
								<div
									class="flex justify-center font-bold text-orange-500 gap-4"
								>
									<!-- svelte-ignore missing-declaration -->
									<a
										class="w-full flex items-center py-4 px-4 hover:bg-range-300 rounded"
										href={`/groups/${data.group_id}/posts/${image.image_id}/edittags`}
										>Edit Tags</a
									>
								</div>
							</div>
						</form>
					</div>
				{/each}
			</div>
		{/if}
	</div>
</div>
