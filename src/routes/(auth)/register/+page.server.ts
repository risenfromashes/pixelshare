import { fail, redirect } from '@sveltejs/kit';

export const actions = {
    default: async ({ request, locals: { supabase } }) => {
        const data = await request.formData();
        const email = data.get('email')?.toString();
        const password = data.get('password')?.toString();



        if (!email || email.toString().match(/[^@]+@[^.]+\..+/) === null) {
            return fail(400, { email, emailInvalid: true });
        }

        if (!password || password.toString().length < 8) {
            return fail(400, { email, passwordInvalid: true });
        }

        let { data: { user, session }, error: err } = await supabase.auth.signUp({
            email: email.toString(),
            password: password.toString()
        });


        if (err) {
            return fail(400, { email, error: err.message });
        }

        return { success: true };
    }
}