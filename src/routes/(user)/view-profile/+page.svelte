<script>
    // Example data to mimic the interface
    let user = {
      username: "faria_2719",
      name: "Faria Binte Awal",
      location: "Dhaka, Bangladesh",
      department: "Dept. of CSE, BUET",
      joined: "March, 2023",
      about: "Embracing the beautiful chaos......",
      mutualGroups: [
        { name: "BUET", icon: "🏫" },
        { name: "CSE '19", icon: "👩‍🎓" },
        { name: "PixelShare Devs", icon: "👨‍💻" }
      ],
      badges: [
        { title: "Top Contribution", icon: "🌟" },
        { title: "Group Expert", icon: "🏅" },
        { title: "PixelShare Developer", icon: "🛠️" }
      ]
    };
</script>

<div class="flex h-screen bg-gray-900">
  <!-- Sidebar -->
  <!-- ... Sidebar content using Tailwind CSS ... -->

  <!-- Main Content -->
  <div class="flex-1 xl:px-64 px-4 py-8 overflow-y-auto bg-orange-50 text-black">
    <!-- Profile Header and Badges -->
    <div class="flex justify-between items-start mb-5">
      <!-- Profile Picture and Details -->
      <div class="flex items-center mr-8">
        <img src="sample/sample.jpg" alt="Profile Picture" class="rounded-full w-24 h-24 mr-5 border-4 border-white">

        <div>
          <h1 class="text-2xl font-semibold">{user.name}</h1>
        </div>
      </div>

      <!-- Vertical Line -->
      <div class="bg-black w-px h-24 mx-8"></div>

      <!-- User Info -->
      <div class="flex-1">
        <p class="text-sm mb-2">📍 Lives in {user.location}</p>
        <p class="text-sm mb-2">🎓 Studies at {user.department}</p>
        <p class="text-sm mb-2">📅 Joined on {user.joined}</p>
      </div>

      <!-- Vertical Line -->
      <div class="bg-black w-px h-24 mx-8"></div>

      <!-- Badges -->
      <div class="flex-1">
        <h2 class="text-lg mb-2.5">Badges</h2>
        <div class="flex flex-col">
          {#each user.badges as badge}
            <div class="flex items-center mb-1.5">
              <span class="text-3xl mr-2.5">{badge.icon}</span>
              <span>{badge.title}</span>
            </div>
          {/each}
        </div>
      </div>
    </div>

    <!-- About Section -->
    <div class="mb-12 mt-16">
      <h2 class="text-lg mb-2.5">About me</h2>
   <p class="bg-orange-100 p-2.5 rounded-md w-3/4">{user.about}</p>

    </div>
    
    <!-- Mutual Groups -->
    <div class="mb-5">
      <h2 class="text-lg mb-2.5">Mutual Groups ({user.mutualGroups.length})</h2>
      <div class="flex flex-wrap gap-2.5">
        {#each user.mutualGroups as group}
          <div class="bg-orange-100 p-2.5 rounded-lg w-1/5">{group.icon} {group.name}</div>
        {/each}
      </div>
    </div>
  </div>
</div>
