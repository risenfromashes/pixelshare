<script lang="ts">
	// @ts-nocheck

	import { onMount } from "svelte";
	import { writable } from "svelte/store";
	export let data;
	console.log(data);
</script>

<!-- Main Content -->
<div class="flex-1 xl:px-12 p-4 overflow-y-auto bg-orange-50">
	<div class="p-4 rounded-lg text-black bg-orange-50">
		{#if data.images.length <= 0}
			<div class="text-center">Nothing to show.</div>
		{:else}
			<!--Posts -->
			<div class="bg-orange-50 p-4 ml-5 items-center justify-center  rounded-lg ">
				{#each data.images as image}
					<!-- <div
						class="w-1/2 p-3 rounded-lg bg-orange-100 flex items-center justify-between mb-4 mt-4"
					> -->
					<div class="w-1/2 p-3 rounded-lg bg-orange-50 flex items-center justify-between border-2 border-orange-200 shadow-lg mb-4 mt-4 ml-60">
						<div class="flex items-center justify-center w-full">
						
						<!-- </div> -->
					<!-- </div> -->
					
						<form
							class="request-item flex items-center bg-black-100  p-4 rounded-lg  hover:bg-orange-200 transition-colors duration-200 ease-in-out"
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

								<div class="flex justify-center items-center gap-4">
									<!-- svelte-ignore missing-declaration -->
										<!-- svelte-ignore missing-declaration -->
										<a
										class="flex items-center py-4 px-4 hover:bg-orange-300 rounded text-orange-500 font-semibold"
										href={`/groups/${data.group_id}/posts/${image.image_id}/edittags`}
									>Edit Tags</a>
									
									
									<button
										type="submit"
										class="px-4 py-2 bg-red-400 text-white font-bold rounded-lg hover:bg-red-600 hover:text-gray-700"
									>Delete</button>
								
								
								</div>
						</form>
					</div>
					</div>
				{/each}
				<!-- </div> -->
			</div>
		{/if}
	</div>
</div>
