<script lang="ts">
  export let data; // Assume this now contains tags data including images, titles, descriptions, creation dates, and admin names
</script>

<div class="flex relative h-screen bg-orange-50 text-black px-24">
  <!-- Main Content -->
  <div class="flex-1 xl:px-12 p-4 overflow-y-auto">
    <div class="requests-panel p-4 rounded-lg text-black">
      <!-- <div class="text-center py-4">
				<h1 class="text-2xl font-bold mb-2">{groupInfo.name}</h1>
			</div>
			<img
				src={groupInfo.coverImage}
				alt="Group Cover"
				class="mb-2 rounded-lg w-full h-60 object-cover"
			/>
			<div class="text-center py-4">
				<p class="mb-4">{groupInfo.bio}</p>
			</div> -->

      <!-- <h1 class="text-3xl font-bold text-center mb-8">Add Moderator</h1> -->
      <h2 class="text-xl font-bold mb-2">Current Members</h2>
      <div class=" grid grid-cols-2">
        {#if data.error}
          <div
            class="block w-full font-bold px-4 py-3 bg-red-100 rounded text-left text-xs text-red-500 mb-4"
          >
            <p class="text-center">Error: {data.error}</p>
          </div>
        {:else if !data.requests || data.requests.length === 0}
          <p class="text-center">No member requests yet.</p>
        {:else}
          {#each data.requests as member}
            <div
              class="member-request-item mt-4 mx-2 p-3 rounded-lg bg-orange-200 flex items-center justify-between mb-2 hover:bg-orange-300"
            >
              <div class="flex items-center">
                <img
                  src={member.profileImg}
                  alt="Profile"
                  class="rounded-full w-10 h-10 mr-3"
                />
                <div>
                  <div class="font-semibold">{member.username}</div>
                  <div class="text-sm text-gray-400">
                    <!-- {member.commonGroups} common groups -->
                  </div>
                </div>
              </div>
              <div>
                <!-- You can add any actions or options related to current members here -->
              </div>
            </div>
          {/each}
        {/if}
      </div>
    </div>
  </div>
</div>
<slot />
