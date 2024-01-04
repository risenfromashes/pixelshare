<script>
  // Svelte script logic goes here
</script>

<div class="flex flex-row h-screen bg-cover bg-center">
  <div class="max-w-lg w-full flex-grow flex items-center justify-start">
    <div
      class="flex flex-col justify-center items-center w-full h-full p-6 shadow-md bg-white dark:bg-gray-900 px-12"
    >
      <div class="flex justify-center mb-6">
        <img src="demo-logo.png" alt="Pixel Share" class="h-32 w-32" />
      </div>

      <div class="w-full mb-4">
        <label
          for="username"
          class="block text-sm font-bold text-gray-700 dark:text-gray-300"
          >Username</label
        >
        <input
          id="username"
          type="text"
          class="mt-1 block w-full px-3 py-2 dark:bg-white border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 dark:focus:ring-blue-500 focus:border-indigo-500 dark:focus:border-blue-500 sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-600"
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
          class="mt-1 block w-full px-3 py-2 dark:bg-white border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 dark:focus:ring-blue-500 focus:border-indigo-500 dark:focus:border-blue-500 sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-600"
        />
      </div>

      <div class="w-full flex items-center justify-between mb-10">
        <div class="text-sm text-neutral-950 dark:text-neutral-50">
          Not a user yet?
          <a
            href="#register"
            class="font-bold text-sky-600 dark:text-sky-500 hover:text-indigo-500 dark:hover:text-sky-400"
            >Sign up</a
          >
        </div>
        <div class="text-sm text-neutral-950 dark:text-neutral-50">
          Dementia?
          <a
            href="#recover"
            class="font-bold text-sky-600 dark:text-sky-500 hover:text-indigo-500 dark:hover:text-sky-400"
            >Recover Password</a
          >
        </div>
      </div>

      <button
        class="w-fit inline-flex justify-center rounded-md shadow-sm px-24 py-3 bg-indigo-600 dark:bg-sky-700 text-base font-bold text-white hover:bg-indigo-700 dark:hover:bg-sky-800 focus:outline-none sm:text-sm border border-sky-400"
        >Login</button
      >
    </div>
  </div>

  <div
    class="flex flex-col min-w-fit w-full justify-center text-left p-24 bg-center bg-cover bg-gray-100 dark:bg-black"
    style="background-image: url('demo-login-bg.png');"
  >
    <p class="text-gray-800 dark:text-white text-7xl font-bold mt-48">
      Don't be scared,
    </p>
    <p class="ml-36 text-blue-500 dark:text-sky-300 text-8xl font-bold">
      Express Yourself
    </p>
  </div>
</div>
