<script>
  export let size = 4; // Default size (Tailwind class, e.g., '4' for w-4 h-4)
  export let className = ""; // Additional classes
</script>

<div
  class={`w-${size} h-${size} border-2 border-t-2 border-gray-200 border-t-blue-600 rounded-full animate-spin ${className}`}
></div>
