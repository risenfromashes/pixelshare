<script lang="ts">
	import { goto, invalidateAll, onNavigate } from "$app/navigation";
	import { enhance } from "$app/forms";
	export let data; // Assume this now contains member requests data including pictures, names, and request IDs
	let isApproved: Boolean = false;
	let success = false;

	// Function to toggle isApproved and submit the form
	function handleAction(event, approvalStatus) {
		isApproved = approvalStatus;
		// Optionally, do something with isApproved here or submit form data using fetch API
		// If submitting via fetch API, you might preventDefault and manually handle the form submission
	}

	onNavigate(() => {
		success = false;
	});
</script>

<div class="requests-panel p-4 rounded-lg bg-orange-200">
	<!-- Group Name -->
	<h1 class="text-3xl font-bold text-center mb-8">Current Members</h1>
	<div class="flex flex-col space-y-4">
		{#if data.error}
			<div
				class="w-full font-bold px-4 py-3 bg-orange-100 rounded text-xs text-red-500 mb-4"
			>
				<p class="text-center">Error: {data.error}</p>
			</div>
		{:else if !data.members || data.members.length === 0}
			<p class="text-center">No member requests yet.</p>
		{:else}
			{#if success}
				<div
					class="w-full font-bold px-4 py-3 bg-green-100 rounded text-xs text-green-500 mb-4"
				>
					<p>Member has been added successfully!</p>
				</div>
			{/if}
			<div class="grid grid-cols-2 gap-4">
				{#each data.members as member}
					<div
						class="flex items-center space-x-4 bg-gray-50 p-4 rounded-lg border border-orange-400 shadow-md hover:bg-orange-100"
					>
						<!-- Member Picture -->
						<img
							src={member.profile_img}
							alt={member.username}
							class="w-24 h-24 rounded-md object-cover"
						/>
						<!-- Member Details -->
						<div>
							<h3 class="text-lg font-bold">{member.username}</h3>
							<!-- Add more details here -->
						</div>
					</div>
				{/each}
			</div>
		{/if}
	</div>
</div>
