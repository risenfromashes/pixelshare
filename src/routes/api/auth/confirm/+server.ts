import { redirect } from '@sveltejs/kit';

export const GET = async (event) => {
    const {
        url,
        locals: { supabase }
    } = event;
    const token_hash = url.searchParams.get('token_hash') as string;
    const type = url.searchParams.get('type') as ('email' | 'recovery' | 'magiclink');
    const next = url.searchParams.get('next') ?? '/';
    let query = new URLSearchParams();

    console.log("token_hash: ", token_hash, "type: ", type, "next: ", next);

    if (type && token_hash) {
        const { error } = await supabase.auth.verifyOtp({ token_hash, type });
        if (!error) {
            throw redirect(303, `/${next.slice(1)}`);
        }

        query.set('error', error.message);
    } else {
        query.set('error', 'Invalid token or token expired.');
    }

    // return the user to an error page with some instructions
    throw redirect(303, `/auth/error?${query.toString()}`);
};