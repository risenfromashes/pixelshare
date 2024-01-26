<script>
    import { Icon } from "$lib";
    import FaIcon from "$lib/components/FaIcon.svelte";

    // Placeholder data for sidebar and main content items
    const sidebarItems = [
        { name: "Home", icon: Icon.HOUSE },
        { name: "Search", icon: Icon.MAGNIFYING_GLASS },
        { name: "Notifications", icon: Icon.BELL },
        { name: "Settings", icon: Icon.GEAR },
    ];

    const userDetails = {
        name: "Ashrafur Rahman Khan",
        username: "risenfromashes",
        avatarUrl: "/risenfromashes.png",
        bio: "jibon bedonar",
        location: "City, Country",
        joinedDate: "January 1, 2022",
        education: "BUET CSE-19",
    };

    const mutualGroups = [
        {
            groupName: "Group 1",
            link: "sample/sample.jpg",
        },
        {
            groupName: "Group 2",
            link: "sample/sample.jpg",
        },
        {
           groupName: "Group 3",
            link: "sample/sample.jpg",
        },
    ];

    const badges = [
        {
            badgeName: "Top Contributor",
            link: "icons/badge1.png",
        },
        {
           badgeName: "group Expert",
            link: "icons/badge2.png",
        },
        {
              badgeName: "Developer",
            link: "icons/badge3.png",
        },
    ];

    const rightSidebarItems = {
        groups: ["BUET", "CSE '19", "PixelShare Devs"],
        friends: ["Faria Binte Awal", "Some Random Guy", "Md. Riyasat Hossain"],
    };
</script>

<div class="flex relative h-screen bg-zinc-950 text-white">
    <!-- Left Sidebar -->
    <div
        class="absolute inset-y-0 left-0 hidden xl:flex flex-col justify-start items-start w-fit p-6 space-y-6 bg-neutral-900"
    >
        <div class="flex flex-row justify-center items-center mt-8 xl:mt-6">
            <img src="demo-logo.png" alt="Pixel Share" class="h-12 w-12" />
            <p class="ml-4 font-semibold text-2xl text-sky-300">PixelShare</p>
        </div>
        <hr class="h-px w-full my-8 bg-zinc-800 border-0 dark:bg-neutral-700" />
        <nav class="w-full grow flex flex-col justify-center">
            {#each sidebarItems as item}
                <button
                    class="w-full flex items-center p-4 hover:bg-neutral-800 rounded"
                >
                    <FaIcon icon={item.icon} className="object-cover w-6 h-6" />

                    <span class="ml-3">{item.name}</span>
                </button>
            {/each}
        </nav>
        <div class="w-full flex flex-col">
            <button
                class="w-full flex items-center p-4 hover:bg-neutral-800 rounded"
            >
                <!-- <img
                    class="object-cover w-8 h-8 rounded-full border border-teal-500"
                    alt="icon"
                    src="icons/profile.png"
                /> -->
                <FaIcon
                    icon={Icon.CIRCLE_USER}
                    className="object-cover w-6 h-6 rounded-full border border-teal-500"
                />
                <span class="ml-3">Profile</span>
            </button>
            <form method="POST" action="?/logout">
                <button
                    class="flex items-center p-4 hover:bg-neutral-800 rounded"
                >
                    <!-- <img
                    class="object-cover w-8 h-8"
                    alt="icon"
                    src="icons/logout.png"
                /> -->
                    <FaIcon
                        icon={Icon.ARROW_RIGHT_FROM_BRACKET}
                        className="object-cover w-6 h-6"
                        fill="#ef4444"
                    />
                    <span class="ml-3 font-medium text-red-500">Log out</span>
                </button>
            </form>
        </div>
    </div>


         <!-- Main Content -->
    <div class="flex-1 xl:px-64 px-4 py-8 overflow-y-auto">
        <!-- <div class="flex items-center mb-8">
            <img src={userDetails.avatarUrl} alt="User Profile" class="h-16 w-16 rounded-full border border-teal-500" />
            <div class="ml-4">
                <h1 class="text-2xl font-bold">{userDetails.name}</h1>
                <p class="text-gray-400">@{userDetails.username}</p>
            </div>
        </div> -->

        <!-- User Info Section -->
        <div class="post-info">
        <div class="info-holder">
            <div >
                <span class="">
                <img src={userDetails.avatarUrl} alt="User Profile" class="h-16 w-16 rounded-full border border-teal-500" />
                </span>
                <div class="ml-4">
                    <h1 class="text-xl font-medium">{userDetails.name}</h1>
                    <p class="text-gray-400">@{userDetails.username}</p>
                </div>
            </div>
        </div>
        
        <div class="info-holder">
            
                <span class="post-container">
                    <img class="icon-image" src="icons/location.png" alt="Like Icon" />
                    {userDetails.location}
                  </span>
                  <span class="post-container">
                    <img class="icon-image" src="icons/clock.png" alt="Like Icon" />
                    {userDetails.joinedDate}
                  </span>
                  <span class="post-container">
                    <img class="icon-image" src="icons/edu.png" alt="Like Icon" />
                    {userDetails.education}
                  </span>
        
        </div>

        <div class="info-holder">
            <h1 class="text-xl font-medium align:left">Badges</h1>
           {#each badges as badge}
            <div>
                <div class="post-container">
                  <span>  <img src={badge.link} alt="User Profile" class="info-holder3 img" /> </span>
                   <span> <h2 class="text-10px font-medium padding-20px">{badge.badgeName}</h2> </span>
                </div>
              
            </div>
                
            {/each}
        </div>

    </div>

        <!-- Your existing content sections -->
       
       <p>About me</p> 
       <div class="about-info">
            {userDetails.bio}
       </div>
       <div >
        <p> Mutual Groups(3)<p>
     </div>
         <!-- <div class="horizontal-line"></div> -->

         <div class="post-info">
            {#each mutualGroups as groups,i}
            <div class="info-holder2">
                <div class="info-holder3">
                  <span>  <img src={groups.link} alt="User Profile" class="info-holder3 img" /> </span>
                   <span> <h1 class="text-xl font-bold">{groups.groupName}</h1> </span>
                </div>
                <!-- <img src="icons/profile.png" alt="User Profile" class="h-8 w-8 rounded-full border border-teal-500" />
                <h1 class="text-xl font-bold">{groups.groupName}</h1> -->
                </div>
                {#if (i + 1) % 3 === 0}
                <!-- Start a new row after every three groups -->
                <div style="width: 100%;"></div>
            {/if}
            {/each}
           
         </div>

         
    </div>




    <!-- Right Sidebar -->
    <div
        class="absolute inset-y-0 right-0 hidden xl:block h-full w-64 p-4 space-y-6 bg-neutral-900"
    >
        <div class="">
            <img src={userDetails.avatarUrl} alt="risenfromashes" />
        </div>

        <div class="space-y-4">
            <div class>
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
</div>
<slot />

<style>
    /* Your existing styles */

    .post-info {
        margin-top: 10px;
        padding-top: 10px;
        border-top: 1px solid #eee;
        display: flex;
        justify-content: space-between;
        background-color: #000;
    }

    .info-holder {
        margin: 80px 30px 30px 30px; /* Updated margin-top to 40px */
        width: 40%;
        padding: 30px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        color: #ccc;
        position: relative;
        background-color: #000;
    }

    .info-holder2 {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin: 50px 30px 30px 30px;
        padding: 15px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        color: #ccc;
        position: relative;
        background-color: #444;
        border-radius: 15px;
        width:100%;
    }

    .info-holder3 img {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        margin-right: 10px; /* Adjust margin as needed */
    }

    h1 {
        margin: 0;
        font-size: 1.5rem;
        text-align: center;
        flex-grow: 1; /* Allow group name to take remaining space */
    }
    .info-holder3 img {
        width: 30px; /* Adjust width as needed */
        height: 30px; /* Adjust height as needed */
        border-radius: 50%;
    }
    .info-holder::after {
        content: "";
        position: absolute;
        top: 0;
        bottom: 0;
        right: 0;
        width: 1px;
        background-color: #ccc;
    }
    .icon-image {
    width: 20px; /* Adjust the width as needed */
    height: 20px; /* Adjust the height as needed */
    margin-right: 8px; /* Adjust the margin between image and like count */
  }

    /* Additional styles for the header */
    .header {
        display: flex;
        align-items: center;
        margin-bottom: 10px;
    }
    h1 {
        margin: 0;
        font-size: 1.5rem; /* Adjust font size as needed */
        text-align: center; /* Center text horizontally */
    }

    .user-avatar {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        margin-right: 10px;
    }

    .user-info {
        flex-grow: 1;
    }
    .post-container {
    display: flex;
    /* align-items: center; */
    text-size: 10px;
    padding: 7px;
  }

    h2 {
        margin: 0;
        font-size: 1.2rem;
        text-color: #000;
    }

    p {
        margin: 0;
        color: #555;
    }
    .about-info {
        /* margin: 60px 30px 30px 30px; Updated margin-top to 40px
         */
        margin-top: 20px;
        width: 40%;
        height: 70px;
        padding: 20px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        color: #ccc;
        position: relative;
        background-color: #000;
        border-radius: 15px;

    }

    .horizontal-line {
        border-top: 1px solid #eee;
        margin-top: 20px;
    }
</style>
