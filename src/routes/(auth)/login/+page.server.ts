import { fail, redirect } from '@sveltejs/kit';

export const actions = {
    default: async ({ request, locals: { supabase } }) => {
        const data = await request.formData();
        const email = data.get('email')?.toString();
        const password = data.get('password')?.toString();

        // Validate email
        if (!email || email.toString().match(/[^@]+@[^.]+\..+/) === null) {
            return fail(400, { email, emailInvalid: true });
        }

        // Validate password
        if (!password || password.toString().length < 8) {
            return fail(400, { email, passwordInvalid: true });
        }

        // Attempt to sign in the user
        let { data: { user, session }, error: err } = await supabase.auth.signInWithPassword({
            email: email.toString(),
            password: password.toString()
        });

        // Handle errors like wrong email/password
        if (err) {
            return fail(400, { email, error: err.message });
        }

        // If no errors, return success message
        return redirect(302, '/');
    }
}
