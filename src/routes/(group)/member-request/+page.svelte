<script>
	import { onMount } from "svelte";
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

	let memberRequests = [
		{
			id: 1,
			name: "Faria Moushee",
			commonGroups: 3,
			profilePicture: "./icons/profile.png",
			approved: false,
		},
		{
			id: 2,
			name: "Ashrafur Rahman",
			commonGroups: 0,
			profilePicture: "/icons/profile.png",
			approved: false,
		},
		// Add more member request objects here
	];

	/**
	 * @param {number} requestId
	 */
	function approveRequest(requestId) {
		// Here you would typically make an API call to update the approval status
		memberRequests = memberRequests.map((request) => {
			if (request.id === requestId) {
				return { ...request, approved: true };
			}
			return request;
		});
	}

	/**
	 * @param {number} requestId
	 */
	function rejectRequest(requestId) {
		// Here you would typically make an API call to update the approval status
		memberRequests = memberRequests.filter(
			(request) => request.id !== requestId,
		);
	}

	function approveAll() {
		// Approve all member requests
		// Replace with an API call if necessary
		memberRequests = memberRequests.map((request) => ({
			...request,
			approved: true,
		}));
	}

	function rejectAll() {
		// Reject all member requests
		// Replace with an API call if necessary
		memberRequests = [];
	}
</script>

<div class="flex relative min-h-screen bg-orange-50 text-gray-900">
	<!-- Main Content -->
	<div class="flex-1 xl:px-64 p-4 overflow-y-auto">
		<div
			class="group-info-panel bg-white p-4 rounded-lg shadow-lg overflow-hidden"
		>
			<div class="text-center py-4">
				<h1 class="text-2xl font-bold mb-2">{groupInfo.name}</h1>
				<img
					src={groupInfo.coverImage}
					alt="Group Cover"
					class="mb-2 rounded-lg w-full h-60 object-cover"
				/>
				<p class="mb-4">{groupInfo.bio}</p>
			</div>

			<h2 class="text-xl font-bold mb-2">Member Requests</h2>
			<div class="flex justify-end space-x-2 mb-4">
				<button
					class="btn bg-amber-200 hover:bg-amber-300 text-gray-800 px-4 py-2 rounded-md transition-colors"
					on:click={approveAll}>Approve All</button
				>
				<button
					class="btn bg-amber-200 hover:bg-amber-300 text-gray-800 px-4 py-2 rounded-md transition-colors"
					on:click={rejectAll}>Reject All</button
				>
			</div>

			{#each memberRequests as request (request.id)}
				<div
					class="member-request-item p-3 rounded-lg bg-orange-100 mb-2 flex items-center justify-between transition-colors"
				>
					<div class="flex items-center">
						<!-- svelte-ignore a11y-img-redundant-alt -->
						<img
							src={request.profilePicture}
							alt="Profile Picture Missing"
							class="rounded-full w-10 h-10 mr-3"
						/>
						<div>
							<div class="font-semibold">{request.name}</div>
							<div class="text-sm text-gray-500">
								{request.commonGroups} common groups
							</div>
						</div>
					</div>
					<div>
						<button
							class="bg-amber-200 hover:bg-amber-300 text-gray-800 px-4 py-2 rounded-md transition-colors mr-2"
							on:click={() => approveRequest(request.id)}
							>Approve</button
						>
						<button
							class="bg-amber-200 hover:bg-amber-300 text-gray-800 px-4 py-2 rounded-md transition-colors"
							on:click={() => rejectRequest(request.id)}
							>Reject</button
						>
					</div>
				</div>
			{/each}
		</div>
	</div>
</div>

<slot />
