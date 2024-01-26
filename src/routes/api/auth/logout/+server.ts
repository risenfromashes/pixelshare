import { error, json } from "@sveltejs/kit";
import type { RequestEvent } from "./$types";

export const POST = async (event: RequestEvent) => {
    const { locals: { supabase } } = event;

    const { error: err } = await supabase.auth.signOut();

    if (err) {
        return error(400, err.message);
    }

    return json({ success: true });
}
