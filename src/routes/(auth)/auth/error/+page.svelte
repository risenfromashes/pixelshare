<script>
    import { page } from "$app/stores";

    let error = "";
    // get the error from search parameters
    $: {
        error = $page.url.searchParams.get("error") ?? "";
    }
</script>

<main class="flex flex-col items-center justify-center h-screen text-center">
    <h1 class="text-2xl mb-4">Oops! Something unexpected has occurred.</h1>
    <p class="text-red-500 text-lg">{error}</p>
</main>
