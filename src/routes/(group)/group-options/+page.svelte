<script>
	import { onMount } from "svelte";

	const managementOptions = [
		{
			name: "Post Management",
		},
		{ name: "Member Management" },
		{ name: "Rules Section" },
		{ name: "Tags Management" },
		{ name: "Admin Moderation" },
		// ... add more options as needed
	];
	let here = "->";
</script>

<div class="flex relative h-screen bg-orange-100 text-black">
	<!-- Main Content -->
	<div class="flex-1 xl:px-64 p-4 overflow-y-auto">
		<div class="flex-1 xl:px-64 p-4 overflow-y-auto">
			<div class="bg-orange-50 p-4 rounded-lg shadow-md">
				<h2 class="text-xl font-bold text-gray-800 mb-4 text-center">
					Group Settings
				</h2>
				<div class="space-y-4">
					{#each managementOptions as option}
						<div
							class="flex justify-between items-center bg-orange-200 hover:bg-orange-300 text-black-800 p-4 rounded-lg cursor-pointer transition duration-300 ease-in-out"
						>
							<span class="font-semibold">{option.name}</span>
						</div>
					{/each}
				</div>
			</div>
		</div>
	</div>
</div>

<slot />
