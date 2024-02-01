<script lang="ts">
    import { Icon } from "$lib";
    import { onMount } from "svelte";

    const srcPath = "/icons/fa-svg/";

    export let icon: Icon;
    export let className: string;
    export let fill: string;
    export let initClass = "opacity-100";

    let iconDiv: Element;

    let loaded = false;

    onMount(() => {
        const object = document.createElement("object");
        object.data = srcPath + icon + ".svg";
        object.type = "image/svg+xml";
        object.classList.add("w-full", "h-full");

        object.onload = () => {
            loaded = true;
            let doc = object.getSVGDocument();
            doc?.querySelector("path")?.setAttribute("fill", fill);
        };

        iconDiv.appendChild(object);
    });
</script>

<div
    bind:this={iconDiv}
    class={`${className} ` + (loaded ? "opacity-100" : initClass)}
></div>
