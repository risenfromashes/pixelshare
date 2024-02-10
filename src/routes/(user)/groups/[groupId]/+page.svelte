<script lang="ts">
  import { getContext } from "svelte";
  import { page } from "$app/stores";
  import type { Writable } from "svelte/store";
  import ImageCard from "$lib/components/ImageCard.svelte";

  export let data;

  const groupId: Writable<number> = getContext("groupId");
  $: groupId.set(Number.parseInt($page.params.groupId));
</script>

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
</div>
<!-- {/each} -->
