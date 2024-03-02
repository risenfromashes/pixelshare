<script lang="ts">
  export let data;
  interface NotificationData {
    id: string;
    username: string;
    profileImg: string;
    title: string;
    content: string;
    createdAt: Date;
    seen: Boolean;
  }
  interface GroupedNotifications {
    [key: string]: NotificationData[];
  }
  // Helper function to format and group notifications
  function groupNotificationsByDay(notifications: any[]) {
    let grouped: GroupedNotifications = {};
    notifications.forEach((notification: NotificationData) => {
      const date = new Date(notification.createdAt);
      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);

      let label: string = "";
      if (date.toDateString() === today.toDateString()) {
        label = "Today";
      } else if (date.toDateString() === yesterday.toDateString()) {
        label = "Yesterday";
      } else {
        label = date.toLocaleDateString();
      }

      if (!grouped[label]) {
        grouped[label] = [];
      }
      grouped[label].push(notification);
    });
    return grouped;
  }

  // Assuming each notification has a 'seen' property
  const groupedNotifications = groupNotificationsByDay(
    data.notifications || [],
  );
</script>

<div class="flex relative h-screen bg-orange-50 text-black">
  <!-- Main Content -->
  <div class="flex-1 xl:px-12 p-4 overflow-y-auto">
    <div class="notifications-panel p-4 rounded-lg text-black">
      <h2 class="text-2xl font-bold mb-4">Notifications</h2>
      <div class="flex flex-col space-y-4">
        {#if data.error}
          <div
            class="block w-full font-bold px-4 py-3 bg-red-100 rounded text-left text-xs text-red-500 mb-4"
          >
            <p class="text-center">Error: {data.error}</p>
          </div>
        {:else if !data.notifications || data.notifications.length === 0}
          <p class="text-center">No notifications yet.</p>
        {:else}
          {#each data.notifications as notification (notification.id)}
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <!-- svelte-ignore a11y-no-static-element-interactions -->
            {#if notification.seen}
              <div
                class="notification-item bg-orange-100 border-2 border-orange-200 p-4 rounded-lg shadow-lg hover:bg-orange-200 transition-colors duration-200 ease-in-out"
              >
               <h3 class="text-lg font-bold">
                  {notification.title}
                </h3>
                <p>{notification.content}</p>
                <span> {new Date(notification.createdAt).toLocaleString().split(' GMT')[0]}</span>
              </div>
            {:else}
              <div
                class="notification-item bg-orange-200 border-2 border-orange-400 p-4 rounded-lg shadow-lg hover:bg-orange-400 transition-colors duration-200 ease-in-out"
              >
                <h3 class="text-lg font-semibold">
                  {notification.title}
                </h3>
                <p>{notification.content}</p>
                <!-- <time class="text-sm text-black-400"
                >{notification.createdAt.toLocaleString()}</time
              > -->
              </div>
            {/if}
          {/each}
        {/if}
      </div>
    </div>
  </div>
</div>

<slot />
