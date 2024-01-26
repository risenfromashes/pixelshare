import { fail, redirect } from '@sveltejs/kit';

export const load = async ({ request, parent }) => {
    // If the user is not logged in, redirect to login page
    const { session } = await parent();
    if (!session) {
        return redirect(302, '/login');
    }

    return {
        userId: session.user.id,
        email: session.user.email
    };
}

export const actions = {
    default: async ({ request, locals: { supabase } }) => {
        const formData = await request.formData();
        const password = formData.get('password')?.toString();

        if (!password || password.length < 8) {
            return fail(400, { error: "Invalid password." });
        }

        let { data, error } = await supabase.auth.updateUser({
            password: password
        });

        if (error) {
            return fail(400, { error: error.message });
        }

        return redirect(302, '/');
    }
};
