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

<div class="flex relative h-screen bg-orange-50 text-black">
	<!-- Main Content -->
	<div class="flex-1 xl:px-12 p-4 overflow-y-auto">
		<div class="requests-panel p-4 rounded-lg text-black">
			<!-- Group Name -->
			<h1 class="text-3xl font-bold text-center mb-8">Member Requests</h1>
			<div class="flex flex-col space-y-4">
				{#if data.error}
					<div
						class="block w-full font-bold px-4 py-3 bg-red-100 rounded text-left text-xs text-red-500 mb-4"
					>
						<p class="text-center">Error: {data.error}</p>
					</div>
				{:else if !data.requests || data.requests.length === 0}
					<p class="text-center">No member requests yet.</p>
				{:else}
					{#if success}
						<div
							class="block w-full font-bold px-4 py-3 bg-green-100 rounded text-left text-xs text-green-500 mb-4"
						>
							<p>Member has been added successfully!</p>
						</div>
					{/if}
					{#each data.requests as request}
						<form
							class="request-item flex items-center bg-black-100 border-2 border-orange-200 p-4 rounded-lg shadow-lg hover:bg-orange-200 transition-colors duration-200 ease-in-out"
							method="POST"
							on:submit
							enctype="multipart/form-data"
							use:enhance={({ formElement, cancel }) => {
								success = false;
								return async ({ result }) => {
									if (result.type === "success") {
										success = true;
										formElement.reset();
										invalidateAll();
									}
								};
							}}
						>
							<!-- Member Picture -->
							<div class="w-24 h-24 mr-4">
								<img
									src={request.profileImg}
									alt={request.username}
									class="object-cover w-full h-full rounded-md"
								/>
							</div>
							<!-- Member Details and Actions -->
							<div
								class="flex-1 flex justify-between items-center"
							>
								<div>
									<h3 class="text-lg font-bold">
										<input
											type="hidden"
											name="username"
											bind:value={request.username}
										/>
										{request.username}
									</h3>
								</div>
								<div>
									<input
										type="hidden"
										name="action"
										bind:value={isApproved}
									/>
									<button
										type="submit"
										on:click={(event) =>
											handleAction(event, true)}
										class="px-4 py-2 mr-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
									>
										Approve</button
									>

									<button
										type="submit"
										on:click={(event) =>
											handleAction(event, false)}
										class="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
									>
										Reject</button
									>
								</div>
							</div>
						</form>
					{/each}
				{/if}
			</div>
		</div>
	</div>
</div>
