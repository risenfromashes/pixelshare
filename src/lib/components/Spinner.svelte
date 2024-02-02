<script lang="ts">
    export let size = 4; // Default size (Tailwind class, e.g., '4' for w-4 h-4)
    export let colour = "orange";
    export let className = "";
</script>

<div
    class="w-auto h-full flex flex-col justify-center items-center {className}"
>
    <div
        class={`w-${size} h-${size} border-2 border-t-2 border-${colour}-200 border-t-${colour}-500 rounded-full animate-spin`}
    ></div>
</div>
