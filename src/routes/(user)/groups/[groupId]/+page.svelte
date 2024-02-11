<script lang="ts">
  import { getContext, onMount } from "svelte";
  import { writable } from "svelte/store";

  // Explicit imports
  import ViewHighlightsComponent from "$lib/components/HighlightsComponent.svelte";
  import AddTagComponent from "$lib/components/AddTagComponent.svelte";
  import ViewTagsComponent from "$lib/components/ViewTagsComponent.svelte";
  //import VerifyTagsComponent from "$lib/Tags/VerifyTagsComponent.svelte";
  import ViewCurrentMembersComponent from "$lib/components/MembersComponent.svelte";
  import ManagePostRequestsComponent from "$lib/components/ManagePostRequestsComponent.svelte";
  import ManageMemberRequestsComponent from "$lib/components/ManageMemberRequestsComponent.svelte";
  import CurrentAdminsComponent from "$lib/components/CurrentAdminsComponent.svelte";
  // Import other components similarly...

  let activeTab = writable("tags");
  let ActiveComponent: any;
  let dropdownOpen: string | null = null;
  // Define the structure for tabs and their sub-tabs
  const tabs = {
    highlights: ["ViewHighlights"],
    tags: ["AddTag", "ViewTags", "VerifyTags"],
    posts: ["ViewPosts", "ManagePostRequests"],
    members: ["ViewCurrentMembers", "ManageMemberRequests"],
    admins: ["CurrentAdmins", "SendModerationRequest"],
  };

  export let data;

  const setActiveTab = (tabName: string, subTabName: string) => {
    activeTab.set(tabName);
    dropdownOpen = null;

    // Explicitly handle component assignment
    if (tabName === "highlights" && subTabName === "ViewHighlights") {
      ActiveComponent = ViewHighlightsComponent;
    } else if (tabName === "tags") {
      if (subTabName === "ViewTags") {
        ActiveComponent = ViewTagsComponent;
      } else if (subTabName === "AddTag") {
        ActiveComponent = AddTagComponent;
      }
    } else if (tabName === "members") {
      if (subTabName === "ViewCurrentMembers") {
        ActiveComponent = ViewCurrentMembersComponent;
      } else if (subTabName === "ManageMemberRequests") {
        ActiveComponent = ManageMemberRequestsComponent;
      }
    } else if (tabName === "posts") {
      if (subTabName === "ManagePostRequests") {
        ActiveComponent = ManagePostRequestsComponent;
      }
    } else if (tabName === "admins") {
      if (subTabName === "CurrentAdmins") {
        ActiveComponent = CurrentAdminsComponent;
      }
    }
    // Add other conditions for different tabs and sub-tabs
  };
  function toggleDropdown(tabName: string) {
    dropdownOpen = dropdownOpen === tabName ? null : tabName;
  }

  onMount(() => {
    setActiveTab("highlights", "ViewHighlights");
  });
</script>

<<<<<<< HEAD
<!-- {#each mainContentItems as section} -->
<div class="p-4 xl:p-10">
  <!-- Add a new Tag section -->
  <div class="flex items-center bg-orange-200 text-black p-3 rounded-lg">
    <a
      href={`/groups/${$page.params.groupId}/add-tag`}
      class="text-2xl font-bold hover:text-orange-500"
      aria-label="Add a new tag">+</a
    >
    <span class="text-xl font-bold ml-2">Add a new Tag</span>
  </div>
  <!-- View Tags section -->
  <div class="flex items-center bg-orange-200 text-black p-3 rounded-lg">
    <span class="text-xl font-bold ml-2">
      <a
        href={`/groups/${$page.params.groupId}/view-tags`}
        class="text-2xl font-bold hover:text-orange-500"
        aria-label="View Tags">View Tags</a
      >
    </span>
  </div>

  <!-- view current members -->
  <div class="flex items-center bg-orange-200 text-black p-3 rounded-lg">
    <span class="text-xl font-bold ml-2">
      <a
        href={`/groups/${$page.params.groupId}/view-current-members`}
        class="text-2xl font-bold hover:text-orange-500"
        aria-label="View Tags">View Current Members</a
      >
    </span>
  </div>

  <!-- View Member Requets section -->
  <div class="flex items-center bg-orange-200 text-black p-3 rounded-lg">
    <span class="text-xl font-bold ml-2">
      <a
        href={`/groups/${$page.params.groupId}/member-requests`}
        class="text-2xl font-bold hover:text-orange-500"
        aria-label="View Tags">View Member Requests</a
      >
    </span>
  </div>

  <!-- View Post Requets section -->
  <div class="flex items-center bg-orange-200 text-black p-3 rounded-lg">
    <span class="text-xl font-bold ml-2">
      <a
        href={`/groups/${$page.params.groupId}/post-requests`}
        class="text-2xl font-bold hover:text-orange-500"
        aria-label="View Tags">View Post Requests</a
      >
    </span>
  </div>
  <!-- </div>admin moderation  -->
  <div class="flex items-center bg-orange-200 text-black p-3 rounded-lg">
    <span class="text-xl font-bold ml-2">
      <a
        href={`/groups/${$page.params.groupId}/admin-moderation`}
        class="text-2xl font-bold hover:text-orange-500"
        aria-label="View Tags">Add Admin Moderator</a
      >
    </span>
  </div>


  <h2 class="text-xl font-bold mb-3">Today's Highlights</h2>
  <div class="flex flex-row flex-wrap gap-x-2 gap-y-4">
    {#if data}
      {#each data.posts as post (post.imageId)}
        <a
          class="relative h-24 xl:h-56"
          href={`/groups/${$page.params.groupId}/details`}
        >
          <ImageCard src={post.url} />
        </a>
      {/each}
    {/if}
  </div>
=======
<div class="text-center py-4">
  <h1 class="text-2xl font-bold mb-2 text-black hover:text-gray-700">
    {data.groupInfo[0].groupname}
  </h1>
</div>
<img
  src={data.groupInfo[0].group_coverimg}
  alt="Group Cover"
  class="mb-2 rounded-lg w-full h-60 object-cover"
/>
<div class="text-center py-4">
  <p class="mb-4 text-black font-bold hover:text-gray-700">
    {data.groupInfo[0].group_bio}
  </p>
</div>
<!-- Tabs at the top -->
<div class="bg-white p-1 rounded-lg shadow mb-4 flex flex-wrap">
  {#each Object.keys(tabs) as tabName}
    <div class="relative inline-block text-left mr-4 mb-4">
      <button
        class="px-4 py-2 font-semibold text-black"
        on:click|preventDefault={() => toggleDropdown(tabName)}
      >
        {tabName.charAt(0).toUpperCase() + tabName.slice(1)}
        <svg
          class="-mr-1 ml-2 h-5 w-5 inline-block"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clip-rule="evenodd"
          />
        </svg>
      </button>
      {#if dropdownOpen === tabName}
        <div
          class="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10"
        >
          <div class="py-1">
            {#each tabs[tabName] as subTabName}
              <!-- svelte-ignore a11y-invalid-attribute -->
              <a
                href="javascript:void(0)"
                class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                on:click={() => setActiveTab(tabName, subTabName)}
              >
                {subTabName}
              </a>
            {/each}
          </div>
        </div>
      {/if}
    </div>
  {/each}
</div>

<!-- Dynamic Component Based on Active Tab and Sub-Tab, displayed below the tabs -->
<div class="mt-4">
  {#if ActiveComponent}
    <svelte:component this={ActiveComponent} {data} />
  {/if}
>>>>>>> 449a10501ff7db45ce11dc5f1ee2b202875ca9f6
</div>
