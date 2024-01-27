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
	let ami = "";

	let notifications = [
		// Mock notifications data, which you would typically fetch from an API
		{
			id: 1,
			title: "New friend request",
			message: "John Doe sent you a friend request",
			timestamp: new Date("2024-01-25T15:30:00"),
			seen: false,
		},
		{
			id: 2,
			title: "Photo tag",
			message:
				"Jane Smith has uploaded a photo in Central_BUET under the tags - #ECE_catto, #fav_mav_catto",
			timestamp: new Date("2024-01-24T12:17:00"),
			seen: true,
		},
		{
			id: 3,
			title: "Member Request Approval",
			message:
				"faria_mou has approved your member request for joining the group Central_BUET",
			timestamp: new Date("2024-01-24T12:17:00"),
			seen: true,
		},
		// Add more notifications here
	];

	// Sorting notifications by time, unseen first
	onMount(() => {
		notifications.sort((a, b) => {
			if (a.seen === b.seen) {
				// @ts-ignore
				return b.timestamp - a.timestamp; // Newest first if both are seen or unseen
			}
			return a.seen ? 1 : -1; // Unseen first
		});
	});

	// @ts-ignore
	const markAsSeen = (notificationId) => {
		notifications = notifications.map((notification) => {
			if (notification.id === notificationId) {
				return { ...notification, seen: true };
			}
			return notification;
		});
		// You would also make an API call here to update the seen status in the backend
	};
</script>

<div class="flex relative h-screen bg-orange-50 text-black">
	<!-- Main Content -->
	<div class="flex-1 xl:px-64 p-4 overflow-y-auto">
		<div
			class="notifications-panel bg-orange-200 p-4 rounded-lg shadow-lg text-black"
		>
			<h2 class="text-xl font-bold mb-4">Notifications</h2>
			<div class="flex flex-col space-y-4">
				{#each notifications as notification (notification.id)}
					<!-- svelte-ignore a11y-click-events-have-key-events -->
					<!-- svelte-ignore a11y-no-static-element-interactions -->
					<div
						class="notification-item bg-orange-100 p-4 rounded-lg"
						class:bg-gray-700={notification.seen}
						class:bg-gray-600={!notification.seen}
						on:click={() => markAsSeen(notification.id)}
					>
						<h3 class="text-lg font-bold">
							{notification.title}
						</h3>
						<p>{notification.message}</p>
						<time class="text-sm text-black-400"
							>{new Date(
								notification.timestamp,
							).toLocaleString()}</time
						>
					</div>
				{/each}
			</div>
		</div>
	</div>
</div>

<slot />

<style>
	.notification-item:not(.bg-gray-600):hover {
		background-color: #e6cb96; /* Hover effect for seen notifications */
	}

	.notification-item.bg-gray-600:hover {
		background-color: #e6cb96; /* Hover effect for unseen notifications */
	}
</style>
