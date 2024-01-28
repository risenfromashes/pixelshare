<script lang="ts">
  export let data;
  // @ts-ignore
  // const markAsSeen = (notificationId) => {
  //   notifications = notifications.map((notification) => {
  //     if (notification.id === notificationId) {
  //       return { ...notification, seen: true };
  //     }
  //     return notification;
  //   });
  //   // You would also make an API call here to update the seen status in the backend
  // };
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
            <div
              class="notification-item bg-orange-100 border-2 border-orange-200 p-4 rounded-lg shadow-lg hover:bg-orange-200 transition-colors duration-200 ease-in-out"
            >
              <h3 class="text-lg font-bold">
                {notification.title}
              </h3>
              <p>{notification.content}</p>
              <!-- <time class="text-sm text-black-400"
                >{notification.createdAt.toLocaleString()}</time
              > -->
            </div>
          {/each}
        {/if}
      </div>
    </div>
  </div>
</div>

<slot />
