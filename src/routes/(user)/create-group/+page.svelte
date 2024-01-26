<script>
    // @ts-nocheck
  
    // Placeholder data for sidebar and main content items
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
  
    import { createEventDispatcher } from "svelte";
    import { writable } from "svelte/store";
  
    const dispatch = createEventDispatcher();
    const profilePhoto = writable(null);
    const coverPhoto = writable(null);
    const groupName = writable("");
    const description = writable("");
    const recommendedAdmins = ["Admin1", "Admin2"]; // Example recommended admins
    const admins = writable([]);
  
    function triggerFileSelect(type) {
      const fileInput = document.getElementById(`${type}-file-input`);
      fileInput.click();
    }
  
    function handleFileChange(type, event) {
      const file = event.target.files[0];
      if (file) {
        const imageUrl = URL.createObjectURL(file);
        if (type === "profile") {
          profilePhoto.set(imageUrl);
        } else if (type === "cover") {
          coverPhoto.set(imageUrl);
        }
      }
    }
  
    function addAdmin(event) {
      const adminName = event.target.value;
      if (adminName) {
        admins.update((currentAdmins) => [...currentAdmins, adminName]);
      }
      event.target.value = "";
    }
  
    function addRecommendedAdmin(admin) {
		admins.update((currentadmins) => {
			if (!currentadmins.includes(admin)) {
				return [...currentadmins, admin];
			}
			return currentadmins;
		});
	}
    function removeAdmin(adminName) {
      admins.update((currentAdmins) =>
        currentAdmins.filter((admin) => admin !== adminName)
      );
    }
  
    function createGroup() {
      // Placeholder for actual group creation logic
      alert("Group created!"); // Replace this with your API call or logic
    }
  </script>
  
  <div class="flex relative h-screen bg-zinc-950 text-white">
    <!-- Left Sidebar -->
    <div
      class="absolute inset-y-0 left-0 hidden xl:flex flex-col justify-start items-start w-64 p-4 space-y-6 bg-zinc-900 pt-16"
    >
      <div class="flex flex-row justify-center items-center">
        <img src="demo-logo.png" alt="Pixel Share" class="h-16 w-16" />
        <p class="ml-4 font-semibold text-2xl text-sky-300">PixelShare</p>
      </div>
      <hr class="h-px w-full my-8 bg-zinc-800 border-0 dark:bg-zinc-700" />
      <nav class="grow flex flex-col justify-center">
        {#each sidebarItems as item}
          <button
            class="flex items-center px-4 py-2 hover:bg-gray-700 rounded"
          >
            <img
              class="object-cover w-8 h-8"
              alt="icon"
              src={item.icon}
            />
            <span class="ml-3">{item.name}</span>
          </button>
        {/each}
      </nav>
      <div class="flex flex-col">
        <button
          class="flex items-center px-4 py-2 hover:bg-gray-700 rounded mb-2"
        >
          <img
            class="object-cover w-8 h-8"
            alt="icon"
            src="icons/profile.png"
          />
          <span class="ml-3">Profile</span>
        </button>
        <button
          class="flex items-center px-4 py-2 hover:bg-gray-700 rounded mb-4"
        >
          <img
            class="object-cover w-8 h-8"
            alt="icon"
            src="icons/logout.png"
          />
          <span class="ml-3 font-medium text-red-500">Log out</span>
        </button>
      </div>
    </div>
  
    <!-- Main Content -->
    <div class="flex-1 xl:px-64 p-4 overflow-y-auto">
      <div
        class="upload-section bg-zinc-800 p-4 rounded-lg shadow-lg text-white"
      >
        <div class="flex flex-col space-y-4">
          <!-- Profile Photo selection -->
          <input
            type="file"
            id="profile-file-input"
            accept="image/*"
            on:change={(event) => handleFileChange("profile", event)}
            hidden
          />
          <label for="profile-file-input" class="btn cursor-pointer">
            <img src="icons/add-image.png" class="inline-block mr-2" /> Select
            Profile Photo
          </label>
          {#if $profilePhoto}
            <div class="image-preview rounded-lg overflow-hidden">
              <img
                src={$profilePhoto}
                alt="Selected Profile Photo"
                class="object-cover w-full h-32"
              />
            </div>
          {/if}
  
          <!-- Cover Photo selection -->
          <input
            type="file"
            id="cover-file-input"
            accept="image/*"
            on:change={(event) => handleFileChange("cover", event)}
            hidden
          />
          <label for="cover-file-input" class="btn cursor-pointer">
            <img src="icons/add-image.png" class="inline-block mr-2" /> Select
            Cover Photo
          </label>
          {#if $coverPhoto}
            <div class="image-preview rounded-lg overflow-hidden">
              <img
                src={$coverPhoto}
                alt="Selected Cover Photo"
                class="object-cover w-full h-32"
              />
            </div>
          {/if}
  
          <!-- Group Name and Description input -->
          <input
            type="text"
            bind:value={$groupName}
            placeholder="Group Name"
            class="input"
          />
          <textarea
            bind:value={$description}
            placeholder="Group Description"
            class="input"
          ></textarea>
  
          <!-- Recommended Admins -->
         
					<!-- {#if $selectedImages.length > 0} -->
            <div class="recommended-tags flex gap-2 mt-2">
                {#each recommendedAdmins as admin}
                            <button
                                on:click={() => addRecommendedAdmin(admin)}
                                class="btn">{admin}</button
                            >
                        {/each}
                    </div>
                <!-- {/if} -->
                <input
                    type="text"
                    on:keydown={(event) =>
                        event.key === "Enter" && addAdmin(event)}
                    placeholder="Add Admin"
                    class="input"
                />
          <!-- Added Admins -->
          <div class="admins flex flex-wrap gap-2 mt-2">
            {#each $admins as admin}
              <span class="tag bg-gray-700 rounded px-2 py-1">
                {admin}
                <button
                  on:click={() => removeAdmin(admin)}
                  class="ml-1 text-gray-300 hover:text-white"
                  >&times;</button
                >
              </span>
            {/each}
          </div>
  
          <!-- Create Group button -->
          <button
            on:click={createGroup}
            class="btn bg-blue-500 hover:bg-blue-600"
            >Create Group</button
          >
        </div>
      </div>
    </div>
  </div>
  
  <!-- Right Sidebar -->
  <div
    class="absolute inset-y-0 right-0 hidden xl:block h-full w-64 p-4 space-y-6 bg-zinc-900"
  >
    <div class="space-y-4">
      <div>
        <h3 class="text-lg font-bold">Your Groups</h3>
        <ul>
          {#each rightSidebarItems.groups as group}
            <li class="mt-2">{group}</li>
          {/each}
        </ul>
      </div>
      <div>
        <h3 class="text-lg font-bold">Your Friends</h3>
        <ul>
          {#each rightSidebarItems.friends as friend}
            <li class="mt-2">{friend}</li>
          {/each}
        </ul>
      </div>
    </div>
  </div>
  <slot />
  
  <style>
    .image-preview:hover {
      opacity: 0.8; /* Make image slightly translucent on hover */
      cursor: pointer; /* Change cursor to indicate the image can be interacted with */
    }
  
    .btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 0.5rem 1rem;
      border: none;
      background-color: #374151;
      color: white;
      border-radius: 0.25rem;
      cursor: pointer;
      transition: background-color 0.2s;
    }
  
    .btn:hover {
      background-color: #4b5563;
    }
  
    .input {
      width: 100%;
      padding: 0.5rem;
      background-color: #1f2937;
      border: 1px solid #374151;
      border-radius: 0.25rem;
      color: white;
    }
  
    textarea {
      resize: vertical;
    }
  
    .image-preview {
      border: 1px dashed #374151;
      border-radius: 0.25rem;
      padding: 0.5rem;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  
    .recommended-admins,
    .admins {
      flex-wrap: wrap;
    }
  
    .tag {
      background-color: #374151;
      color: white;
    }
  
    .tag button {
      color: white;
    }
  </style>
  