import { error, redirect } from '@sveltejs/kit';

export const actions = {
    default: async ({ request, locals: { supabase } }) => {
        const { error: err } = await supabase.auth.signOut();

        if (err) {
            return error(400, err.message);
        }

        return redirect(302, '/login');
    }
}
