<script lang="ts">
  import { Icon } from "$lib";
  import FaIcon from "$lib/components/FaIcon.svelte";

  export let data;

  // Placeholder data for sidebar and main content items
  const sidebarItems = [
    { name: "Home", icon: Icon.HOUSE, link: "/" },
    { name: "Upload", icon: Icon.UPLOAD, link: "/upload" },
    { name: "Search", icon: Icon.MAGNIFYING_GLASS, link: "/search" },
    { name: "Notifications", icon: Icon.BELL, link: "/notifications" },
    { name: "Settings", icon: Icon.GEAR, link: "/settings" },
  ];

  const userDetails = {
    name: "Ashrafur Rahman Khan",
    username: "risenfromashes",
    avatarUrl: "/risenfromashes.png",
  };
</script>

<div class="flex relative h-screen bg-gray-100 text-gray-900">
  <!-- Left Sidebar -->
  <!-- Adjust for light theme -->
  <div
    class="absolute z-10 w-full xl:max-w-72 inset-y-0 left-0 hidden xl:flex flex-col justify-start items-start p-6 space-y-6 bg-orange-100 border-2 border-orange-200 shadow-lg"
  >
    <div class="flex flex-row w-full justify-center items-center mt-8 xl:mt-10">
      <img src="/demo-logo.png" alt="Pixel Share" class="h-24 w-24" />
    </div>
    <hr class="h-px w-full my-8 bg-orange-300 border-0 shadow-md" />
    <nav class="w-full grow flex flex-col justify-center">
      {#each sidebarItems as item}
        <a
          class="w-full flex items-center p-4 hover:bg-gray-300 rounded"
          href={item.link}
        >
          <FaIcon
            icon={item.icon}
            className="object-cover w-6 h-6"
            fill="#000000"
          />

          <span class="ml-3 font-medium">{item.name}</span>
        </a>
      {/each}
    </nav>
    <div class="w-full flex flex-col">
      <button class="w-full flex items-center p-4 hover:bg-gray-300 rounded">
        <FaIcon
          icon={Icon.CIRCLE_USER}
          className="object-cover w-6 h-6 rounded-full border border-teal-500"
          fill="#000000"
        />
        <a class="ml-3" href="/profile">Profile</a>
      </button>
      <form method="POST" action="/logout">
        <button class="w-full flex items-center p-4 hover:bg-gray-300 rounded">
          <FaIcon
            icon={Icon.ARROW_RIGHT_FROM_BRACKET}
            className="object-cover w-6 h-6"
            fill="#ff0000"
          />
          <span class="ml-3 font-medium text-red-500">Log out</span>
        </button>
      </form>
    </div>
    <!-- ... existing left sidebar content ... -->
  </div>

  <!-- Main Content -->
  <!-- Adjust for light theme -->
  <div class="flex-1 pl-72 pr-60 px-4 overflow-y-auto bg-orange-50">
    <!-- ... existing main content ... -->
    <div class="w-full">
      <slot />
    </div>
  </div>

  <!-- Right Sidebar -->
  <!-- Improved style for light theme -->
  <div
    class="absolute inset-y-0 right-0 hidden xl:block h-screen w-full xl:max-w-64 p-4 space-y-6 bg-orange-100 border-2 border-orange-200 shadow-lg"
  >
    <div class="text-center mt-12">
      <img
        src={userDetails.avatarUrl}
        alt={userDetails.username}
        class="mx-auto h-16 w-16 rounded-full border border-gray-300"
      />
      <h2 class="mt-4 font-semibold text-lg">{userDetails.name}</h2>
      <p class="text-sm text-gray-600">@{userDetails.username}</p>
    </div>

    <hr class="h-px w-full my-8 bg-orange-300 border-0 shadow-md" />

    {#if data.groups}
      <div class="space-y-">
        <h3 class="text-md font-bold text-gray-700 mb-2">Groups</h3>

        {#each data.groups as group}
          <a
            class="w-full flex items-center py-4 px-4 hover:bg-gray-300 rounded"
            href={`/groups/${group.groupId}`}
          >
            <img
              src={group.groupImg}
              alt={group.groupName}
              class="h-8 w-8 rounded-full object-cover mr-2"
            />
            <span class="text-sm font-medium text-gray-800"
              >{group.groupName}</span
            >
          </a>
        {/each}
        <a
          class="w-full flex items-center py-3 px-4 hover:bg-gray-300 rounded"
          href="/groups/create"
        >
          <FaIcon
            icon={Icon.UPLOAD}
            className="object-cover w-6 h-6"
            fill="#000000"
          />

          <span class="ml-3 font-medium">Create Group</span>
        </a>
      </div>
    {/if}
  </div>
</div>
