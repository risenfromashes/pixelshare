<script>
    import { fade, fly } from "svelte/transition";

    // Svelte script logic goes here
</script>

<div class="flex flex-col lg:flex-row h-screen w-screen bg-cover bg-center">
    <div
        class="relative w-full h-64 lg:h-auto lg:min-w-fit lg:w-full flex flex-col justify-center text-center p-6 lg:p-24 bg-gray-100 dark:bg-black"
    >
        <img
            src="demo-register-bg.jpg"
            alt="background"
            class="w-full h-full inset-0 opacity-30 absolute object-cover"
        />
        <p class="text-gray-800 dark:text-white text-4xl lg:text-7xl font-bold">
            Capture every moment,
        </p>
        <p
            class="text-blue-500 dark:text-sky-300 text-5xl lg:text-8xl font-bold mt-4 lg:ml-36"
        >
            In Pixels!
        </p>
    </div>
    <div
        class="flex flex-col justify-center items-center lg:max-w-xl lg:w-full w-full h-full py-6 shadow-md bg-white dark:bg-gray-900 px-10 lg:px-20"
    >
        <div class="flex justify-center mb-4">
            <img src="demo-logo.png" alt="Pixel Share" class="h-32 w-32" />
        </div>
        <div class="text-xs text-center text-teal-900 dark:text-teal-400 mb-8">
            <p>The Ultimate Platform to Share Your Pixels</p>
        </div>

        <div class="w-full mb-4">
            <label
                for="email"
                class="block text-sm font-bold text-gray-700 dark:text-gray-300"
                >Email</label
            >
            <input
                id="email"
                type="text"
                placeholder="john@doe.com"
                class="mt-1 block w-full px-3 py-2 dark:bg-white border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 dark:focus:ring-blue-500 focus:border-indigo-500 dark:focus:border-blue-500 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-600"
            />
        </div>

        <div class="w-full mb-2">
            <label
                for="password"
                class="block text-sm font-bold text-gray-700 dark:text-gray-300"
                >Password</label
            >
            <input
                id="password"
                type="password"
                placeholder="••••••••"
                class="mt-1 block w-full px-3 py-2 dark:bg-white border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 dark:focus:ring-blue-500 focus:border-indigo-500 dark:focus:border-blue-500 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-600"
            />
        </div>

        <div class="w-full mb-2">
            <label
                for="password"
                class="block text-sm font-bold text-gray-700 dark:text-gray-300"
                >Confirm Password</label
            >
            <input
                id="password"
                type="password"
                placeholder="••••••••"
                class="mt-1 block w-full px-3 py-2 dark:bg-white border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 dark:focus:ring-blue-500 focus:border-indigo-500 dark:focus:border-blue-500 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-600"
            />
        </div>

        <div
            class="w-full flex flex-col lg:flex-row items-center justify-between mb-6 lg:mb-10"
        >
            <div class="flex flex-row">
                <label
                    for="showpass"
                    class="text-sm pr-2 text-neutral-950 dark:text-neutral-50"
                >
                    Show Passwords
                </label>
                <input id="showpass" type="checkbox" />
            </div>

            <div class="text-sm text-neutral-950 dark:text-neutral-50">
                Already a user?
                <a
                    href="/login"
                    class="font-bold text-sky-600 dark:text-sky-500 hover:text-indigo-500 dark:hover:text-sky-400"
                    >Login</a
                >
            </div>
        </div>

        <button
            class="w-fit inline-flex justify-center rounded-md border dark:border-sky-500 shadow-sm px-24 py-3 bg-indigo-600 dark:bg-sky-700 text-base font-bold text-white hover:bg-indigo-700 dark:hover:bg-sky-800 focus:outline-none text-sm"
            >Register</button
        >
    </div>
</div>
