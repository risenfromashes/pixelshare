<script lang="ts">
  export let data;
  // Example data to mimic the interface
  import { writable } from "svelte/store";
  const profileImage = writable("sample/sample.jpg");

  let tempFile = "";
  let tempBio = "";
  // @ts-ignore
  function changeProfilePicture(event) {
    const file = event.target.files[0];
    // tempFile.set(URL.createObjectURL(profileImage));
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      profileImage.set(imageUrl);
      // @ts-ignore
      consol.log("hehe");
    }
  }
  function cancelChange() {
    // user.about = tempBio;
    // profileImage.set(tempFile);
  }

  function confirmChange() {
    //
  }
  let isModalOpen = false;

  // Function to open the modal
  function openModal() {
    isModalOpen = true;
  }

  // Function to close the modal
  function closeModal() {
    isModalOpen = false;
  }

  function editAbout() {
    // @ts-ignore
    const editedBio = document.querySelector(".modal textarea").value;
    //tempBio = user.about;
    //user.about = editedBio;
    closeModal();
  }
  console.log(data);
</script>

<div class="flex h-screen bg-gray-900">
  <!-- Sidebar -->
  <!-- ... Sidebar content using Tailwind CSS ... -->

  <!-- Main Content -->
  <div
    class="flex-1 xl:px-32 px-4 py-8 overflow-y-auto bg-orange-50 text-black"
  >
    <!-- Profile Header and Badges -->
    <div class="flex justify-between items-start mb-5">
      <!-- Profile Picture and Details -->
      <div class="flex relative">
        <div class="relative w-24 h-24">
          <img
            src={data.user[0].profileimg}
            alt="Profile "
            class="rounded-full w-24 h-24 border-4 border-white"
          />
          <label
            for="profile-image-input"
            class="cursor-pointer absolute bottom-0 right-0"
          >
            <img
              src="./icons/camera.png"
              alt="File Picker"
              class="w-10 h-10 p-2 bg-white-300 rounded-full"
            />
          </label>
          <input
            type="file"
            id="profile-image-input"
            accept="image/*"
            on:change={() => changeProfilePicture(event)}
            hidden
          />
        </div>

        <div>
          <h1 class="text-2xl font-semibold">{data.user[0].username}</h1>
        </div>
      </div>

      <!-- Vertical Line -->
      <div class="bg-orange-200 w-px h-40 mx-3"></div>

      <!-- User Info -->
      <div class="flex-1">
        <p class="text-sm mb-2">From - {data.user[0].location}</p>
        <p class="text-sm mb-2">Email - {data.user[0].email}</p>
        <p class="text-sm mb-2">Joined on - {data.user[0].joiningdate}</p>
        <p class="text-sm mb-2">Contact No - {data.user[0].phonenumber}</p>
      </div>

      <!-- Vertical Line -->
      <div class="bg-orange-200 w-px h-40 mx-3"></div>
    </div>

    <!-- About Section -->
    <div class="mb-12 mt-16 relative">
      <h3 class="font-bold mb-2.5">About me</h3>
      <div class="relative">
        <p
          id="aboutText"
          class="bg-orange-100 p-2.5 rounded-md w-full relative"
        >
          {data.user[0].bio}
          <a
            href="#"
            id="editButton"
            class="absolute bottom-6 right-0 mr-1 mt-2 cursor-pointer"
          >
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <img
              src="./icons/edit.png"
              class="w-5 h-5 border-1 border-white"
              on:click={openModal}
            />
            <!-- <button class="px-4 py-2 bg-orange-400 text-white rounded hover:bg-orange-600" on:click={openModal}>
              Send Request
          </button> -->
          </a>
        </p>
      </div>
    </div>

    {#if isModalOpen}
      <div class="fixed inset-0 flex items-center justify-center z-50">
        <div class="modal bg-orange-200 rounded-lg p-6">
          <h2 class="text-xl font-semibold mb-4">Edit Your Bio</h2>
          <!-- <h3 class="text-lg mb-2">State the Reason why do you prefer him as a Moderator?</h3> -->
          <hr class="h-px w-full my-2 bg-zinc-800 border-0 dark:bg-zinc-700" />
          <textarea
            class="w-full h-32 rounded border p-2 mb-4 bg-orange-100"
            placeholder="Type your message here"
          ></textarea>
          <div class="flex justify-end">
            <button
              class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              on:click={editAbout}>Change</button
            >
            <!-- <button class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 ml-2" on:click={closeModal}>Cancel</button> -->
          </div>
        </div>
      </div>
    {/if}

    <!-- Mutual Groups -->
    <div class="mb-5">
      <h2 class="text-lg mb-2.5 font-bold">My Groups</h2>
      <div class="bg-orange-300 gap-4 mb-2 w-full h-px mx-3"></div>
      {#if data.admin_groups}
        <div class="space-y-">
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
              <span class="text-sm font-medium text-gray-800"
                >{group.group_name}</span
              >
            </a>
          {/each}
        </div>
      {/if}
    </div>

    <!-- Mutual Groups -->
    <div class="mb-5">
      <h2 class="text-lg mb-2.5 font-bold">My Other Groups</h2>
      <div class="bg-orange-300 gap-4 mb-2 w-full h-px mx-3"></div>
      {#if data.non_admin_groups}
        <div class="space-y-">
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
              <span class="text-sm font-medium text-gray-800"
                >{group.group_name}</span
              >
            </a>
          {/each}
        </div>
      {/if}
    </div>
  </div>
</div>
