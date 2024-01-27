<script>
	// @ts-nocheck

	import { writable } from "svelte/store";
	const tagImg = writable("");

	function handleFileChange(type, event) {
		const file = event.target.files[0];
		if (file) {
			const imageUrl = URL.createObjectURL(file);
			tagImg.set(imageUrl);
		}
	}

	async function post() {
		alert("Form submitted!"); // Placeholder for actual post submission
	}
</script>

<div
	class="flex flex-col items-center justify-center min-h-screen bg-orange-50 text-gray-900 p-4"
>
	<div class="space-y-4 w-full max-w-4xl">
		<!-- Image selection for Cover and Profile Image -->
		<div class="flex gap-4 justify-center items-end">
			<div class="flex-1">
				<label
					for="cover-file-input"
					class="cursor-pointer block text-center"
				>
					<div
						class="p-4 border-2 border-dashed border-gray-600 rounded-lg"
					>
						{#if $tagImg}
							<!-- svelte-ignore a11y-img-redundant-alt -->
							<img
								src={$tagImg}
								alt="Tag Image"
								class="rounded-lg mx-auto"
							/>
						{:else}
							<!-- svelte-ignore a11y-missing-attribute -->
							<img
								src="icons/add-image.png"
								class="mx-auto mb-2"
							/>
							<span class="font-bold"
								>Select a Pic for the tag</span
							>
						{/if}
					</div>
				</label>
				<input
					type="file"
					id="cover-file-input"
					accept="image/*"
					on:change={() => handleFileChange("cover", event)}
					hidden
				/>
			</div>
			<div class="flex-1">
				<input
					type="file"
					id="profile-file-input"
					accept="image/*"
					on:change={() => handleFileChange("profile", event)}
					hidden
				/>
			</div>
		</div>

		<!-- Group Name input -->
		<input
			type="text"
			placeholder="Enter Tag Name"
			class="w-full p-2 bg-orange-100 border border-white-300 rounded-md text-black font-bold"
		/>

		<!-- tag description input -->
		<textarea
			placeholder="Write a short description for the tag"
			class="w-full p-2 bg-orange-100 border border-white-300 rounded-md text-black font-bold"
		></textarea>

		<!-- Submit button -->
		<div class="text-center">
			<button
				on:click={post}
				class="px-4 py-2 bg-orange-200 hover:bg-orange-200 rounded-md font-bold"
				>Create Tag</button
			>
		</div>
	</div>
</div>
