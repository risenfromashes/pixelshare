<script>
    import { writable } from 'svelte/store';
    import { goto, invalidateAll, onNavigate } from "$app/navigation";
    import { enhance } from "$app/forms";
  
    export let data;

    let success=false;

    let username=writable(data.user[0].username);
    // let email = writable(data.user[0].email);
    let location = writable(data.user[0].location);
    let bio = writable(data.user[0].bio);
    let phonenumber=writable(data.user[0].phonenumber);
    // async function updateProfile() {
    //   const updatedData = {
    //     username: $username,
    //     email: $email,
    //     location: $location,
    //     bio: $bio,
    //   };
    //   // Submit these details to your backend
    //   console.log('Updated Profile:', updatedData);
    //   // Add API call to update user data here

    function editAbout(event) 
    {
        //edit blabla
        username=$username;
    }
    // }
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
              <!-- <img
                src="./icons/camera.png"
                alt="File Picker"
                class="w-10 h-10 p-2 bg-white-300 rounded-full"
              /> -->
            </label>
            <!-- <input
              type="file"
              id="profile-image-input"
              accept="image/*"
              on:change={() => changeProfilePicture(event)}
              hidden
            /> -->
          </div>
  
          <div>
            <h1 class="text-2xl font-semibold">{data.user[0].username}</h1>
          </div>
        </div>
  
      </div>
  
     
    <!-- About Section -->
    <form
    class="request-item flex flex-col  bg-black-100 border-2 border-orange-200 p-4 rounded-lg shadow-lg hover:bg-orange-200 transition-colors duration-200 ease-in-out"
    method="POST"
    on:submit
    enctype="multipart/form-data"
    use:enhance={({ formElement, cancel }) => {
        success = false;
        return async ({ result }) => {
            if (result.type === "success") {
                success = true;
                formElement.reset();
                invalidateAll();
            }
        };
    }}
  > 
    <div>
        <input type="hidden" name="userId" bind:value={data.user_id}/>
      <h3 class="font-bold mb-2.5">User Name</h3>
      <textarea class="w-full h-20 rounded border p-2 mb-4 bg-orange-100" placeholder="Type your username here" name="username" bind:value={$username}></textarea>
  
      <h3 class="font-bold mb-2.5">BIO</h3>
      <textarea class="w-full h-20 rounded border p-2 mb-4 bg-orange-100" placeholder="Type your Bio here" name="bio" bind:value={$bio}></textarea>
  
      <h3 class="font-bold mb-2.5">Location</h3>
      <textarea class="w-full h-16 rounded border p-2 mb-4 bg-orange-100" placeholder="Type your Location here" name="location" bind:value={$location}></textarea>
  
      <h3 class="font-bold mb-2.5">Phone Number</h3>
      <textarea class="w-full h-16 rounded border p-2 mb-4 bg-orange-100" placeholder="Type your Phone number here" name="phonenumber" bind:value={$phonenumber}></textarea>
    </div>
  
    <button class="w-20 h-10 px-4 py-2 m-4 bg-green-500 text-white rounded hover:bg-green-600" on:click={(event) => editAbout( event)}>Save</button>
    </form>    
   </div>
  </div>