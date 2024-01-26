import { error, json } from "@sveltejs/kit";
import type { RequestEvent } from "./$types";
import type { Session, User } from "@supabase/supabase-js";

export const POST = async (event: RequestEvent) => {
    const { request, locals: { supabase } } = event;
    const { email, password } = await request.json();

    let { data: { user, session }, error: err } = await supabase.auth.signUp({
        email: email,
        password: password
    });

    if (err) {
        error(400, err.message);
    }


    return json({ success: true, uid: user?.id });
}