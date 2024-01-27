<script>
  export let coverPhotoSrc = "/sample/sample.jpg";
  export let profilePhotoSrc = "demo-logo.png";
  export let alt = "Profile Photo";
  export let groupName = "BUET CSE-19";
</script>

<div class="relative h-72 w-full overflow-hidden">
  <!-- Cover photo -->
  <img
    class="w-full h-full object-cover"
    src={coverPhotoSrc}
    alt="Cover photo"
  />

  <!-- Profile photo -->
  <div
    class="absolute bottom-0 transform -translate-x-1/2 left-1/2 -translate-y-1/2 w-24 h-24 bg-white rounded-full overflow-hidden border-4 border-white"
  >
    <img class="w-full h-full object-cover" src={profilePhotoSrc} {alt} />
  </div>

  <!-- Group name -->
  <div class="absolute bottom-0 mb-20 ml-4 text-white text-2xl font-semibold">
    {groupName}
  </div>
</div>
