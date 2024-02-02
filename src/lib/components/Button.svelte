<script>
    import Spinner from "./Spinner.svelte";
    export let loading = false;
    export let disabled = false;
    export let text = "Click Me";
    export let colour = "orange";
</script>

<button
    class="flex flex-row px-8 py-2 shadow-md border border-{colour}-700 bg-{colour}-500 text-white font-semibold rounded hover:bg-{colour}-600 disabled:bg-{colour}-300 disabled:cursor-not-allowed"
    disabled={disabled || loading}
>
    {#if loading}
        <Spinner size={4} className="mr-4" />
    {/if}
    <p>{text}</p>
</button>
