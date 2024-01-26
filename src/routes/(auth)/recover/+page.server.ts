import { fail, redirect } from '@sveltejs/kit';

export const actions = {
    default: async ({ request, url, locals: { supabase } }) => {
        const data = await request.formData();
        const email = data.get('email')?.toString();

        if (!email || !email.match(/[^@]+@[^.]+\..+/)) {
            return fail(400, { email, emailInvalid: true });
        }
        console.log(url.pathname);
        // Add your logic for sending password reset email
        // For example, using Supabase:
        let { error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: '/',
        });

        if (error) {
            return fail(400, { email, error: error.message });
        }

        return { success: true };
    }
}
