<script lang="ts">
    import { Icon } from "$lib";
    import FaIcon from "./FaIcon.svelte";

    // import Spinner from "./Spinner.svelte"; // or import Skeleton from './Skeleton.svelte';
    export let src: string;
    let loaded = false;

    const onload = (e: any) => {
        console.log("loaded");
        loaded = true;
    };
</script>

<div class="relative w-full h-full">
    <div
        class="flex flex-col justify-center items-center
             bg-orange-200 w-auto h-full animate-pulse
             rounded-lg border-2 border-orange-200 shadow-lg {loaded
            ? 'hidden'
            : 'block'}"
    >
        <FaIcon
            icon={Icon.IMAGE}
            className="object-cover w-24 mr-2"
            fill="#FFF7ED"
            initClass="opacity-0"
        ></FaIcon>
    </div>
    <!-- or <Skeleton width="full" height="20" /> -->
    <img
        {src}
        alt="Random"
        class="w-auto h-full transition-opacity duration-500 ease-in-out object-contain rounded-lg border-2 border-orange-200 shadow-lg {loaded
            ? 'opacity-100'
            : 'opacity-0'}"
        use:onload
    />
</div>
