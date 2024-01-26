<script lang="ts">
    export let form;

    let currentPassword: string = "";
    let newPassword: string = "";
    let confirmPassword: string = "";
    let showPassword: boolean = false;
    let passwordMismatch: boolean = false;
    let passwordError: boolean = false;

    $: passwordMismatch = newPassword !== confirmPassword;
    $: passwordError = Boolean(newPassword) && newPassword.length < 8;
    $: type = showPassword ? "text" : "password";
</script>

<div
    class="flex flex-col justify-center lg:flex-row h-screen w-full bg-cover bg-center bg-gray-300"
>
    <div
        class="flex flex-col justify-center items-center lg:max-w-xl lg:w-full w-full h-full py-6 shadow-md lg:px-20 px-10"
    >
        <!-- Logo -->
        <div class="flex justify-center mb-8">
            <img src="demo-logo.png" alt="Pixel Share" class="h-32 w-32" />
        </div>
        <h1 class="text-2xl font-bold mb-16">Update Password</h1>
        <!-- Success/Error Messages -->
        {#if form?.error}
            <div
                class="block w-full bg-red-200 px-4 py-2 font-bold text-left text-xs rounded text-red-500 mb-4"
            >
                <p>{form?.error}</p>
            </div>
        {/if}

        <!-- Form -->
        <form
            class="w-full flex flex-col justify-center items-center"
            method="POST"
        >
            <!-- New Password Input -->
            <div class="w-full mb-2">
                <label
                    for="newPassword"
                    class="block text-sm font-bold text-gray-700"
                    >New Password</label
                >
                <input
                    id="newPassword"
                    {...{ type }}
                    name="password"
                    bind:value={newPassword}
                    placeholder="••••••••"
                    class={"mt-1 block w-full px-3 py-2 border-2 rounded-md shadow-sm focus:outline-none text-sm bg-white text-gray-900 " +
                        (passwordError
                            ? "border-red-500 focus:border-red-500"
                            : "border-gray-300 focus:ring-indigo-500 focus:border-indigo-500")}
                />
                {#if passwordError}
                    <div
                        class="block w-full text-left text-xs text-red-500 mb-4"
                    >
                        <p>Password must be at least 8 characters long.</p>
                    </div>
                {/if}
            </div>

            <!-- Confirm New Password Input -->
            <div class="w-full mb-2">
                <label
                    for="confirmPassword"
                    class="block text-sm font-bold text-gray-700"
                    >Confirm New Password</label
                >
                <input
                    id="confirmPassword"
                    {...{ type }}
                    bind:value={confirmPassword}
                    placeholder="••••••••"
                    class={"mt-1 block w-full px-3 py-2 border-2 rounded-md shadow-sm focus:outline-none text-sm bg-white text-gray-900 " +
                        (passwordMismatch
                            ? "border-red-500 focus:border-red-500"
                            : "border-gray-300 focus:ring-indigo-500 focus:border-indigo-500")}
                />
                {#if passwordMismatch}
                    <div
                        class="block w-full text-left text-xs text-red-500 mb-4"
                    >
                        <p>Passwords do not match.</p>
                    </div>
                {/if}
            </div>

            <!-- Show Password Checkbox -->
            <div class="w-full flex flex-row items-center justify-start mb-4">
                <label for="showpass" class="text-sm pr-2 text-neutral-950"
                    >Show Password</label
                >
                <input
                    id="showpass"
                    type="checkbox"
                    bind:checked={showPassword}
                />
            </div>

            <!-- Update Password Button -->
            <button
                type="submit"
                class="w-fit mt-4 border-2 bg-sky-500 border-sky-700 disabled:bg-sky-200 disabled:border-sky-300 inline-flex justify-center rounded-md shadow-sm px-24 py-3 font-bold text-white hover:bg-sky-600 focus:outline-none text-sm"
                disabled={!newPassword || passwordMismatch || passwordError}
                >Update Password</button
            >
        </form>
    </div>
</div>
