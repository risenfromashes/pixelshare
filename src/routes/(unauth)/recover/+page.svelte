<script lang="ts">
    import { fly } from "svelte/transition";

    let sent: boolean = false;
</script>

<div class="flex flex-col lg:flex-row h-screen w-screen bg-cover bg-center">
    <div
        class="flex flex-col justify-center items-center w-full h-full py-6 shadow-md bg-white dark:bg-gray-900 px-10 lg:px-20"
    >
        <div class="flex justify-center mb-8">
            <img src="demo-logo.png" alt="Pixel Share" class="h-32 w-32" />
        </div>

        <div class="w-80 mb-6">
            <label
                for="email"
                class="block text-sm font-bold text-gray-700 dark:text-gray-300"
                >Email</label
            >
            <input
                id="Email"
                placeholder="john@doe.com"
                type="text"
                class="mt-1 block w-full px-3 py-2 dark:bg-white border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 dark:focus:ring-blue-500 focus:border-indigo-500 dark:focus:border-blue-500 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-600"
            />
        </div>

        <button
            class="w-80 mb-4 inline-flex justify-center rounded-md border dark:border-sky-500 shadow-sm px-24 py-3 bg-indigo-600 dark:bg-sky-700 text-base font-bold text-white hover:bg-indigo-700 dark:hover:bg-sky-800 focus:outline-none text-sm"
            >{sent ? "Resend Email" : "Send Email"}</button
        >
        <div class="text-left text-left text-gray-400 w-80 mb-4">
            <p>A password reset link will be sent to the email you provide.</p>
        </div>
        <div class="text-left text-left text-gray-400 w-80">
            <p>
                Wish to try again?
                <a href="/login" class="font-bold text-blue-500">Login</a>
            </p>
        </div>
    </div>
</div>
