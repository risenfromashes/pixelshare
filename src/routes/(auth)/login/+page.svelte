<script lang="ts">
  export let form;

  let email: String;
  let password: String;
  let showPassword: boolean = false;
  let emailError: boolean = false;
  let passwordError: boolean = false;

  $: emailError = email && (!email.includes("@") || !email.includes("."));
  $: passwordError = password && password.length < 8;
  $: type = showPassword ? "text" : "password";

  $: {
    email = form?.email || "";
  }
</script>

<div class="flex flex-col lg:flex-row h-screen w-full bg-cover bg-center">
  <div
    class="flex flex-col justify-center items-center lg:max-w-xl lg:w-full w-full h-full py-6 shadow-md bg-gray-300 px-10 lg:px-20"
  >
    <form
      method="POST"
      class="w-full flex flex-col justify-center items-center"
    >
      <!-- Logo -->
      <div class="flex justify-center mb-4">
        <img src="demo-logo.png" alt="Pixel Share" class="h-32 w-32" />
      </div>

      {#if form?.emailInvalid || form?.passwordInvalid || form?.error}
        <div
          class="block w-full font-bold px-4 py-3 bg-red-100 rounded text-left text-xs text-red-500 mb-4"
        >
          {#if form?.emailInvalid}
            <p>Email address invalid.</p>
          {:else if form?.passwordInvalid}
            <p>Password is invalid.</p>
          {:else if form?.error}
            <p>{form?.error}</p>
          {/if}
        </div>
      {/if}

      <!-- Email Input -->
      <div class="w-full mb-4">
        <label for="email" class="block text-sm font-bold text-gray-700"
          >Email</label
        >
        <input
          id="email"
          name="email"
          type="text"
          placeholder="john@doe.com"
          bind:value={email}
          class={"mt-1 block w-full px-3 py-2 border-2 border-blue-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm bg-white text-gray-900 " +
            (emailError ? "border-red-500 focus:border-red-500" : "")}
        />
      </div>
      {#if emailError}
        <div class="block w-full text-left text-xs text-red-500 mb-4">
          <p>Please enter a valid email address.</p>
        </div>
      {/if}

      <!-- Password Input -->
      <div class="w-full mb-2">
        <label for="password" class="block text-sm font-bold text-gray-700"
          >Password</label
        >
        <input
          id="password"
          name="password"
          {...{ type }}
          bind:value={password}
          placeholder="••••••••"
          class={"mt-1 block w-full px-3 py-2 border-2 rounded-md shadow-sm  focus:outline-none text-sm bg-white text-gray-900 " +
            (passwordError
              ? "border-red-500 focus:border-red-500"
              : "border-gray-300  focus:ring-indigo-500 focus:border-indigo-500")}
        />
      </div>
      {#if passwordError}
        <div class="block w-full text-left text-xs text-red-500 mb-4">
          <p>Password must be at least 8 characters long.</p>
        </div>
      {/if}

      <!-- Show Password Checkbox -->
      <div class="w-full flex flex-row items-center justify-start mb-4 lg:mb-4">
        <label for="showpass" class="text-sm pr-2 text-neutral-950">
          Show Password
        </label>
        <input id="showpass" type="checkbox" bind:checked={showPassword} />
      </div>
      <div
        class="w-full flex flex-col 2xl:flex-row items-center justify-between mb-4 lg:mb-6"
      >
        <div class="text-sm text-gray-700 mb-4 lg:mb-0">
          Not a user yet?
          <a
            href="/register"
            class="font-bold text-sky-600 hover:text-indigo-500">Sign up</a
          >
        </div>
        <div class="text-sm text-gray-700">
          Dementia?
          <a
            href="/recover"
            class="font-bold text-sky-600 hover:text-indigo-500"
            >Recover Password</a
          >
        </div>
      </div>
      <!-- Login Button -->
      <button
        class="w-fit border-2 bg-sky-500 border-sky-700 disabled:bg-sky-200 disabled:border-sky-300 inline-flex justify-center rounded-md shadow-sm px-24 py-3 font-bold text-white hover:bg-sky-600 focus:outline-none text-sm"
        disabled={!email || !password || emailError || passwordError}
        >Login</button
      >
    </form>
  </div>
  <div
    class="relative w-full h-64 lg:h-auto lg:min-w-fit lg:w-full flex flex-col justify-center text-center p-6 lg:p-24 bg-gray-300"
  >
    <!-- Background and Text similar to register page -->
    <img
      src="demo-login-bg.jpg"
      alt="background"
      class="w-full h-full inset-0 absolute object-cover z-0 opacity-60"
    />
    <p class="text-gray-800 text-4xl lg:text-6xl font-bold z-10 opacity-80">
      Don't be scared,
    </p>
    <p
      class="text-blue-600 text-5xl lg:text-7xl font-bold mt-4 lg:ml-36 z-10 opacity-80"
    >
      Express Yourself
    </p>
  </div>
</div>
