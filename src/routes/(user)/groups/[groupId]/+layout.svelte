<script lang="ts">
  import { getContext, onMount } from "svelte";
  import { writable } from "svelte/store";
  import { page } from "$app/stores";
  // Import other components...

  interface Tabs {
    [key: string]: SubTab[];
  }

  interface SubTab {
    name: string;
    link: string;
  }
  let base: string;
  let tabsForAdmins: Tabs;
  let tabsForAll: Tabs;
  $: {
    base = "/groups/" + $page.params.groupId;

    tabsForAll = {
      highlights: [{ name: "Highlights", link: base }],
      tags: [
        { name: "View Tags", link: base + "/tags/view" }
      ],
      posts: [
        { name: "View Posts", link: base + "/details" }
      ],
      members: [
        { name: "Current Members", link: base + "/members/view" }
      ],
      admins: [
        { name: "Current Admins", link: base + "/admins/view" },
        {name: "See Moderation Request", link: base + "/admins/see-moderation-request" }
      ],
    };



    tabsForAdmins = {
      highlights: [{ name: "Highlights", link: base }],
      tags: [
        { name: "View Tags", link: base + "/tags/view" },
        { name: "Add Tag", link: base + "/tags/add" },
        { name: "Verify Tags", link: base + "/tags/verify" },
      ],
      posts: [
        { name: "View Posts", link: base + "/details" },
        { name: "Manage Post Requests", link: base + "/posts/requests" },
      ],
      members: [
        { name: "Current Members", link: base + "/members/view" },
        { name: "Manage Member Requests", link: base + "/members/requests" },
      ],
      admins: [
        { name: "Current Admins", link: base + "/admins/view" },
        {name: "See Moderation Request", link: base + "/admins/see-moderation-request" },
        { name: "Send Moderation Request", link: base + "/admins/request" },
      ],
    };
  }

  export let data;

  let activeTab: string | null = null;

  const toggleTab = (tabName: string | null) => {
    activeTab = activeTab === tabName ? null : tabName;
  };

  const collapseTab = () => {
    activeTab = null;
  };
</script>

<svelte:window on:click={collapseTab} />

<!-- Tailwind CSS is used here for styling -->
<div
  class="bg-orange-100 shadow-lg flex flex-wrap h-14 border-orange-200 border-b-2"
>
  {#if !data.isAdmin }
  {#each Object.keys(tabsForAll) as tabName1}

    <div class="relative inline-flex flex-col text-left">
      <button
        class="px-4 py-2 h-full flex flex-row font-semibold ring-inset justify-center items-center text-gray-700 bg-orange-100 hover:bg-orange-200 focus:outline-none focus:ring-2 focus:ring-orange-500"
        on:click|preventDefault|stopPropagation={() => toggleTab(tabName1)}
      >
        {tabName1.charAt(0).toUpperCase() + tabName1.slice(1)}
        <svg class="-mr-1 ml-2 h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
          <path
            fill-rule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clip-rule="evenodd"
          />
        </svg>
      </button>
      {#if activeTab === tabName1}
        <div
          class="absolute origin-top-left left-0 mt-14 w-56 shadow-lg z-10 bg-orange-100"
        >
          {#each tabsForAll[tabName1] as subTab}
          <!-- {#if data.isAdmin } -->
            <a
              href={subTab.link}
              class="block px-4 py-3 h-full text-sm text-gray-700 hover:bg-orange-200 hover:border-orange-400"
              on:click={() => collapseTab()}
            >
              {subTab.name}
            </a>
          <!-- {/if} -->
          {/each}
        </div>
      {/if}
    </div>
  {/each}
  {/if}
  {#if data.isAdmin }
  {#each Object.keys(tabsForAdmins) as tabName1}
  <!-- {#if data.isAdmin } -->
    <div class="relative inline-flex flex-col text-left">
      <button
        class="px-4 py-2 h-full flex flex-row font-semibold ring-inset justify-center items-center text-gray-700 bg-orange-100 hover:bg-orange-200 focus:outline-none focus:ring-2 focus:ring-orange-500"
        on:click|preventDefault|stopPropagation={() => toggleTab(tabName1)}
      >
        {tabName1.charAt(0).toUpperCase() + tabName1.slice(1)}
        <svg class="-mr-1 ml-2 h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
          <path
            fill-rule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clip-rule="evenodd"
          />
        </svg>
      </button>
      {#if activeTab === tabName1}
        <div
          class="absolute origin-top-left left-0 mt-14 w-56 shadow-lg z-10 bg-orange-100"
        >
          {#each tabsForAdmins[tabName1] as subTab}
          
            <a
              href={subTab.link}
              class="block px-4 py-3 h-full text-sm text-gray-700 hover:bg-orange-200 hover:border-orange-400"
              on:click={() => collapseTab()}
            >
              {subTab.name}
            </a>
          <!-- {/if} -->
          {/each}
        </div>
      {/if}
    </div>
  <!-- {/if} -->
  {/each}
  {/if}

</div>

<div class="relative mb-4 overflow-hidden shadow-lg t">
  <div
    class="absolute w-full h-full bg-gradient-to-t from-orange-500 to-transparen"
  ></div>
  <img
    src={data?.groupInfo[0]?.group_coverimg}
    alt="Group Cover"
    class="w-full h-64 object-cover transition-all duration-500 ease-in-out hover:scale-105"
  />
  <div class="absolute bottom-0 w-full p-4">
    <h2 class="text-xl text-white font-bold mb-2">
      {data?.groupInfo[0]?.groupname}
    </h2>
    <p class="text-white">
      {data?.groupInfo[0]?.group_bio}
    </p>
  </div>
</div>

<slot />
