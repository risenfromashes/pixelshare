<script lang="ts">
    export let form;

    let email: String;
    let password: String;
    let confirmPassword: String;
    let showPassword: boolean = false;

    export let type = "password";

    let emailError: boolean = false;
    let passwordError: boolean = false;
    let passwordMismatch: boolean = false;

    $: passwordError = password && password.length < 8;
    $: passwordMismatch =
        password && confirmPassword && password != confirmPassword;
    $: emailError = email && (!email.includes("@") || !email.includes("."));
    $: type = showPassword ? "text" : "password";

    $: {
        email = form?.email ?? "";
    }
</script>

<div class="flex flex-col lg:flex-row h-screen w-full bg-cover bg-center">
    <div
        class="relative w-full h-64 lg:h-auto lg:min-w-fit lg:w-full flex flex-col justify-center text-center p-6 lg:p-24 bg-gray-300"
    >
        <img
            src="demo-register-bg.jpg"
            alt="background"
            class="w-full h-full inset-0 absolute object-cover z-0 opacity-60"
        />
        <p class="text-gray-800 text-4xl lg:text-6xl font-bold z-10 opacity-80">
            Capture every moment,
        </p>
        <p
            class="text-blue-600 text-5xl lg:text-7xl font-bold mt-4 lg:ml-36 z-10 opacity-80"
        >
            In Pixels!
        </p>
    </div>
    <div
        class="flex flex-col justify-center items-center lg:max-w-xl lg:w-full w-full h-full py-6 shadow-md bg-gray-300 px-10 lg:px-20"
    >
        <form
            method="POST"
            class="w-full flex flex-col justify-center items-center"
        >
            <div class="flex justify-center mb-4">
                <img src="demo-logo.png" alt="Pixel Share" class="h-32 w-32" />
            </div>
            <div class="text-xs text-center text-teal-900 mb-6">
                <p>The Ultimate Platform to Share Your Pixels</p>
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
                        (emailError
                            ? "border-red-500 focus:border-red-500"
                            : "")}
                />
            </div>
            {#if emailError}
                <div class="block w-full text-left text-xs text-red-500 mb-4">
                    <p>Please enter a valid email address.</p>
                </div>
            {/if}
            <div class="w-full mb-2">
                <label
                    for="password"
                    class="block text-sm font-bold text-gray-700"
                    >Password</label
                >
                <input
                    id="password"
                    name="password"
                    {...{ type }}
                    bind:value={password}
                    placeholder="••••••••"
                    class={"mt-1 block w-full px-3 py-2 border-2 rounded-md shadow-sm  focus:outline-none text-sm bg-white text-gray-900 " +
                        (passwordError || passwordMismatch
                            ? "border-red-500 focus:border-red-500"
                            : "border-gray-300  focus:ring-indigo-500 focus:border-indigo-500")}
                />
            </div>

            <div class="w-full mb-2">
                <label
                    for="password"
                    class="block text-sm font-bold text-gray-700"
                    >Confirm Password</label
                >
                <input
                    id="password"
                    name="confirmPassword"
                    {...{ type }}
                    bind:value={confirmPassword}
                    placeholder="••••••••"
                    class={"mt-1 block w-full px-3 py-2 border-2 rounded-md shadow-sm  focus:outline-none text-sm bg-white text-gray-900 " +
                        (passwordMismatch
                            ? "border-red-500 focus:border-red-500"
                            : "border-gray-300  focus:ring-indigo-500 focus:border-indigo-500")}
                />
            </div>
            {#if passwordError || passwordMismatch}
                <div class="block w-full text-left text-xs text-red-500 mb-4">
                    {#if passwordError}
                        <p>Password must be at least 8 characters long.</p>
                    {:else if passwordMismatch}
                        <p>Passwords do not match.</p>
                    {/if}
                </div>
            {/if}

            {#if form?.success}
                <div
                    class="block w-full text-left font-bold bg-teal-100 rounded py-3 px-4 text-xs text-teal-700 mb-4"
                >
                    <p>Registration successful.</p>
                    <br />
                    <p>
                        Please check your inbox to verify your email address and
                        complete signup.
                    </p>
                </div>
            {/if}

            <div class="block w-full text-left text-xs text-red-500 mb-4"></div>

            <div
                class="w-full flex flex-col 2xl:flex-row items-center justify-between mb-6 lg:mb-10"
            >
                <div class="flex flex-row">
                    <label for="showpass" class="text-sm pr-2 text-neutral-950">
                        Show Passwords
                    </label>
                    <input
                        id="showpass"
                        type="checkbox"
                        bind:checked={showPassword}
                    />
                </div>

                <div class="text-sm text-neutral-950">
                    Already a user?
                    <a
                        href="/login"
                        class="font-bold text-sky-600 hover:text-indigo-500"
                        >Login</a
                    >
                </div>
            </div>

            <button
                class="w-fit border-2 bg-sky-500 border-sky-700 disabled:bg-sky-200 disabled:border-sky-300 inline-flex justify-center rounded-md shadow-sm px-24 py-3 font-bold text-white hover:bg-sky-600 focus:outline-none text-sm"
                disabled={!email ||
                    !password ||
                    emailError ||
                    passwordError ||
                    passwordMismatch}>Register</button
            >
        </form>
    </div>
</div>
