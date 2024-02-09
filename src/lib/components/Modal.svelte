<script>
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";

  export let showModal; // boolean
  export let className = "";

  let dialog; // HTMLDialogElement
  const handleClose = () => {
    // don't let the modal to be closed by other events
    if ($page.url.searchParams.get("upload") != null) {
      dialog.showModal();
    }
  };
  const closeModal = () => {
    dialog.close();
    $page.url.searchParams.delete("upload");
    goto($page.url);
  };
  $: if (dialog && showModal) dialog.showModal();
</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<dialog class={className} bind:this={dialog} on:close={handleClose}>
  <div class="flex flex-row justify-end">
    <button class="text-2xl p-2" on:click={closeModal}>&times;</button>
  </div>
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div on:click|stopPropagation>
    <slot name="header" />
    <hr />
    <slot />
    <hr />
  </div>
</dialog>

<style>
  @keyframes zoom {
    from {
      transform: scale(0.95);
    }
    to {
      transform: scale(1);
    }
  }
  dialog[open]::backdrop {
    animation: fade 0.2s ease-out;
  }
  @keyframes fade {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  button {
    display: block;
  }
</style>
