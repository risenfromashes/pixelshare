<script>
    export let coverPhotoSrc = "sample/sample.jpg"; // Source path or URL of the cover photo
    export let profilePhotoSrc = "demo-logo.png"; // Source path or URL of the profile photo
    export let alt = "Profile Photo"; // Alt text for accessibility
    export let groupName = "BUET CSE-19"; // Alt text for accessibility
  </script>
  
  <style>
    /* Common styling for both cover and profile photos */
    .photo {
      width: 100%;
      height: 100%;
      object-fit: cover;
      /* border-radius: 50%; To create a circular profile photo */
    }
  
    /* Styling specific to cover photo */
    .cover-container {
      position: relative;
      height: 300px; /* Adjust the height as needed */
    }
  
    /* Styling specific to profile photo */
    .profile-container {
      position: absolute;
      top: 115%;
      left: 50%;
      transform: translate(-50%, -100%);
      width: 100px; /* Adjust the size of the profile photo */
      height: 100px; /* Adjust the size of the profile photo */
        border-radius: 50%; 
    }
  </style>
  
  <div class="cover-container">
    <!-- Cover photo -->
    <img class="photo" src={coverPhotoSrc} alt={alt}>
    
    <!-- Profile photo -->
    <!-- <div class="profile-container">
      <img class="photo" src={profilePhotoSrc} alt={alt}>
       Username
        <!-- <div class="username">{groupName}</div>
    </div> -->
  </div>
  