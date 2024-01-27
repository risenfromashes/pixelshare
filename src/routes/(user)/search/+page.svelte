<script>
    // Include any required JavaScript logic here
    let results = 20; // This could be dynamically set based on search results


    import { onMount } from "svelte";
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

    let images = [
    { id: 1, url: 'sample/sample.jpg', date: '2024-01-20' },
    { id: 2, url: 'sample/sample.jpg', date: '2024-01-18' },
    // More image objects...
  ];

  const tagNames=[
    {tagId: 1, tagName:'ECE'},
    {tagId: 2, tagName:'OAB'},
  ]

  // Function to sort images by date
  const sortImagesByDate = () => {
    images.sort((a, b) => new Date(b.date) - new Date(a.date));
  };

  // Sort images on initial load
  sortImagesByDate();
  </script>
  
  <div class="flex h-screen bg-gray-900 text-white">
    <!-- Sidebar -->
    <div
        class="absolute inset-y-0 left-0 hidden xl:flex flex-col justify-start items-start w-fit p-6 space-y-6 bg-orange-100 border border-orange-200 shadow-lg scroll-hidden"
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
					<span class="ml-3 text-black">{item.name}</span>
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
				<span class="ml-3 text-black">Profile</span>
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

    <div class="flex-1 xl:px-64 px-4 py-8 overflow-y-auto bg-orange-50 scroll-hidden">
        <div >
            <!-- Content Area with image grid -->
            <div class="flex-grow p-4 overflow-auto">
              <h1 class="text-2xl mb-4 text-black">Images by Date</h1>
              <div class="grid grid-cols-4 gap-4">
                {#each images as image}
                  <div class="relative">
                    <img src={image.url} alt={`Image taken on ${image.date}`} class="w-full h-full object-cover" />
                    <div class="absolute bottom-0 left-0 right-0 bg-gray-700 bg-opacity-50 text-white text-sm p-2">
                      {image.date}
                    </div>
                  </div>
                {/each}
              </div>
            </div>
          </div>
    </div>
  
    <!-- Right Sidebar for Filters and Sorting -->
   <!-- Right Sidebar for Filters and Sorting -->
<div class="absolute z-10 inset-y-0 right-0 hidden xl:block h-screen w-64 p-4 space-y-6 bg-orange-100 border border-orange-200 shadow-lg scroll-hidden">
    <!-- Filters Section -->
    <div>
      <h2 class="text-lg mb-2  bg-orange-300 text-black">Filters</h2>
      <div class="space-y-4 text-lg mb-2 bg-orange-200 text-black"> 
        <h3 class="text-lg mb-2 bg-orange-200 text-black">By Date</h3>

        <div class="flex items-left flex-col">
            <label class="mb-2 text-medium ">Start Date:</label>
            <input type="date" class="p-2 bg-orange-400 border-2 border-orange-300 rounded">
          </div>
          
          <div class="flex items-left flex-col">
            <label class="mb-2 text-medium ">End Date:</label>
            <input type="date" class="p-2 bg-orange-400 border-2 border-orange-300 rounded">
          </div>
        
      </div>
    </div>

    <div class="text-lg mb-2 bg-orange-200 text-black">
        <h3 class="text-lg mb-2 bg-orange-200 text-black">By Tags</h3>
        <label class="block mb-2">
          <input type="checkbox" class="form-checkbox text-blue-500">
          <span class="ml-2">All</span>
        </label>
        {#each tagNames as tag}
          <label class="block">
            <input type="checkbox" class="form-checkbox text-blue-500">
            <span class="ml-2">{tag.tagName}</span>
          </label>
        {/each}
      </div>
      
  
    <!-- Sorting Section -->
    <div  class="text-lg mb-2 bg-orange-200 text-black">
        <h3 class="text-lg mb-2 bg-orange-200 text-black">Sort</h3>

      <div class="space-y-4">
        <div>
          <!-- Radio buttons for sorting -->
          <label class="flex items-center">
            <input type="radio" name="order" class="form-radio text-blue-500">
            <span class="ml-2 text-black">Ascending</span>
          </label>
          <label class="flex items-center">
            <input type="radio" name="order" class="form-radio text-blue-500">
            <span class="ml-2 text-black">Descending</span>
          </label>
        </div>
      </div>
    </div>
<!-- </div> -->

<div class="text-lg mb-2 bg-orange-200 text-black">
    <h3 class="text-lg mb-2 bg-orange-200 text-black">Sort By</h3>
    <label class="flex items-center">
        <input type="radio" name="order" class="form-radio text-blue-500">
        <span class="ml-2 text-black">Date</span>
      </label>
      <label class="flex items-center">
        <input type="radio" name="order" class="form-radio text-blue-500">
        <span class="ml-2 text-black">Caption</span>
      </label>
      <label class="flex items-center">
        <input type="radio" name="order" class="form-radio text-blue-500">
        <span class="ml-2 text-black">Tag</span>
      </label>
  </div>
  </div>
  
</div>
  