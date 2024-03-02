<script lang="ts">
  import { invalidateAll } from "$app/navigation";
  import { page } from "$app/stores";
  import { Icon } from "$lib";
  import FaIcon from "$lib/components/FaIcon.svelte";
  import PostUpload from "$lib/components/PostUpload.svelte";
  import { onMount, setContext } from "svelte";
  import { writable } from "svelte/store";
  import { slide } from "svelte/transition";

  export let data;
  const groupId = writable<number>();
  let active = true;
  setContext("groupId", groupId);

  let base = "/";

  // Placeholder data for sidebar and main content items
  let sidebarItems = [
    { name: "Home", icon: Icon.HOUSE, link: "/" },
    { name: "Upload", icon: Icon.UPLOAD, link: "?upload" },
    { name: "Search", icon: Icon.MAGNIFYING_GLASS, link: "/search" },
    { name: "Notifications", icon: Icon.BELL, link: "/notifications" },
    // { name: "Settings", icon: Icon.GEAR, link: "/settings" },
  ];

  const userDetails = {
    name: "Ashrafur Rahman Khan",
    username: data.username,
    avatarUrl: "/risenfromashes.png",
  };

  $: {
    sidebarItems[2].link =
      ($page.params.groupId ? `/groups/${$page.params.groupId}` : "") +
      "/search";
    sidebarItems = sidebarItems;
  }
</script>

<div class="flex relative h-screen bg-gray-100 text-gray-900">
  <!-- Left Sidebar -->
  <!-- Adjust for light theme -->

  <button
    class="px-4 py-2 bg-orange-300 text-black font-bold rounded hover:bg-orange-200 transition-colors duration-300"
    on:click={() => (active = !active)}
  >
    {active ? "<<" : ">>"}
  </button>
  <aside
    class="absolute transition-transform duration-500 h-full w-72 p-5 border bg-gray-100 -translate-x-full {active
      ? 'translate-x-0'
      : '-translate-x-full'}"
  >
    <div
      class="absolute z-10 w-full xl:max-w-72 inset-y-0 left-0 hidden xl:flex flex-col justify-start items-start p-6 space-y-6 bg-orange-100 border-2 border-orange-200 shadow-lg"
    >
      <div
        class="flex flex-row w-full justify-center items-center mt-8 xl:mt-10"
      >
        <img src="/demo-logo.png" alt="Pixel Share" class="h-24 w-24" />
      </div>
      <hr class="h-px w-full my-8 bg-orange-300 border-0 shadow-md" />
      <nav class="w-full grow flex flex-col justify-center">
        {#each sidebarItems as item (item.name)}
          {#if item.name != "Upload" || $page.params.groupId}
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
          {/if}
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
          <button
            class="w-full flex items-center p-4 hover:bg-gray-300 rounded"
          >
            <FaIcon
              icon={Icon.ARROW_RIGHT_FROM_BRACKET}
              className="object-cover w-6 h-6"
              fill="#ff0000"
            />
            <span class="ml-3 font-medium text-red-500">Log out</span>
          </button>
        </form>
        {#if active === true}
          <button
            class="px-4 py-2 bg-orange-200 text-black rounded hover:bg-orange-200 transition-colors duration-300"
            on:click={() => (active = !active)}
          >
            {active ? "Close" : "Open"} Menu
          </button>
        {/if}
      </div>
      <!-- ... existing left sidebar content ... -->
    </div>
  </aside>

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
        src={data.pro_pic_url}
        alt={data.username}
        class="mx-auto h-16 w-16 rounded-full border border-gray-300"
      />
      <h2 class="mt-4 font-semibold text-lg">{data.username}</h2>
      <p class="text-sm text-gray-600">@{userDetails.username}</p>
    </div>

    <hr class="h-px w-full my-8 bg-orange-300 border-0 shadow-md" />
        {#if data.admin_groups}
        <div class="space-y-2 overflow-auto h-50 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
  
            <h3 class="text-md font-bold text-orange-700 mb-2">My Groups</h3>
    
            {#each data.admin_groups as group}
                <a
                    class="w-full flex items-center py-4 px-4 hover:bg-gray-300 rounded"
                    href={`/groups/${group.group_id}`}
                >
                    <img
                        src={group.profile_image_url}
                        alt={group.group_name}
                        class="h-8 w-8 rounded-full object-cover mr-2"
                    />
                    <span class="text-sm font-medium text-gray-800">{group.group_name}</span>
                </a>
            {/each}
        </div>
    {/if}

    <hr class="h-px w-full my-8 bg-orange-300 border-0 shadow-md" />

    {#if data.non_admin_groups}
    <div class="space-y-2 overflow-auto h-40 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      <!-- Adjust height as needed -->
            <h3 class="text-md font-bold text-orange-700 mb-2">Other Groups</h3>
    
            {#each data.non_admin_groups as group}
                <a
                    class="w-full flex items-center py-4 px-4 hover:bg-gray-300 rounded"
                    href={`/groups/${group.group_id}`}
                >
                    <img
                        src={group.profile_image_url}
                        alt={group.group_name}
                        class="h-8 w-8 rounded-full object-cover mr-2"
                    />
                    <span class="text-sm font-medium text-gray-800">{group.group_name}</span>
                </a>
            {/each}
        </div>
    {/if}

    <hr class="h-px w-full my-8 bg-orange-300 border-0 shadow-md" />

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

        <a
          class="w-full flex items-center py-3 px-4 hover:bg-gray-300 rounded"
          href="/groups/join"
        >
          <FaIcon
            icon={Icon.UPLOAD}
            className="object-cover w-6 h-6"
            fill="#000000"
          />

          <span class="ml-3 font-medium">Join Group</span>
        </a>
      <!-- </div>
    {/if} -->
  </div>
</div>

<PostUpload></PostUpload>
