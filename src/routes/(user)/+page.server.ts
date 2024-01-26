import { error, redirect } from '@sveltejs/kit';

export const load = async ({ request, parent }) => {
    // If the user is not logged in, redirect to login page
    const { session } = await parent();
    if (!session) {
        return redirect(302, '/login');
    }

    return {
        session
    };
}

export const actions = {
    logout: async ({ request, locals: { supabase } }) => {
        const { error: err } = await supabase.auth.signOut();

        if (err) {
            return error(400, err.message);
        }

        return redirect(302, '/login');
    }
}

