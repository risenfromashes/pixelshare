<script>
  import { Icon } from "$lib";
  import FaIcon from "$lib/components/FaIcon.svelte";
  import { onMount } from "svelte";

  const sidebarItems = [
    { name: "Home", icon: "icons/fa-svg/bars.svg" },
    { name: "Search", icon: "icons/fa-svg/bars.svg" },
    { name: "Notifications", icon: "icons/fa-svg/bars.svg" },
    { name: "Settings", icon: "icons/fa-svg/bars.svg" },
  ];

  let images = [
    { id: 1, url: "sample/sample.jpg", date: "2024-01-20" },
    { id: 2, url: "sample/sample.jpg", date: "2024-01-18" },
    // Add more images as needed
  ];

  let searchTerm = "";
</script>

<div class="flex min-h-screen bg-orange-50">
  <!-- Main content area -->
  <div class="flex-1 overflow-y-auto">
    <div class="w-full p-8">
      <div class="flex justify-center mb-8">
        <div class="relative w-full max-w-xl">
          <input
            type="text"
            class="w-full pl-10 pr-4 py-2 rounded-full text-gray-700 placeholder-gray-500 border border-gray-200"
            placeholder="Search..."
            bind:value={searchTerm}
          />
          <div class="absolute left-0 top-0 mt-3 ml-3">
            <FaIcon icon={Icon.MAGNIFYING_GLASS} className="w-full h-full" />
          </div>
        </div>
      </div>
      <div
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
      >
        {#each images as image}
          <div class="bg-white rounded-lg overflow-hidden shadow">
            <img
              src={image.url}
              alt={`Image taken on ${image.date}`}
              class="w-full h-auto"
            />
            <div class="p-4">
              <p class="text-sm text-gray-600">{image.date}</p>
            </div>
          </div>
        {/each}
      </div>
    </div>
  </div>
</div>
