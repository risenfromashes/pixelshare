<script lang="ts">
    export let form;

    let email: String;
    let sent: boolean = false;
    let emailError: boolean = false;

    $: emailError = email && (!email.includes("@") || !email.includes("."));
    $: {
        email = form?.email || "";
        if (form?.success) {
            sent = true;
        }
    }
</script>

<div
    class="flex flex-col justify-center lg:flex-row h-screen w-full bg-cover bg-center bg-gray-300 px-10"
>
    <div
        class="flex flex-col justify-center items-center lg:max-w-xl lg:w-full w-full h-full py-6 shadow-md lg:px-20"
    >
        <!-- Logo -->
        <div class="flex justify-center mb-8">
            <img src="demo-logo.png" alt="Pixel Share" class="h-32 w-32" />
        </div>

        <h1 class="text-2xl font-bold mb-16">Recover Password</h1>

        {#if form?.emailInvalid || form?.error}
            <div
                class="block w-full font-bold px-4 py-3 bg-red-100 rounded text-left text-xs text-red-500 mb-4"
            >
                {#if form?.emailInvalid}
                    <p>Email address invalid.</p>
                {:else if form?.error}
                    <p>{form?.error}</p>
                {/if}
            </div>
        {/if}

        <!-- Form -->
        <form
            class="w-full flex flex-col justify-center items-center"
            method="POST"
        >
            <!-- Email Input with Validation -->
            <div class="w-full mb-6 flex flex-col justify-center">
                <label for="email" class="block text-sm font-bold text-gray-700"
                    >Email</label
                >
                <input
                    id="Email"
                    name="email"
                    placeholder="john@doe.com"
                    type="text"
                    bind:value={email}
                    class={"mt-1 block w-full px-3 py-2 border-2 border-blue-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm bg-white text-gray-900 " +
                        (emailError
                            ? "border-red-500 focus:border-red-500"
                            : "")}
                />
            </div>
            {#if emailError}
                <div class="block text-left text-xs text-red-500 mb-4">
                    <p>Please enter a valid email address.</p>
                </div>
            {/if}

            <!-- Send Email Button -->
            <button
                type="submit"
                class="w-fit border-2 bg-sky-500 border-sky-700 disabled:bg-sky-200 disabled:border-sky-300 inline-flex justify-center rounded-md shadow-sm px-24 py-3 font-bold text-white hover:bg-sky-600 focus:outline-none text-sm"
                disabled={!email || emailError}
                >{sent ? "Resend Email" : "Send Email"}</button
            >
        </form>

        <!-- Additional Information and Navigation -->

        {#if form?.success}
            <div
                class="block w-full text-left font-bold bg-teal-100 rounded py-3 px-4 text-xs text-teal-700 mb-4 mt-4"
            >
                <p>
                    Password reset link sent to your email address. Please check
                    your inbox.
                </p>
            </div>
        {:else}
            <div class="text-center text-sm text-gray-700 w-full mb-4 mt-6">
                <p>
                    A password reset link will be sent to the email you provide.
                </p>
            </div>
        {/if}
        <div class="text-sm text-neutral-950">
            Remembered your password? <a
                href="/login"
                class="font-bold text-sky-600 hover:text-indigo-500">Login</a
            >
        </div>
    </div>
</div>
